import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ChatWidget.css';
import { InteractiveMessage } from './InteractiveMessages';
import type { InteractiveContent } from './InteractiveMessages';

export interface ChatMessage {
    id: string;
    text?: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    interactive?: InteractiveContent;
}

interface APIResponse {
    content?: string;
    content_type?: string;
    content_attributes?: {
        [key: string]: unknown;
    };
    output?: string;
    message?: string;
}

interface CannedResponseEventDetail {
    text: string;
    value?: string;
}

const genId = () => Math.random().toString(36).slice(2, 10);

export interface ChatWidgetProps {
    title?: React.ReactNode;
    initialMessage?: string;
    sessionId?: string;
    csrfToken?: string;
    webhookUrl: string;
    placeholder?: string;
    openByDefault?: boolean;
    className?: string;
    color?: string;
    agentName?: string;
}

/**
 * Minimal chat widget with interactive message support.
 * - Maintains internal state (open/closed, messages, input text)
 * - Sends POST to webhookUrl
 * - Supports interactive content types
 * NO extra features were added compared to the original.
 */
export const ChatWidget: React.FC<ChatWidgetProps> = ({
    title = 'Chat',
    initialMessage = 'Hello! How can I help you today?',
    webhookUrl,
    sessionId,
    csrfToken,
    placeholder = 'Type a message…',
    openByDefault = false,
    className = '',
    agentName,
    color,
}) => {
    const [isOpen, setOpen] = useState(openByDefault);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            requestAnimationFrame(() => {
                const messagesContainer = bottomRef.current?.parentElement;
                if (messagesContainer) {
                    messagesContainer.scrollTo({
                        top: messagesContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }, [messages, isOpen]);

    const sendMessageWithText = useCallback(async (messageText: string) => {
        setSending(true);

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: JSON.stringify({ prompt: messageText, session_id: sessionId || null }),
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json() as APIResponse;

            // Check if response contains interactive content
            const botReply: ChatMessage = {
                id: genId(),
                role: 'assistant',
                timestamp: new Date(),
            };

            // Handle interactive content format
            if (data.content_type && data.content) {
                botReply.interactive = {
                    content: data.content,
                    content_type: data.content_type,
                    content_attributes: data.content_attributes || {},
                };
            } else {
                // Fallback to regular text message
                botReply.text = data.output || data.message || 'Sorry, I couldn\'t process that.';
            }

            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            const botReply: ChatMessage = {
                id: genId(),
                text: 'Sorry, something went wrong.',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botReply]);
            console.error('[ChatWidget] sendMessage error:', error);
        } finally {
            setSending(false);
        }
    }, [webhookUrl, sessionId, csrfToken]);

    useEffect(() => {
        const handleCannedResponse = (event: CustomEvent<CannedResponseEventDetail>) => {
            const { text, value } = event.detail;

            // Add user message
            const userMsg: ChatMessage = {
                id: genId(),
                text: text,
                role: 'user',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, userMsg]);

            // Send the value to AI
            setTimeout(() => {
                void sendMessageWithText(value || text);
            }, 500);
        };

        document.addEventListener('cannedResponseSelected', handleCannedResponse as EventListener);

        return () => {
            document.removeEventListener('cannedResponseSelected', handleCannedResponse as EventListener);
        };
    }, [sendMessageWithText]);

    const toggle = () => setOpen(o => !o);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || sending) return;

        const userMsg: ChatMessage = {
            id: genId(),
            text,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // Use the shared function for sending to AI
        await sendMessageWithText(text);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            void sendMessage();
        }
    };

    const onSendClick = () => {
        void sendMessage();
    };

    return (
        <div 
            className={`mw-chat ${className} ${isOpen ? 'mw-open' : ''}`}
            style={color ? { '--widget-primary-color': color } as React.CSSProperties : undefined}
        >
            {/* Toggle Button */}
            <button
                type="button"
                className="mw-toggle"
                {...(isOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
                aria-controls="mw-window"
                onClick={toggle}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? '×' : '💬'}
            </button>

            {/* Window */}
            {isOpen && (
                <div className="mw-window" id="mw-window" role="dialog" aria-label="Chat window">
                    <div className="mw-header">
                        <div className="mw-title">{title}</div>
                        <button
                            type="button"
                            className="mw-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>

                    <div className="mw-messages" aria-live="polite">
                        {messages.length === 0 ? (
                            <div className="mw-welcome">
                                <p>{initialMessage}</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => {
                                    // Special handling for canned responses and quick replies
                                    if (message.interactive?.content_type === 'canned_response' || message.interactive?.content_type === 'quick_reply') {
                                        return (
                                            <div key={message.id} className="mw-canned-response-container">
                                                <InteractiveMessage content={message.interactive} />
                                            </div>
                                        );
                                    }

                                    // Standard message rendering
                                    return (
                                        <div key={message.id} className={`mw-msg mw-${message.role}`}>
                                            <div className="mw-message-bubble">
                                                {message.interactive ? (
                                                    <InteractiveMessage content={message.interactive} />
                                                ) : (
                                                    <>
                                                        {message.role === 'assistant' && agentName && (
                                                            <span className="mw-agent-name">{agentName}: </span>
                                                        )}
                                                        {message.text}
                                                    </>
                                                )}
                                            </div>
                                            <div className="mw-message-time">
                                                {new Intl.DateTimeFormat('en-GB', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                }).format(message.timestamp)}
                                            </div>
                                        </div>
                                    );
                                })}
                                {sending && (
                                    <div className="mw-msg mw-assistant mw-typing">
                                        <span className="mw-dot" />
                                        <span className="mw-dot" />
                                        <span className="mw-dot" />
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </>
                        )}
                    </div>

                    <form
                        className="mw-inputbar"
                        onSubmit={e => {
                            e.preventDefault();
                            void sendMessage();
                        }}
                    >
                        <input
                            type="text"
                            className="mw-input"
                            placeholder={placeholder}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                        <button
                            type="submit"
                            className="mw-send"
                            onClick={onSendClick}
                            disabled={sending || !input.trim()}
                            aria-label="Send message"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
