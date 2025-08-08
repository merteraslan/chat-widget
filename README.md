# @merteraslan/chat-widget

## Why this widget

Build customer conversations without getting trapped by third-party chat platforms. This React component connects directly to your own backend, giving you complete control over data, styling, and functionality. You keep ownership of every conversation while getting a production-ready chat interface in minutes.

## Install

```bash
npm i @merteraslan/chat-widget
# or
yarn add @merteraslan/chat-widget
```

## How requests are shaped

When users send messages, the widget transmits a JSON payload to your configured endpoint:

```json
{
  "prompt": "What are your business hours?",
  "session_id": "visitor-456"
}
```

Your server responds with either plain text wrapped in an `output` field, or structured content for interactive features. CSRF protection headers are automatically included when you provide a token.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `color` | `string` | ❌ | Accent color applied throughout the interface using hex notation. |
| `agentName` | `string` | ❌ | Display name that appears alongside bot responses. |
| `webhookUrl` | `string` | ✅ | The HTTP endpoint your backend exposes. The widget POSTs a JSON payload with the user's text and the sessionId. You own the endpoint; return a plain string in the field you configure (default: output). |
| `openByDefault` | `boolean` | ❌ | Controls initial widget visibility when the page loads. Default: `false`. |
| `placeholder` | `string` | ❌ | Hint text displayed inside the message input field. Default: `"Share your thoughts..."`. |
| `csrfToken` | `string` | ❌ | Security token transmitted via `X-CSRF-Token` header with each request. |
| `title` | `React.ReactNode` | ❌ | Content rendered in the chat window header area. Default: `"Assistant"`. |
| `sessionId` | `string` | ❌ | Unique identifier forwarded to your backend for conversation tracking. |
| `initialMessage` | `string` | ❌ | Opening message from the bot when chat first appears. Default: `"Hi there! What can I do for you?"`. |
| `className` | `string` | ❌ | Custom CSS class applied to the root widget element. |

## Quick Start

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';

export default function App() {
  return (
    <ChatWidget
      webhookUrl="/api/conversations"
      title="Customer Support"
      initialMessage="Welcome! How can we assist you today?"
      sessionId="guest-789"
      agentName="Alex"
      color="#059669"
      placeholder="Describe your question..."
      csrfToken={window.__CSRF__}
    />
  );
}
```

## Response Formats

### Simple Text Response

```json
{
  "output": "Our store opens at 9 AM Monday through Friday!"
}
```

### Interactive Content Response

```json
{
  "content": "Pick a category:",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        { "id": "orders", "text": "Order status" },
        { "id": "returns", "text": "Returns & refunds" }
      ]
    }
  }
}
```

## Interactive Messages

Beyond basic text exchanges, the widget renders rich interactive elements that enhance user engagement. Your backend can send structured responses that become clickable buttons, forms, article links, and product showcases.

### Canned Responses / Quick Replies

```json
{
  "content": "Which department can help you?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        { "id": "tech", "text": "Technical Issues" },
        { "id": "sales", "text": "Sales Inquiry" }
      ]
    }
  }
}
```

### Article Links

```json
{
  "content": "Browse these helpful guides:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Getting Started Guide",
        "description": "Step-by-step setup instructions",
        "link": "https://help.example.com/setup"
      }
    ]
  }
}
```

### Interactive Forms

```json
{
  "content": "Complete this information request:",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Support Ticket",
      "fields": [
        {
          "id": "issue",
          "type": "text",
          "label": "Describe the problem",
          "required": true
        },
        {
          "id": "priority",
          "type": "select",
          "label": "Urgency level",
          "required": false
        }
      ]
    }
  }
}
```

### Product/Service Cards

```json
{
  "content": "Explore these solutions:",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "cards": [
        {
          "title": "Enterprise Package",
          "description": "Full-featured solution for large teams",
          "image": "https://cdn.example.com/enterprise.png",
          "price": "$99/month",
          "badge": "RECOMMENDED",
          "link": "https://example.com/enterprise",
          "linkText": "Learn More"
        }
      ]
    }
  }
}
```

## Styling

The component includes self-contained CSS with scoped class names to avoid conflicts. Customize the appearance by targeting specific selectors with higher specificity or by wrapping the widget in a container with custom CSS.

For complete design control, the source code is intentionally compact and readable — perfect for forking and modifying to match your exact requirements.

## Development

```bash
npm install
npm run dev
```

### CDN usage (no build tools)

Option A: Native ESM with an import map

```html
<link rel="stylesheet" href="https://unpkg.com/@merteraslan/chat-widget@latest/dist/style.css" />

<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react-dom/client": "https://esm.sh/react-dom@18/client",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime"
  }
}
</script>

<script type="module">
  import * as ReactDOMClient from 'react-dom/client';
  // Provide ReactDOM global for the widget's mount helper
  window.ReactDOM = ReactDOMClient;

  import { mountChatWidget } from 'https://unpkg.com/@merteraslan/chat-widget@latest/dist/chat-widget.es.js';
  mountChatWidget(document.body, { webhookUrl: '/api/chat' });
</script>
```

Option B: UMD + globals

```html
<link rel="stylesheet" href="https://unpkg.com/@merteraslan/chat-widget@latest/dist/style.css" />

<!-- React globals -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Widget UMD build exposes window.ChatWidget -->
<script src="https://unpkg.com/@merteraslan/chat-widget@latest/dist/chat-widget.umd.js"></script>
<script>
  const { mountChatWidget } = window.ChatWidget;
  mountChatWidget(document.body, { webhookUrl: '/api/chat' });
</script>
```

More examples in `examples/`.

## License

MIT - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
