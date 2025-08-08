import type { InteractiveContent, CannedResponseItem } from "./types";

interface CannedResponseMessageProps {
    content: InteractiveContent;
}

export function CannedResponseMessage({ content }: CannedResponseMessageProps) {
    const responses = content.content_attributes?.responses;

    if (!responses || !responses.responses || responses.responses.length === 0) {
        return (
            <div className="interactive-message-fallback">
                <p>No response options available</p>
            </div>
        );
    }

    const handleResponseClick = (response: CannedResponseItem) => {
        // Create a custom event that the parent widget can listen to
        const responseValue = response.value || response.text;
        const event = new CustomEvent('cannedResponseSelected', {
            detail: {
                id: response.id,
                text: response.text,
                value: responseValue
            },
            bubbles: true
        });

        // Dispatch the event
        document.dispatchEvent(event);
    };

    return (
        <div className="interactive-canned-responses">
            <div className="interactive-responses-header">
                <p className="interactive-responses-description">Choose an option below or type your own message:</p>
            </div>

            <div className="responses-list">
                {responses.responses.map((response) => (
                    <button
                        key={response.id}
                        className="response-button"
                        onClick={() => handleResponseClick(response)}
                        type="button"
                        aria-label={`Select response: ${response.text}`}
                    >
                        <span className="response-text">{response.text}</span>
                        <svg className="response-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}