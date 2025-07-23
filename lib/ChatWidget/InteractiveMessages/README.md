# Interactive Messages Module

> **Note**: This is internal developer documentation for contributing to the Chat Widget codebase. If you're looking to **use** the widget in your application, see the [main documentation](../../../docs/README.md).

This module handles different types of interactive messages that can be sent by the AI assistant.

## Color Theming

All interactive messages automatically inherit the widget's color scheme through CSS custom properties. When you set the `color` prop on the main `ChatWidget` component, all interactive elements (buttons, form inputs, cards, badges) will use that color consistently.

**Inherited Colors:**

- `--widget-primary-color` - Main brand color (buttons, links, badges)
- `--widget-primary-hover` - Hover state for interactive elements
- `--widget-primary-light` - Light variant for shadows and backgrounds

This ensures a cohesive design across all message types without requiring individual color configuration.

## Structure

- `types.ts` - Contains shared interfaces and types
- `InteractiveMessage.tsx` - Main dispatcher component that routes to specific message types
- `ArticleMessage.tsx` - Handles article-type interactive messages
- `FormMessage.tsx` - Handles form-type interactive messages
- `CardMessage.tsx` - Handles card-type interactive messages
- `CannedResponseMessage.tsx` - Handles canned response/quick reply messages
- `index.ts` - Exports all components and types

## Supported Message Types

### 1. Article Messages (`"article"`)

Display a list of articles or links with titles, descriptions, and clickable links.

### 2. Form Messages (`"form"`)

Interactive forms with various field types (text, email, textarea, select, checkbox, radio) and validation.

### 3. Card Messages (`"card"`)

Rich visual content with images, badges, prices, and call-to-action buttons.

### 4. Canned Response Messages (`"canned_response"` or `"quick_reply"`)

Quick reply buttons that users can click to select pre-written responses. When clicked, automatically sends the selected response as a user message.

## Adding New Interactive Message Types

To add a new interactive message type, follow these steps:

### 1. Create a New Component

Create a new component file (e.g., `FormMessage.tsx`, `CarouselMessage.tsx`, etc.):

```tsx
import React from "react";
import { InteractiveContent } from "./types";

interface MyMessageProps {
  content: InteractiveContent;
}

export const MyMessage: React.FC<MyMessageProps> = ({ content }) => {
  // Your implementation here
  return <div className="interactive-my-message">{/* Your JSX here */}</div>;
};
```

### 2. Update the Dispatcher

Add a new case to the switch statement in `InteractiveMessage.tsx`:

```tsx
switch (content.content_type) {
  case "article":
    return <ArticleMessage content={content} />;
  case "my_new_type":
    return <MyMessage content={content} />;
  // ... other cases
}
```

### 3. Update Types (if needed)

If your new message type requires specific attributes, update the `InteractiveContent` interface in `types.ts`:

```tsx
export interface InteractiveContent {
  content: string;
  content_type: string;
  content_attributes?: {
    items?: ArticleItem[];
    myNewAttribute?: MyNewType[];
    [key: string]: unknown;
  };
}
```

### 4. Export the Component

Add your new component to `index.ts`:

```tsx
export { MyMessage } from "./MyMessage";
```

### 5. Add Styles

Add appropriate CSS classes to the main `style.css` file following the naming convention:

- `.interactive-my-message` for the main container
- `.my-message-*` for specific elements

## Example Interactive Content Types

### Article Messages

```json
{
  "content": "Here are some relevant articles:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Article Title",
        "description": "Article description",
        "link": "https://example.com"
      }
    ]
  }
}
```

### Form Messages

```json
{
  "content": "Please fill out this contact form:",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Us",
      "description": "We'd love to hear from you! Please fill out the form below.",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "placeholder": "Enter your full name",
          "required": true
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "placeholder": "your@email.com",
          "required": true,
          "validation": {
            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Please enter a valid email address"
          }
        },
        {
          "id": "subject",
          "type": "select",
          "label": "Subject",
          "required": true,
          "options": [
            { "value": "general", "label": "General Inquiry" },
            { "value": "support", "label": "Technical Support" },
            { "value": "feedback", "label": "Feedback" }
          ]
        },
        {
          "id": "message",
          "type": "textarea",
          "label": "Message",
          "placeholder": "Tell us how we can help...",
          "required": true
        },
        {
          "id": "newsletter",
          "type": "checkbox",
          "label": "Subscribe to our newsletter"
        }
      ],
      "submitLabel": "Send Message",
      "submitUrl": "/api/contact-form"
    }
  }
}
```

### Card Messages

```json
{
  "content": "Check out these featured products:",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Featured Products",
      "description": "Our most popular items this month",
      "cards": [
        {
          "title": "Wireless Headphones",
          "description": "Premium noise-canceling headphones with 30-hour battery life",
          "image": "https://example.com/headphones.jpg",
          "imageAlt": "Black wireless headphones",
          "link": "https://shop.example.com/headphones",
          "linkText": "View Product",
          "badge": "BESTSELLER",
          "price": "$299"
        },
        {
          "title": "Smart Watch",
          "description": "Track your fitness and stay connected with this sleek smartwatch",
          "image": "https://example.com/watch.jpg",
          "imageAlt": "Silver smartwatch",
          "link": "https://shop.example.com/watch",
          "linkText": "Learn More",
          "badge": "NEW",
          "price": "$399"
        }
      ]
    }
  }
}
```

### Future Types (Examples)

- `carousel` - Image/content carousels
- `quick_replies` - Quick reply buttons
- `list` - Structured lists
- `buttons` - Action buttons
- `map` - Location maps
- `media` - Audio/video content

## Best Practices

1. **Keep components focused** - Each component should handle one specific message type
2. **Use semantic HTML** - Ensure accessibility with proper ARIA labels
3. **Handle missing data** - Always check for required attributes and provide fallbacks
4. **Follow naming conventions** - Use descriptive CSS class names with the `interactive-` prefix
5. **Add proper TypeScript types** - Define interfaces for your specific content attributes
6. **Test edge cases** - Handle scenarios where expected data might be missing or malformed

## Related Documentation

- **[User Documentation](../../../docs/README.md)** - For developers using the widget
- **[Message Schema](../../../docs/message-schema.md)** - JSON schemas for webhook responses
- **[Contributing Guidelines](../../../docs/contributing.md)** - General contribution guidelines
