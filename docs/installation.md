# Installation & Setup

This guide will help you install and configure the Chat Widget in your React application.

## Prerequisites

- React 18.0.0 or higher (supports React 19+)
- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager

## Installation

### Install the Package

```bash
npm install @merteraslan/chat-widget
```

Or with yarn:

```bash
yarn add @merteraslan/chat-widget
```

Or with pnpm:

```bash
pnpm add @merteraslan/chat-widget
```

## Basic Setup

### 1. Import the Component

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';
```

### 2. Add to Your App

```tsx
function App() {
  return (
    <div className="App">
      {/* Your existing content */}
      
      <ChatWidget
        webhookUrl="https://your-api.com/chat"
        title="AI Assistant"
        initialMessage="Hello! How can I help you today?"
      />
    </div>
  );
}
```

## Configuration Options

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `webhookUrl` | string | Your webhook endpoint URL |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | React.ReactNode | "Chat" | Widget title in header |
| `initialMessage` | string | "Hello! How can I help you today?" | First message shown |
| `sessionId` | string | undefined | Session identifier |
| `csrfToken` | string | undefined | CSRF token for security |
| `placeholder` | string | "Type a message…" | Input placeholder text |
| `openByDefault` | boolean | false | Open widget automatically |
| `className` | string | "" | Additional CSS class |
| `color` | string | undefined | Primary color (hex format) |
| `agentName` | string | undefined | Agent display name |

## Complete Example

```tsx
import React from 'react';
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Website</h1>
      </header>
      
      <main>
        {/* Your main content */}
      </main>
      
      <ChatWidget
        webhookUrl="https://your-api.com/chat"
        title="Support Assistant"
        initialMessage="Hi there! I'm here to help with any questions you might have."
        sessionId="user-12345"
        color="#3b82f6"
        agentName="Support Bot"
        csrfToken={process.env.REACT_APP_CSRF_TOKEN}
      />
    </div>
  );
}

export default App;
```

## Environment Variables

For better security and flexibility, use environment variables:

```bash
# .env
REACT_APP_WEBHOOK_URL=https://your-api.com/chat
REACT_APP_CSRF_TOKEN=your-csrf-token
REACT_APP_CHAT_COLOR=#3b82f6
```

```tsx
<ChatWidget
  webhookUrl={process.env.REACT_APP_WEBHOOK_URL}
  color={process.env.REACT_APP_CHAT_COLOR}
  csrfToken={process.env.REACT_APP_CSRF_TOKEN}
/>
```

## Framework-Specific Setup

### Next.js

Next.js requires special handling due to Server-Side Rendering (SSR). The widget uses browser APIs not available on the server.

#### Option 1: Dynamic Import (Recommended)

```tsx
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  () => import('@merteraslan/chat-widget').then(mod => ({ default: mod.ChatWidget })),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <ChatWidget webhookUrl="https://your-api.com/chat" />
    </div>
  );
}
```

#### Option 2: Conditional Rendering

```tsx
import { useState, useEffect } from 'react';
import { ChatWidget } from '@merteraslan/chat-widget';

function MyComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      title="AI Assistant"
    />
  );
}
```

#### Option 3: Manual Dynamic Loading  

```tsx
import { useState, useEffect } from 'react';

function MyComponent() {
  const [ChatWidget, setChatWidget] = useState(null);

  useEffect(() => {
    import('@merteraslan/chat-widget').then((module) => {
      setChatWidget(() => module.ChatWidget);
    });
  }, []);

  if (!ChatWidget) return null;

  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      title="AI Assistant"
    />
  );
}
```

#### Avoiding Hydration Mismatches

Ensure consistent rendering between server and client:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

return mounted ? <ChatWidget {...props} /> : <div className="chat-widget-loading" />;
```

### Vite

Vite works out of the box. Just ensure you import the CSS:

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';
```

### Create React App

Standard React import works:

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';
```

## TypeScript Support

The package includes TypeScript definitions. For better IntelliSense:

```tsx
import type { ChatWidgetProps } from '@merteraslan/chat-widget';

const widgetProps: ChatWidgetProps = {
  webhookUrl: "https://your-api.com/chat",
  title: "AI Assistant",
  color: "#3b82f6"
};

<ChatWidget {...widgetProps} />
```

## Troubleshooting Installation

### Common Issues

1. **Package not found (403)**
   - Ensure you've configured `.npmrc` correctly
   - Verify your GitHub token has `read:packages` permission
   - Check you're logged in: `npm whoami --registry=https://npm.pkg.github.com`

2. **Peer dependency warnings**
   - Ensure React 18.0.0+ is installed (supports up to React 19+)
   - Update React if necessary: `npm install react@latest react-dom@latest`

3. **Module resolution errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check your bundler configuration supports ES modules

### Verification

To verify the installation worked:

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';

console.log(ChatWidget); // Should log the component function
```

## Next Steps

- [Basic Usage](./basic-usage.md) - Learn basic implementation patterns
- [Message Schema](./message-schema.md) - Understand interactive message formats
- [Webhook Configuration](./webhook-configuration.md) - Set up your backend
- [FAQ](./faq.md) - Common issues and solutions

## Getting Help

If you encounter issues during installation:

1. Check the [FAQ](./faq.md) for common solutions
2. Verify your setup against this guide
3. Open an issue on [GitHub](https://github.com/merteraslan/chat-widget/issues) with:
   - Your package.json dependencies
   - Error messages
   - Operating system and Node.js version
