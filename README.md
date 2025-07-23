# @merteraslan/chat-widget

A tiny React chat bubble that talks to **your** backend. Drop it in, point it at an endpoint, and you're done.

- No vendor lock‑in — it just POSTs the user's text to your URL and renders whatever you send back.
- Toggleable floating window with a minimal UI.
- Optional initial bot message and session tracking.
- MIT licensed.

## Install

```bash
npm i @merteraslan/chat-widget
# or
yarn add @merteraslan/chat-widget
```

## Quick Start

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';

export default function App() {
  return (
    <ChatWidget
      webhookUrl="/api/chat"
      title="Need help?"
      initialMessage="Hey! Ask me anything."
      sessionId="user-123"
      agentName="Support Bot"
      color="#3b82f6"
      placeholder="Type your question..."
      csrfToken={window.__CSRF__}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `webhookUrl` | `string` | ✅ | Endpoint that receives `{ prompt, session_id }` and returns response data. |
| `title` | `React.ReactNode` | ❌ | Text or component shown in the header. Default: `"Chat"`. |
| `initialMessage` | `string` | ❌ | Bot message inserted on first render. Default: `"Hello! How can I help you today?"`. |
| `sessionId` | `string` | ❌ | Passed through to your backend as `session_id`. |
| `csrfToken` | `string` | ❌ | Sent as `X-CSRF-Token` header. |
| `placeholder` | `string` | ❌ | Input field placeholder text. Default: `"Type a message…"`. |
| `openByDefault` | `boolean` | ❌ | Whether chat opens automatically. Default: `false`. |
| `className` | `string` | ❌ | Additional CSS class for the widget container. |
| `color` | `string` | ❌ | Primary color for theming (hex format). |
| `agentName` | `string` | ❌ | Name prefix for assistant messages. |

## Response Formats

### Simple Text Response

```json
{
  "output": "Hello there!"
}
```

### Interactive Content Response

```json
{
  "content": "Choose an option:",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        { "id": "help", "text": "I need help" },
        { "id": "info", "text": "Tell me more" }
      ]
    }
  }
}
```

## What gets sent

```json
{
  "prompt": "The text the user typed",
  "session_id": "whatever you passed as sessionId"
}
```

If you provided a CSRF token, the request includes: `X-CSRF-Token: <token>`.

## Interactive Messages

The widget supports rich interactive content beyond simple text. You can send:

### Canned Responses / Quick Replies

```json
{
  "content": "How can I help you?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        { "id": "support", "text": "Technical Support" },
        { "id": "billing", "text": "Billing Questions" }
      ]
    }
  }
}
```

### Article Links

```json
{
  "content": "Here are some helpful resources:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "API Documentation",
        "description": "Complete API reference guide",
        "link": "https://docs.example.com/api"
      }
    ]
  }
}
```

### Interactive Forms

```json
{
  "content": "Please fill out this form:",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Information",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Your Name",
          "required": true
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "required": true
        }
      ]
    }
  }
}
```

### Product/Service Cards

```json
{
  "content": "Check out these options:",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "cards": [
        {
          "title": "Premium Plan",
          "description": "Advanced features for power users",
          "image": "https://example.com/image.jpg",
          "price": "$29/month",
          "badge": "POPULAR",
          "link": "https://example.com/signup",
          "linkText": "Sign Up"
        }
      ]
    }
  }
}
```

## Styling

The widget ships with scoped CSS classes. Override anything with stronger selectors or by adding a wrapper and using `:where()`.

If you want total control, fork the component or swap out the markup — the code is short.

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
