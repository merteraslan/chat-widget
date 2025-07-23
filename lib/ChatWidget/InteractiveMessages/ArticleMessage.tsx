import React from "react";
import type { InteractiveContent } from "./types";

interface ArticleMessageProps {
    content: InteractiveContent;
}

export const ArticleMessage: React.FC<ArticleMessageProps> = ({ content }) => {
    if (!content.content_attributes?.items) {
        return null;
    }

    return (
        <div className="interactive-articles">
            <div className="interactive-articles-header">
                <span className="interactive-articles-title">{content.content}</span>
            </div>
            <div className="articles-list">
                {content.content_attributes.items.map((item, index) => (
                    <div key={index} className="article-item">
                        <div className="article-content">
                            <h4 className="article-title">{item.title}</h4>
                            <p className="article-description">{item.description}</p>
                        </div>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-link"
                            aria-label={`Read article: ${item.title}`}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}; 