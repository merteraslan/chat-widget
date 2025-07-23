# API Reference

Complete reference for all props, methods, and types available in the Chat Widget.

## ChatWidget Component

The main chat widget React component.

### Props

#### webhookUrl (required)

- **Type**: `string`
- **Description**: The webhook endpoint URL where chat messages will be sent
- **Example**: `"https://your-api.com/chat"`

```tsx
<ChatWidget webhookUrl="https://your-api.com/chat" />
```

#### title (optional)

- **Type**: `string`
- **Default**: `"AI Assistant"`
- **Description**: The title displayed in the chat widget header
- **Example**: `"Support Bot"`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  title="Customer Support"
/>
```

#### initialMessage (optional)

- **Type**: `string`
- **Default**: `"Hello! How can I help you today?"`
- **Description**: The first message displayed when the chat opens
- **Example**: `"Welcome! I'm here to help with your questions."`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  initialMessage="Hi! What can I help you with?"
/>
```

#### sessionId (optional)

- **Type**: `string`
- **Default**: `"sample_session"`
- **Description**: Unique identifier for the chat session, sent with each request
- **Example**: `"user-12345-session"`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  sessionId={`user-${userId}-${Date.now()}`}
/>
```

#### csrfToken (optional)

- **Type**: `string`
- **Default**: `""`
- **Description**: CSRF token sent as `X-CSRFToken` header for security
- **Example**: `"abc123def456"`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  csrfToken={process.env.REACT_APP_CSRF_TOKEN}
/>
```

#### color (optional)

- **Type**: `string`
- **Default**: `"#242424"`
- **Description**: Primary color in hex format. Applied to buttons, borders, and interactive elements
- **Example**: `"#3b82f6"`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  color="#059669"
/>
```

**Color inheritance affects:**

- Toggle button background
- Header background
- User message bubbles
- Send button
- Form submit buttons
- Article link buttons
- Card action buttons
- Agent name labels

#### agentName (optional)

- **Type**: `string`
- **Default**: `undefined`
- **Description**: Display name for the AI agent. When provided, agent messages are prefixed with this name
- **Example**: `"Support Bot"`

```tsx
<ChatWidget 
  webhookUrl="https://your-api.com/chat"
  agentName="Customer Support"
/>
```

**Result**: Agent messages display as "Customer Support: How can I help you?"

### Complete Props Interface

```typescript
interface ChatWidgetProps {
  webhookUrl: string;
  title?: string;
  initialMessage?: string;
  sessionId?: string;
  csrfToken?: string;
  color?: string;
  agentName?: string;
}
```

## Message Types

### Webhook Request Format

All user messages are sent as POST requests to your webhook URL:

```typescript
interface WebhookRequest {
  prompt: string;      // User's message text
  session_id: string;  // Session identifier from props
}
```

**Example request:**

```json
{
  "prompt": "Hello, I need help with my account",
  "session_id": "user-12345-session"
}
```

**Request headers:**

```http
Content-Type: application/json
X-CSRFToken: [csrfToken if provided]
```

### Webhook Response Formats

#### Text Messages

```typescript
interface TextResponse {
  output: string;
}
```

**Example:**

```json
{
  "output": "Hello! How can I help you today?"
}
```

#### Interactive Messages

```typescript
interface InteractiveResponse {
  content: string;
  content_type: 'article' | 'form' | 'card' | 'canned_response' | 'quick_reply';
  content_attributes: {
    [key: string]: any;
  };
}
```

See [Message Schema](./message-schema.md) for detailed interactive message formats.

## Form Submission

When forms are submitted (if `submitUrl` is provided), a POST request is sent:

### Request Format

```typescript
interface FormSubmission {
  [fieldId: string]: string | boolean | string[];
}
```

**Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "support",
  "message": "I need help with my account",
  "newsletter": true
}
```

**Request headers:**

```http
Content-Type: application/json
X-CSRFToken: [csrfToken if provided]
```

## CSS Custom Properties

The widget uses CSS custom properties for theming. These are automatically set based on the `color` prop:

```css
:root {
  --widget-primary-color: #3b82f6;      /* From color prop */
  --widget-primary-hover: #2563eb;      /* Generated hover state */
  --widget-primary-light: #dbeafe;      /* Generated light variant */
}
```

### Override Custom Properties

You can override these in your CSS for advanced customization:

```css
.chat-widget {
  --widget-primary-color: #059669;
  --widget-primary-hover: #047857;
  --widget-primary-light: #d1fae5;
}
```

## CSS Classes

### Main Container Classes

- `.chat-widget` - Main widget container
- `.chat-widget-toggle` - Floating toggle button
- `.chat-widget-window` - Expanded chat window
- `.chat-widget-header` - Window header
- `.chat-widget-messages` - Messages container
- `.chat-widget-input` - Input area

### Message Classes

- `.message` - Base message class
- `.message-user` - User messages
- `.message-agent` - Agent messages
- `.message-interactive` - Interactive message container

### Interactive Message Classes

- `.interactive-article` - Article message container
- `.interactive-form` - Form message container
- `.interactive-card` - Card message container
- `.interactive-canned-response` - Quick reply container

## Accessibility

### ARIA Attributes

The widget includes proper ARIA attributes:

- `role="dialog"` on chat window
- `aria-label` on interactive elements
- `aria-expanded` on toggle button
- `aria-live="polite"` on message area

### Keyboard Navigation

- **Enter**: Send message / Submit forms
- **Tab**: Navigate interactive elements
- **Escape**: Close widget (when open)
- **Space**: Activate buttons

### Screen Reader Support

- Proper heading hierarchy
- Descriptive link text
- Form label associations
- Status announcements

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Mobile Support

- **iOS Safari**: 14+
- **Chrome Mobile**: 90+
- **Samsung Internet**: 15+

## Performance

### Bundle Size

- **ES Module**: ~45KB minified
- **UMD**: ~48KB minified
- **CSS**: ~8KB minified
- **Total (gzipped)**: ~18KB

### Runtime Performance

- Lazy loading of interactive components
- Efficient virtual scrolling for long conversations
- Optimized re-renders with React.memo
- Debounced input handling

## TypeScript Definitions

Full TypeScript support with exported types:

```typescript
import type { 
  ChatWidgetProps,
  InteractiveContent,
  ArticleItem,
  FormField,
  CardItem,
  ResponseItem
} from '@merteraslan/chat-widget';
```

## Error Handling

### Network Errors

- Automatic retry for failed requests
- User-friendly error messages
- Fallback to offline mode

### Validation Errors

- Client-side form validation
- Real-time field validation
- Accessible error announcements

### Content Errors

- Graceful fallback for unsupported message types
- Image loading error handling
- Malformed JSON recovery

## Events

### Internal Events

The widget handles these events internally:

- Message sending/receiving
- Form submissions
- Image loading
- Window resize
- Keyboard interactions

### Custom Events

Future versions may support custom event listeners.

## Development

### Debug Mode

Enable console logging in development:

```tsx
// Development logs are automatically enabled
// Check browser console for debug information
```

### Testing

The widget is compatible with:

- Jest + React Testing Library
- Cypress end-to-end tests
- Storybook development

## Version Information

- **Current Version**: 0.0.4
- **React Peer Dependency**: ^19.1.0
- **Node.js Requirement**: 18.0.0+
- **TypeScript Support**: Full

## Migration

See [CHANGELOG.md](../CHANGELOG.md) for version-specific migration information.

## Support

For API questions or issues:

- [GitHub Issues](https://github.com/merteraslan/chat-widget/issues)
- [Documentation](./README.md)
- [FAQ](./faq.md)
