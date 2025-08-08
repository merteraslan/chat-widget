import type { InteractiveMessageProps } from "./types";
import { ArticleMessage } from "./ArticleMessage";
import { FormMessage } from "./FormMessage";
import { CardMessage } from "./CardMessage";
import { CannedResponseMessage } from "./CannedResponseMessage";

export function InteractiveMessage({ content }: InteractiveMessageProps) {
    switch (content.content_type) {
        case "article":
            return <ArticleMessage content={content} />;

        case "form":
            return <FormMessage content={content} />;

        case "card":
            return <CardMessage content={content} />;

        case "canned_response":
        case "quick_reply":
            return <CannedResponseMessage content={content} />;

        // Add more cases here as we support more interactive types
        // case "carousel":
        //     return <CarouselMessage content={content} />;

        default:
            // Fallback for unknown interactive content types
            return (
                <div className="interactive-message-fallback">
                    <p>Interactive content: {content.content}</p>
                </div>
            );
    }
}