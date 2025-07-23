# Chat Widget

[![NPM Version](https://img.shields.io/npm/v/@merteraslan/chat-widget.svg)](https://www.npmjs.com/package/@merteraslan/chat-widget)
[![NPM Downloads](https://img.shields.io/npm/dm/@merteraslan/chat-widget.svg)](https://www.npmjs.com/package/@merteraslan/chat-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CI/CD](https://github.com/merteraslan/chat-widget/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/merteraslan/chat-widget/actions)

A modern, lightweight React chat widget that connects seamlessly to your AI backend via webhooks with support for rich interactive messages, forms, articles, and canned responses.

## 📚 Documentation

**[📖 Complete Documentation](./docs/README.md)** - Comprehensive guides, API reference, and examples

### Quick Links

- **[🚀 Installation](./docs/installation.md)** - Get started quickly
- **[📋 API Reference](./docs/api-reference.md)** - Complete prop and method documentation  
- **[💬 Message Schema](./docs/message-schema.md)** - JSON schemas for all interactive message types
- **[❓ FAQ](./docs/faq.md)** - Common issues and solutions (CORS, CSP, SSR, forms)
- **[🔧 Examples](./docs/examples/)** - Working code examples for different frameworks

## Features & Enhancements

- **🎨 Modern Design**: Clean UI with smooth animations and better accessibility
- **💬 Interactive Messages**: Rich content support including articles, forms, cards, and quick replies
- **📱 Mobile Responsive**: Perfect experience across all devices
- **⚡ Performance**: Lightweight bundle with optimized rendering
- **🎯 TypeScript**: Full type safety and better developer experience
- **🌐 Accessibility**: WCAG compliant with keyboard navigation and screen reader support

[Project Screenshot](https://github.com/user-attachments/assets/c6d35cc1-8ebb-46ee-94f7-df6981a834d1)

## Installation

```bash
npm install @merteraslan/chat-widget
```

Or with yarn:

```bash
yarn add @merteraslan/chat-widget
```

## Usage

```tsx
import { ChatWidget } from "@merteraslan/chat-widget";

function App() {
  return (
    <>
      <ChatWidget
        webhookUrl="https://your-api.com/chat"
        title="AI Assistant"
        initialMessage="Hello! How can I help you today?"
        color="#3b82f6" // Custom blue color - all interactive elements will inherit this
        agentName="Support Bot" // Agent messages will show "Support Bot: ..."
      />
    </>
  );
}
```

## Props

- `webhookUrl (required)`: Webhook endpoint to post to.
- `title (optional)`: Chat widget title.
- `initialMessage (optional)`: Chat initial message.
- `sessionId (optional)`: Configure a session id to send to your AI workflows.
- `csrfToken (optional)`: Option to add a csrf token in order to send post request server-side for security.
- `color (optional)`: Primary color for the widget and all interactive elements (default: "#242424"). All buttons, forms, cards, and interactive elements will inherit this color scheme.
- `agentName (optional)`: Display name for the AI agent. When provided, agent messages will be prefixed with this name in bold and colored with the widget's primary color (e.g., "Agent: Hello, how can I help you?").

## API Format

Your webhook should accept POST requests with:

```json
{
  "prompt": "user message",
  "session_id": "session_id"
}
```

### Text Messages

For regular text responses:

```json
{
  "output": "AI response message"
}
```

### Interactive Messages

#### Article Messages

For interactive article messages:

```json
{
  "content": "articles",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "API Quick Start Guide",
        "description": "A comprehensive guide to get you started with our API",
        "link": "https://docs.example.com/api-guide"
      },
      {
        "title": "Development Documentation",
        "description": "Complete development docs and best practices",
        "link": "https://docs.example.com/dev-docs"
      }
    ]
  }
}
```

#### Form Messages (NEW!)

For interactive form messages:

```json
{
  "content": "Please fill out this contact form:",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Us",
      "description": "We'd love to hear from you!",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "placeholder": "Enter your name",
          "required": true
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email",
          "placeholder": "your@email.com",
          "required": true
        },
        {
          "id": "subject",
          "type": "select",
          "label": "Subject",
          "required": true,
          "options": [
            { "value": "general", "label": "General Inquiry" },
            { "value": "support", "label": "Support" }
          ]
        },
        {
          "id": "message",
          "type": "textarea",
          "label": "Message",
          "placeholder": "How can we help?",
          "required": true
        }
      ],
      "submitLabel": "Send Message",
      "submitUrl": "/api/contact-form"
    }
  }
}
```

**Supported Form Field Types:**

- `text`, `email`, `tel` - Text input fields
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `checkbox` - Checkbox input
- `radio` - Radio button groups

#### Card Messages (NEW!)

For rich visual content with images:

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
        }
      ]
    }
  }
}
```

**Card Features:**

- Rich visual content with images
- Optional badges (NEW, SALE, etc.)
- Price display overlay
- Clickable links with custom text
- Responsive design (stacks on mobile)
- Image error handling with fallback

#### Canned Response Messages (NEW!)

For quick reply buttons that users can click:

```json
{
  "content": "How can I help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "How can I help you today?",
      "description": "Choose one of the options below:",
      "responses": [
        {
          "id": "billing",
          "text": "I have a question about billing",
          "value": "billing_inquiry"
        },
        {
          "id": "technical",
          "text": "I need technical support",
          "value": "technical_support"
        },
        {
          "id": "general",
          "text": "General information",
          "value": "general_info"
        }
      ]
    }
  }
}
```

**Canned Response Features:**

- Quick reply buttons for user selection
- Customizable button text and values
- Automatic user message creation when clicked
- Optional title and description
- Consistent styling with widget color scheme
- Keyboard navigation support

**Content Types:** You can use either `"canned_response"` or `"quick_reply"` as the content_type.

For detailed documentation on all interactive message types, see the [Message Schema Documentation](./docs/message-schema.md).

## Features

This is currently a pre-release version with the very basic features that we will expand in the future.

- Clean Animations Using Pure CSS
- Mobile Responsive Design
- Keyboard Navigation
- Typing Indicators
- CSRF Token Support
- **Interactive Messages** - Send article links, forms, cards, canned responses, and rich content
- Lightweight and fast.

## Documentation

For comprehensive documentation, examples, and troubleshooting:

**📚 [View Complete Documentation](./docs/README.md)**

The documentation includes:

- **Installation & Setup Guides** - Get started quickly with any framework
- **Complete API Reference** - All props, methods, and TypeScript types
- **Message Schema Documentation** - JSON schemas for all interactive message types
- **FAQ & Troubleshooting** - Solutions for CORS, CSP, SSR, and form issues
- **Working Examples** - Complete code examples for React, Next.js, and more
- **Integration Guides** - Platform-specific setup instructions

## Incoming Upgrades

- Apply React Portal Escape
- UI Design Enhancements
- Full Accessiblity
- Compound Component Design Pattern
- Full Customizability
- ✅ ~~Item Carousels for AI Recommendation Systems~~ (Implemented as Interactive Article Messages)
- ✅ ~~Interactive Form Messages~~ (Implemented - text, email, select, textarea, checkbox, radio)
- ✅ ~~Interactive Card Messages~~ (Implemented - rich visual content with images, badges, prices)
- ✅ ~~Quick Replies/Canned Responses~~ (Implemented - clickable response buttons)
- Additional Interactive Message Types (carousels, media attachments)
- Authentication Options
- File Attachement Support

## Styling

The widget comes with built-in styles. It positions itself as a floating button in the bottom-right corner and expands into a chat interface when clicked.

### Color Customization

You can customize the widget's color scheme by passing a `color` prop. All interactive elements will automatically inherit this color:

```tsx
// Examples of different color schemes
<ChatWidget
  webhookUrl="https://your-api.com/chat"
  color="#000000" // Black
/>

<ChatWidget
  webhookUrl="https://your-api.com/chat"
  color="#dc2626" // Red
/>

<ChatWidget
  webhookUrl="https://your-api.com/chat"
  color="#059669" // Green
/>
```

**What gets colored:**

- Toggle button background
- Header background
- User message bubbles
- Send button
- Input field focus borders
- Form submit buttons
- Article link buttons
- Card action buttons
- Card badges
- Form checkbox/radio selections
- Agent name labels (when agentName prop is provided)

The widget automatically generates hover states and light variations of your chosen color for a cohesive design.

### Agent Name Display

When you provide the `agentName` prop, all AI agent messages will be prefixed with the agent's name in bold and colored with your chosen primary color:

```tsx
<ChatWidget
  webhookUrl="https://your-api.com/chat"
  agentName="Support Bot"
  color="#059669"
/>
// Agent messages will display as: "Support Bot: How can I help you today?"
```

## How you can support me

I appreciate you visiting my repository! It would mean a lot if you could give me your feedback or at least leave a star on your way out. If you would like to contribute I am also open to discuss privately.

## License

MIT - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
