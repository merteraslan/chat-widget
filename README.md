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

export default function App() {
  return (
    <ChatWidget
      webhookUrl="/api/chat"
      title="Need help?"
      initialMessage="Hey! Ask me anything."
      sessionId="user-123"
      csrfToken={window.__CSRF__}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `webhookUrl` | `string` | ✅ | Endpoint that receives `{ prompt, session_id }` and returns `{ reply }`. |
| `title` | `React.ReactNode` | ❌ | Text or component shown in the header. |
| `initialMessage` | `string` | ❌ | Bot message inserted on first render. |
| `sessionId` | `string` | ❌ | Passed through to your backend as `session_id`. |
| `csrfToken` | `string` | ❌ | Sent as `X-CSRF-Token` header. |

## Response format

Your server should answer with JSON like:

```json
{ "reply": "Hello there!" }
```

## What gets sent

```json
{
  "prompt": "The text the user typed",
  "session_id": "whatever you passed as sessionId"
}
```

If you provided a CSRF token, the request includes: `X-CSRF-Token: <token>`.

## Interactive Cards

For richer content, you can send interactive cards with images, buttons, and structured data:

```json
{
  "content": "Check out these products:",
  "content_type": "card", 
  "content_attributes": {
    "cards": {
      "title": "Featured Items",
      "cards": [
        {
          "title": "Wireless Headphones",
          "description": "Premium noise-canceling with 30h battery",
          "image": "https://example.com/headphones.jpg",
          "price": "$299",
          "badge": "BESTSELLER",
          "link": "https://shop.example.com/headphones",
          "linkText": "Buy Now"
        }
      ]
    }
  }
}
```

Cards support images, prices, badges, clickable links, and responsive layouts.

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
