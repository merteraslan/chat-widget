export interface ArticleItem {
    title: string;
    description: string;
    link: string;
}

export interface FormField {
    id: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    validation?: {
        pattern?: string;
        message?: string;
    };
}

export interface FormData {
    title?: string;
    description?: string;
    fields: FormField[];
    submitLabel?: string;
    submitUrl?: string;
}

export interface CardItem {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    link?: string;
    linkText?: string;
    badge?: string;
    price?: string;
}

export interface CardData {
    title?: string;
    description?: string;
    cards: CardItem[];
}

export interface CannedResponseItem {
    id: string;
    text: string;
    value?: string; // Optional value to send, defaults to text if not provided
}

export interface CannedResponseData {
    title?: string;
    description?: string;
    responses: CannedResponseItem[];
}

export interface InteractiveContent {
    content: string;
    content_type: string;
    content_attributes?: {
        items?: ArticleItem[];
        form?: FormData;
        cards?: CardData;
        responses?: CannedResponseData;
        // Add more attributes here as we support more interactive types
        [key: string]: unknown;
    };
}

export interface InteractiveMessageProps {
    content: InteractiveContent;
} 