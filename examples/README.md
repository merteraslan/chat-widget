# Examples

This directory contains various examples demonstrating how to integrate the Chat Widget in different environments and use cases.

## 📁 Files

### HTML Examples

- **`basic-usage.html`** - Simple HTML integration example
- **`interactive-demo.html`** - Full-featured interactive demo with all message types

### React Examples

- **`react-examples.tsx`** - Multiple React integration patterns including:
  - Basic usage
  - Advanced usage with session management
  - Make.com integration
  - Zapier integration  
  - n8n integration

### Next.js Examples

- **`nextjs-integration.tsx`** - Next.js App Router integration
- **`nextjs-api-route.ts`** - API route handler example

## 🚀 Usage

### Basic Integration

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';

function App() {
  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      title="AI Assistant"
      initialMessage="Hello! How can I help you today?"
      agentName="Support Bot"
    />
  );
}
```

### Integration with Automation Tools

#### Make.com

```tsx
<ChatWidget
  webhookUrl="https://hook.make.com/your-webhook-id"
  title="Make.com Assistant"
  initialMessage="Connected to Make.com automation!"
  agentName="Automation Bot"
/>
```

#### Zapier

```tsx
<ChatWidget
  webhookUrl="https://hooks.zapier.com/hooks/catch/your-webhook-id"
  title="Zapier Assistant"
  initialMessage="Connected to Zapier workflows!"
  agentName="Workflow Bot"
/>
```

#### n8n

```tsx
<ChatWidget
  webhookUrl="https://your-n8n-instance.com/webhook/your-webhook-id"
  title="n8n Assistant"
  initialMessage="Connected to n8n workflow automation!"
  agentName="Workflow Assistant"
/>
```

## 🔧 API Response Format

Your webhook should accept POST requests with:

```json
{
  "prompt": "user message",
  "session_id": "session_id"
}
```

And respond with one of these formats:

### Text Response

```json
{
  "output": "AI response message",
  "message": "Alternative field for response text"
}
```

### Interactive Message Response

```json
{
  "content": "Select from these helpful articles:",
  "content_type": "article", 
  "content_attributes": {
    "articles": [
      {
        "title": "Getting Started Guide", 
        "description": "Learn how to use our platform",
        "url": "https://example.com/guide"
      }
    ]
  }
}
```

### Canned Response

```json
{
  "content": "How can I help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": [
      { "text": "I need help with billing", "value": "billing_help" },
      { "text": "Technical support", "value": "tech_support" }
    ]
  }
}
```

## 📚 More Information

For complete documentation, see the [docs directory](../docs/README.md).
