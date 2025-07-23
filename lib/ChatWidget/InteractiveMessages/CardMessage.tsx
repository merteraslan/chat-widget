import React from "react";
import type { InteractiveContent } from "./types";

interface CardMessageProps {
    content: InteractiveContent;
}

export const CardMessage: React.FC<CardMessageProps> = ({ content }) => {
    const cardData = content.content_attributes?.cards;

    if (!cardData || !cardData.cards || cardData.cards.length === 0) {
        return null;
    }

    return (
        <div className="interactive-cards">
            <div className="interactive-cards-header">
                <span className="interactive-cards-title">{cardData.title || content.content}</span>
                {cardData.description && (
                    <p className="interactive-cards-description">{cardData.description}</p>
                )}
            </div>
            <div className="cards-list">
                {cardData.cards.map((card, index) => (
                    <div key={index} className="card-item">
                        <div className="card-image-container">
                            <img
                                src={card.image}
                                alt={card.imageAlt || card.title}
                                className="card-image"
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback for broken images
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA0OC41TDk3IDU4LjVMMTEzIDQyLjVNNjcgNzcuNUg5N001NyA5Ny41SDE0M1YyMi5INTdWOTcuNVoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
                                    target.alt = 'Image not available';
                                }}
                            />
                            {card.badge && (
                                <span className="card-badge">{card.badge}</span>
                            )}
                            {card.price && (
                                <span className="card-price">{card.price}</span>
                            )}
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">{card.title}</h4>
                            <p className="card-description">{card.description}</p>
                            {card.link && (
                                <a
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-link"
                                >
                                    {card.linkText || 'Learn More'}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15,3 21,3 21,9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 