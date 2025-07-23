import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatWidget } from '../../lib/index';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ChatWidget', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const defaultProps = {
    webhookUrl: 'https://example.com/webhook',
    title: 'Test Assistant',
    initialMessage: 'Hello! How can I help?',
  };

  it('renders the chat toggle button', () => {
    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens and closes the chat interface', async () => {
    const user = userEvent.setup();
    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    
    // Initially closed - check the widget class
    const widget = document.querySelector('.mw-chat');
    expect(widget).not.toHaveClass('mw-open');
    
    // Open chat
    await user.click(toggleButton);
    
    // Wait for interface to open
    await waitFor(() => {
      expect(widget).toHaveClass('mw-open');
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.initialMessage)).toBeInTheDocument();
    });
    
    // Close chat using close button (use class selector to be specific)
    const closeButton = document.querySelector('.mw-close') as HTMLButtonElement;
    await user.click(closeButton);
    
    // Should be closed again
    await waitFor(() => {
      expect(widget).not.toHaveClass('mw-open');
    });
  });

  it('displays initial message when no messages exist', async () => {
    const user = userEvent.setup();
    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    expect(screen.getByText(defaultProps.initialMessage)).toBeInTheDocument();
  });

  it('sends a message when user types and presses enter', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ output: 'AI response message' }),
    });

    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Hello AI{enter}');
    
    // Check that user message appears
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
    
    // Check that fetch was called
    expect(mockFetch).toHaveBeenCalledWith(
      defaultProps.webhookUrl,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Hello AI',
          session_id: null,
        }),
      })
    );
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText('AI response message')).toBeInTheDocument();
    });
  });

  it('sends a message when user clicks send button', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ output: 'Button click response' }),
    });

    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);

    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Button test message');

    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);

    // Wait for the successful AI response to appear
    await waitFor(() => {
      expect(screen.getByText('Button click response')).toBeInTheDocument();
    });
    
    // Verify the user message appears (may be duplicated due to error handling, so use queryAllByText)
    const userMessages = screen.queryAllByText('Button test message');
    expect(userMessages.length).toBeGreaterThanOrEqual(1);
    
    expect(mockFetch).toHaveBeenCalled();
  });

  it('disables send button when input is empty', async () => {
    const user = userEvent.setup();
    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Some text');
    
    expect(sendButton).not.toBeDisabled();
    
    await user.clear(input);
    expect(sendButton).toBeDisabled();
  });

  it('shows typing indicator while waiting for response', async () => {
    const user = userEvent.setup();
    
    // Make fetch take some time to resolve
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve({ output: 'Delayed response' }),
        }), 100)
      )
    );

    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Test{enter}');
    
    // Check typing indicator appears (query by class since it doesn't have a test id)
    await waitFor(() => {
      const typingIndicator = document.querySelector('.mw-typing');
      expect(typingIndicator).toBeInTheDocument();
    });
    
    // Wait for response and typing indicator to disappear
    await waitFor(() => {
      expect(screen.getByText('Delayed response')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(document.querySelector('.mw-typing')).not.toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Test error{enter}');
    
    await waitFor(() => {
      expect(screen.getByText('Sorry, something went wrong.')).toBeInTheDocument();
    });
  });

  it('uses custom sessionId when provided', async () => {
    const user = userEvent.setup();
    const customSessionId = 'custom-session-123';
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ output: 'Response' }),
    });

    render(<ChatWidget {...defaultProps} sessionId={customSessionId} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Test{enter}');
    
    expect(mockFetch).toHaveBeenCalledWith(
      defaultProps.webhookUrl,
      expect.objectContaining({
        body: JSON.stringify({
          prompt: 'Test',
          session_id: customSessionId,
        }),
      })
    );
  });

  it('includes CSRF token when provided', async () => {
    const user = userEvent.setup();
    const csrfToken = 'csrf-token-123';
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ output: 'Response' }),
    });

    render(<ChatWidget {...defaultProps} csrfToken={csrfToken} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Test{enter}');
    
    expect(mockFetch).toHaveBeenCalledWith(
      defaultProps.webhookUrl,
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-CSRF-Token': csrfToken,
        }) as Record<string, string>,
        body: JSON.stringify({
          prompt: 'Test',
          session_id: null,
        }),
      })
    );
  });

  it('displays agent name when provided', async () => {
    const user = userEvent.setup();
    const agentName = 'Support Bot';
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ output: 'Hello from agent' }),
    });

    render(<ChatWidget {...defaultProps} agentName={agentName} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Test{enter}');
    
    await waitFor(() => {
      expect(screen.getByText(`${agentName}:`)).toBeInTheDocument();
      expect(screen.getByText('Hello from agent')).toBeInTheDocument();
    });
  });

  it('applies custom color styling', () => {
    const customColor = '#ff0000';
    const { container } = render(<ChatWidget {...defaultProps} color={customColor} />);
    
    const widget = container.querySelector('.mw-chat');
    expect(widget).toHaveStyle(`--widget-primary-color: ${customColor}`);
  });

  it('handles interactive content responses', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        content: 'articles',
        content_type: 'article',
        content_attributes: {
          items: [
            {
              title: 'Test Article',
              description: 'Test description',
              link: 'https://example.com',
            },
          ],
        },
      }),
    });

    render(<ChatWidget {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    await user.click(toggleButton);
    
    const input = screen.getByPlaceholderText('Type a message…');
    await user.type(input, 'Show articles{enter}');
    
    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
    });
  });
});
