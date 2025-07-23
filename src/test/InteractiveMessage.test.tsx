import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InteractiveMessage } from '../../lib/ChatWidget/InteractiveMessages';
import type { InteractiveContent } from '../../lib/ChatWidget/InteractiveMessages';

describe('InteractiveMessage', () => {
  it('renders article message correctly', () => {
    const articleContent: InteractiveContent = {
      content: 'articles',
      content_type: 'article',
      content_attributes: {
        items: [
          {
            title: 'Getting Started Guide',
            description: 'Learn how to use our platform',
            link: 'https://example.com/guide',
          },
          {
            title: 'Advanced Features',
            description: 'Explore advanced functionality',
            link: 'https://example.com/advanced',
          },
        ],
      },
    };

    render(<InteractiveMessage content={articleContent} />);

    expect(screen.getByText('Getting Started Guide')).toBeInTheDocument();
    expect(screen.getByText('Learn how to use our platform')).toBeInTheDocument();
    expect(screen.getByText('Advanced Features')).toBeInTheDocument();
    expect(screen.getByText('Explore advanced functionality')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/guide');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/advanced');
  });

  it('renders card message correctly', () => {
    const cardContent: InteractiveContent = {
      content: 'cards',
      content_type: 'card',
      content_attributes: {
        cards: {
          title: 'Featured Products',
          cards: [
            {
              title: 'Product A',
              description: 'Great product description',
              image: 'https://example.com/image.jpg',
              link: 'https://example.com/product-a',
            },
          ],
        },
      },
    };

    render(<InteractiveMessage content={cardContent} />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Great product description')).toBeInTheDocument();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Product A');
  });

  it('renders form message correctly', () => {
    const formContent: InteractiveContent = {
      content: 'form',
      content_type: 'form',
      content_attributes: {
        form: {
          title: 'Contact Form',
          description: 'Please fill out this form',
          fields: [
            {
              id: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
              placeholder: 'Enter your email',
            },
            {
              id: 'message',
              label: 'Message',
              type: 'textarea',
              required: true,
              placeholder: 'Enter your message',
            },
          ],
          submitLabel: 'Send Message',
        },
      },
    };

    render(<InteractiveMessage content={formContent} />);

    expect(screen.getByText('Contact Form')).toBeInTheDocument();
    expect(screen.getByText('Please fill out this form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders canned response message correctly', async () => {
    const user = userEvent.setup();
    const cannedResponseContent: InteractiveContent = {
      content: 'canned_responses',
      content_type: 'canned_response',
      content_attributes: {
        responses: {
          responses: [
            {
              id: '1',
              text: 'I need help with billing',
              value: 'billing_support',
            },
            {
              id: '2',
              text: 'Technical support',
              value: 'technical_support',
            },
          ],
        },
      },
    };

    render(<InteractiveMessage content={cannedResponseContent} />);

    expect(screen.getByText('I need help with billing')).toBeInTheDocument();
    expect(screen.getByText('Technical support')).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    // Test clicking a canned response
    const billingButton = screen.getByText('I need help with billing');
    await user.click(billingButton);
    
    // Note: The actual event dispatch would need to be tested with proper setup
    // This tests the rendering correctly
  });

  it('handles unknown content type gracefully', () => {
    const unknownContent: InteractiveContent = {
      content: 'unknown',
      content_type: 'unknown_type',
      content_attributes: {},
    };

    const { container } = render(<InteractiveMessage content={unknownContent} />);
    
    // Should render something or handle gracefully
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles missing content attributes', () => {
    const emptyContent: InteractiveContent = {
      content: 'articles',
      content_type: 'article',
      content_attributes: {},
    };

    const { container } = render(<InteractiveMessage content={emptyContent} />);
    
    // Should render nothing for articles without items
    expect(container.firstChild).toBeNull();
  });
});
