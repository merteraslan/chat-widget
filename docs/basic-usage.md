# Basic Usage

This guide covers common usage patterns and examples for the Chat Widget.

## Quick Start

### Minimal Setup

```tsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatWidget webhookUrl="https://your-api.com/chat" />
    </div>
  );
}
```

### Common Configuration

```tsx
<ChatWidget
  webhookUrl="https://your-api.com/chat"
  title="Customer Support"
  initialMessage="Hello! How can I help you today?"
  color="#3b82f6"
  agentName="Support Bot"
  sessionId="user-session-123"
  placeholder="Type your message here..."
  openByDefault={false}
  className="my-chat-widget"
/>
```

## Configuration Patterns

### Environment Variables

```tsx
// .env
REACT_APP_WEBHOOK_URL=https://your-api.com/chat
REACT_APP_CHAT_COLOR=#3b82f6
REACT_APP_AGENT_NAME=Support Assistant
REACT_APP_CHAT_TITLE=Customer Support

// Component
<ChatWidget
  webhookUrl={process.env.REACT_APP_WEBHOOK_URL}
  color={process.env.REACT_APP_CHAT_COLOR}
  agentName={process.env.REACT_APP_AGENT_NAME}
  title={process.env.REACT_APP_CHAT_TITLE}
/>
```

### Dynamic Configuration

```tsx
function App() {
  const [config, setConfig] = useState({
    webhookUrl: "https://your-api.com/chat",
    color: "#3b82f6",
    agentName: "Support Bot"
  });

  // Update config based on user preferences, theme, etc.
  useEffect(() => {
    const userTheme = getUserTheme();
    setConfig(prev => ({
      ...prev,
      color: userTheme.primaryColor
    }));
  }, []);

  return <ChatWidget {...config} />;
}
```

## Common Use Cases

### Customer Support

```tsx
<ChatWidget
  webhookUrl="https://support-api.company.com/chat"
  title="Customer Support"
  initialMessage="Hi! I'm here to help with any questions or issues."
  agentName="Support Team"
  color="#059669"
  sessionId={`support-${userId}`}
/>
```

### Sales Assistance

```tsx
<ChatWidget
  webhookUrl="https://sales-api.company.com/chat"
  title="Sales Assistant"
  initialMessage="Looking for the perfect solution? I'm here to help!"
  agentName="Sales Advisor"
  color="#dc2626"
  sessionId={`sales-${visitorId}`}
/>
```

### Technical Documentation

```tsx
<ChatWidget
  webhookUrl="https://docs-api.company.com/chat"
  title="Documentation Helper"
  initialMessage="Need help finding documentation? Just ask!"
  agentName="Docs Bot"
  color="#7c3aed"
  sessionId={`docs-${userId}`}
/>
```

## Message Handling

### Text Responses

Your webhook should return simple text for basic conversations:

```json
{
  "output": "Hello! How can I help you today?"
}
```

### Interactive Content

For rich interactions, use content types:

```json
{
  "content": "Here are some helpful articles:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Getting Started",
        "description": "Learn the basics",
        "link": "https://docs.example.com/start"
      }
    ]
  }
}
```

## Styling Integration

### Brand Colors

```tsx
// Match your brand primary color
<ChatWidget
  webhookUrl="https://your-api.com/chat"
  color="#1f2937" // Your brand color
  title="Brand Assistant"
  agentName="Brand Bot"
/>
```

### Color Examples

```tsx
// Blue theme
<ChatWidget color="#3b82f6" title="Blue Chat" />

// Green theme  
<ChatWidget color="#059669" title="Green Chat" />

// Purple theme
<ChatWidget color="#7c3aed" title="Purple Chat" />

// Red theme
<ChatWidget color="#dc2626" title="Red Chat" />
```

### Dark Mode Support

```tsx
function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      color={isDark ? "#374151" : "#3b82f6"}
    />
  );
}
```

### Custom CSS Override

```css
/* Override specific styles if needed */
.mw-chat {
  --widget-primary-color: #custom-color;
}

/* Adjust z-index if needed */
.mw-toggle {
  z-index: 9999 !important;
}
```

## Session Management

### User-Specific Sessions

```tsx
function App() {
  const { user } = useAuth();
  
  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      sessionId={user ? `user-${user.id}` : `guest-${generateGuestId()}`}
    />
  );
}
```

### Context-Aware Sessions

```tsx
function ProductPage({ productId }) {
  return (
    <div>
      <h1>Product Details</h1>
      
      <ChatWidget
        webhookUrl="https://your-api.com/chat"
        sessionId={`product-${productId}-${userId}`}
        initialMessage={`Ask me anything about this product!`}
      />
    </div>
  );
}
```

## Error Handling

### Network Error Handling

