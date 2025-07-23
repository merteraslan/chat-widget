import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import { InteractiveMessage } from "./InteractiveMessages";
import type { InteractiveContent } from "./InteractiveMessages";

export interface Message {
    id: string;
    text?: string;
    isUser: boolean;
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

export interface ChatWidgetProps {
    title?: string;
    initialMessage?: string;
    sessionId?: string;
    csrfToken?: string;
    webhookUrl: string;
    color?: string;
    agentName?: string;
}

export const AIChatWidget = ({
    title = "AI Assistant",
    initialMessage = "Hello! How can I help you today?",
    webhookUrl,
    sessionId,
    csrfToken,
    color = "#242424",
    agentName,
}: ChatWidgetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Generate color variations for better visual hierarchy
    const generateColorVariations = (baseColor: string) => {
        // For now, we'll use the base color and create some variations
        // In a more sophisticated implementation, you could use a color manipulation library
        return {
            primary: baseColor,
            primaryHover: baseColor === "#242424" ? "#333333" : baseColor,
            primaryLight: baseColor === "#242424" ? "rgba(36, 36, 36, 0.8)" : `${baseColor}cc`,
        };
    };

    const colorVars = generateColorVariations(color);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            // Use requestAnimationFrame for better timing
            requestAnimationFrame(() => {
                const messagesContainer = bottomRef.current?.parentElement;
                if (messagesContainer) {
                    messagesContainer.scrollTo({
                        top: messagesContainer.scrollHeight,
                        behavior: "smooth"
                    });
                }
            });
        }
    }, [messages, isOpen]);

    const sendMessageWithText = useCallback(async (messageText: string) => {
        setIsTyping(true);

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                body: JSON.stringify({ prompt: messageText, session_id: sessionId || "sample_session" }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json() as APIResponse;

            // Check if response contains interactive content
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                isUser: false,
                timestamp: new Date(),
            };

            // Handle interactive content format
            if (data.content_type && data.content) {
                aiResponse.interactive = {
                    content: data.content,
                    content_type: data.content_type,
                    content_attributes: data.content_attributes || {},
                };
            } else {
                // Fallback to regular text message
                aiResponse.text = data.output || data.message || "Sorry, I couldn't process that.";
            }

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble processing your message. Please try again later.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            console.error("Error sending message:", error);
        } finally {
            // Hide typing indicator
            setIsTyping(false);
        }
    }, [webhookUrl, sessionId, csrfToken]);

    useEffect(() => {
        const handleCannedResponse = (event: CustomEvent<CannedResponseEventDetail>) => {
            const { text, value } = event.detail;

            // Add user message
            const userMessage: Message = {
                id: Date.now().toString(),
                text: text,
                isUser: true,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, userMessage]);

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

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (inputText.trim()) {
            const messageText = inputText;
            const userMessage: Message = {
                id: Date.now().toString(),
                text: messageText,
                isUser: true,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInputText("");

            // Use the shared function for sending to AI
            await sendMessageWithText(messageText);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            void sendMessage();
        }
    };

    const handleSendClick = () => {
        void sendMessage();
    };

    return (
        <div
            className="cw-widget"
            data-open={isOpen}
            style={{
                "--widget-primary-color": colorVars.primary,
                "--widget-primary-hover": colorVars.primaryHover,
                "--widget-primary-light": colorVars.primaryLight,
            } as React.CSSProperties}
        >
            <button
                className="cw-toggle-btn"
                onClick={toggleChat}
                aria-label={isOpen ? "Close chat" : "Open chat"}
                title={isOpen ? "Close chat" : "Open chat"}
            >
                <svg className="cw-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
            </button>

            <div className="cw-interface">
                <div className="cw-header">
                    <h3>{title}</h3>
                    <button
                        className="cw-close-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                        aria-label="Close chat"
                        title="Close chat"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="cw-messages">
                    {messages.length === 0 ? (
                        <div className="cw-welcome">
                            <p>{initialMessage}</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => {
                                // Special handling for canned responses and quick replies - render without bubble and timestamp
                                if (message.interactive?.content_type === "canned_response" || message.interactive?.content_type === "quick_reply") {
                                    return (
                                        <div key={message.id} className="cw-canned-response-container">
                                            <InteractiveMessage content={message.interactive} />
                                        </div>
                                    );
                                }

                                // Standard message rendering
                                return (
                                    <div key={message.id} className={`cw-message ${message.isUser ? "cw-user-message" : "cw-ai-message"}`}>
                                        <div className="cw-message-bubble">
                                            {message.interactive ? (
                                                <InteractiveMessage content={message.interactive} />
                                            ) : (
                                                <>
                                                    {!message.isUser && agentName && (
                                                        <span className="cw-agent-name">{agentName}: </span>
                                                    )}
                                                    {message.text}
                                                </>
                                            )}
                                        </div>
                                        <div className="cw-message-time">
                                            {new Intl.DateTimeFormat('en-GB', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            }).format(message.timestamp)}
                                        </div>
                                    </div>
                                );
                            })}
                            {isTyping && (
                                <div className="cw-message cw-ai-message">
                                    <div className="cw-message-bubble">
                                        <div className="cw-typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef}></div>
                        </>
                    )}
                </div>

                <div className="cw-input-area">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={handleSendClick}
                        disabled={!inputText.trim()}
                        aria-label="Send message"
                        title="Send message"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