```tsx
function App() {
  const [webhookUrl, setWebhookUrl] = useState("https://your-api.com/chat");
  
  useEffect(() => {
    // Check if primary webhook is available
    fetch(webhookUrl)
      .catch(() => {
        // Fallback to secondary webhook
        setWebhookUrl("https://fallback-api.com/chat");
      });
  }, []);

  return <ChatWidget webhookUrl={webhookUrl} />;
}
```

### Conditional Rendering

```tsx
function App() {
  const [showChat, setShowChat] = useState(true);
  const [error, setError] = useState(null);

  if (error) {
    return <div>Chat is temporarily unavailable</div>;
  }

  return (
    <div>
      {showChat && (
        <ChatWidget
          webhookUrl="https://your-api.com/chat"
          onError={setError}
        />
      )}
    </div>
  );
}
```

## Performance Optimization

### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const ChatWidget = lazy(() => 
  import('@merteraslan/chat-widget').then(module => ({
    default: module.ChatWidget
  }))
);

function App() {
  return (
    <div>
      <h1>My App</h1>
      
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatWidget webhookUrl="https://your-api.com/chat" />
      </Suspense>
    </div>
  );
}
```

### Conditional Loading

```tsx
function App() {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);

  useEffect(() => {
    // Load chat after initial page load
    const timer = setTimeout(() => {
      setShouldLoadChat(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>My App</h1>
      
      {shouldLoadChat && (
        <ChatWidget webhookUrl="https://your-api.com/chat" />
      )}
    </div>
  );
}
```

## Testing

### Development Testing

```tsx
// Use different webhook for development
const webhookUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/chat'
  : 'https://production-api.com/chat';

<ChatWidget webhookUrl={webhookUrl} />
```

### Mock Responses

For testing without a backend:

```tsx
// Simple mock webhook for testing
const mockWebhook = async (prompt) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    output: `You said: "${prompt}". This is a mock response for testing.`
  };
};
```

## Mobile Considerations

### Viewport Configuration

Ensure your HTML includes:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Touch-Friendly Sizing

The widget automatically handles touch interactions, but ensure your page doesn't interfere:

```css
/* Avoid preventing touch events */
body {
  touch-action: manipulation; /* Allow standard touch gestures */
}
```

## Security

### CSRF Protection

```tsx
<ChatWidget
  webhookUrl="https://your-api.com/chat"
  csrfToken={getCsrfToken()} // Get from your auth system
/>
```

### Content Security Policy

Add to your HTML head:

```html
<meta http-equiv="Content-Security-Policy" 
      content="connect-src 'self' https://your-api.com;">
```

## Analytics

### Track Usage

```tsx
function App() {
  const handleChatOpen = () => {
    analytics.track('Chat Widget Opened');
  };

  const handleMessageSent = (message) => {
    analytics.track('Chat Message Sent', { message });
  };

  // Note: These event handlers are conceptual
  // The actual widget doesn't expose these events yet
  
  return (
    <ChatWidget
      webhookUrl="https://your-api.com/chat"
      // onOpen={handleChatOpen}
      // onMessageSent={handleMessageSent}
    />
  );
}
```

## Common Patterns

### Multi-Page Applications

```tsx
// Layout component that includes chat on all pages
function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      
      <ChatWidget
        webhookUrl="https://your-api.com/chat"
        sessionId={`app-${getCurrentUserId()}`}
      />
    </div>
  );
}
```

### Context-Sensitive Help

```tsx
function DocumentationPage({ section }) {
  return (
    <div>
      <h1>{section.title}</h1>
      <div>{section.content}</div>
      
      <ChatWidget
        webhookUrl="https://docs-api.com/chat"
        initialMessage={`I'm here to help with ${section.title}. What questions do you have?`}
        sessionId={`docs-${section.id}`}
      />
    </div>
  );
}
```

## Next Steps

- [API Reference](./api-reference.md) - Complete prop documentation
- [Message Schema](./message-schema.md) - Interactive message formats
- [Examples](./examples/) - Complete working examples
- [FAQ](./faq.md) - Common issues and solutions

## Troubleshooting

### Widget Not Appearing

1. Check CSS import: `import '@merteraslan/chat-widget/dist/style.css';`
2. Verify webhook URL is accessible
3. Check browser console for errors
4. Ensure no CSS conflicts with positioning

### Messages Not Sending

1. Verify webhook URL returns valid JSON
2. Check CORS configuration on your server  
3. Ensure webhook accepts POST requests
4. Check network tab in browser dev tools

### Styling Issues

1. Ensure CSS is imported after the component import
2. Check for CSS specificity conflicts
3. Verify color prop is in hex format
4. Use browser dev tools to inspect styles

For more detailed troubleshooting, see the [FAQ](./faq.md).
