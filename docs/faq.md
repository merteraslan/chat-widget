# Frequently Asked Questions (FAQ)

This document covers common issues and solutions when integrating and deploying the Chat Widget.

## Table of Contents

- [CORS Issues](#cors-issues)
- [Content Security Policy (CSP)](#content-security-policy-csp)
- [Form Submission Issues](#form-submission-issues)
- [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
- [Installation & Package Issues](#installation--package-issues)
- [Styling & Theming](#styling--theming)
- [Performance & Bundle Size](#performance--bundle-size)
- [Mobile & Responsive Issues](#mobile--responsive-issues)
- [Webhook & Backend Integration](#webhook--backend-integration)
- [TypeScript Issues](#typescript-issues)

## CORS Issues

### Problem: "Access to fetch at ... has been blocked by CORS policy"

This error occurs when your webhook endpoint doesn't allow requests from your frontend domain.

#### Solution 1: Configure CORS Headers (Recommended)

Add these headers to your webhook endpoint response:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRFToken');
  next();
});
```

For development (localhost), you can use:

```javascript
res.header('Access-Control-Allow-Origin', '*');
```

#### Solution 2: Use a Proxy Server

For development, configure your build tool to proxy requests:

**Vite (vite.config.js):**

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

**Webpack Dev Server:**

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
```

#### Solution 3: Same-Origin Deployment

Deploy your frontend and backend on the same domain to avoid CORS entirely.

### Problem: CORS Preflight Request Failing

The browser sends an OPTIONS request before POST requests. Ensure your server handles OPTIONS requests:

```javascript
// Express.js
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRFToken');
  res.sendStatus(200);
});
```

## Content Security Policy (CSP)

### Problem: "Refused to connect to ... because it violates the document's Content Security Policy"

Your CSP headers are blocking the webhook requests.

#### Solution: Update CSP Headers

Add your webhook domain to the `connect-src` directive:

```html
<meta http-equiv="Content-Security-Policy" 
      content="connect-src 'self' https://your-webhook-domain.com;">
```

For image loading in card messages, also add to `img-src`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="connect-src 'self' https://your-webhook-domain.com; 
               img-src 'self' data: https:;">
```

#### Complete CSP Example

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://your-webhook-domain.com; 
               img-src 'self' data: https:; 
               font-src 'self' data:;">
```

### Problem: Inline Styles Blocked

The widget uses inline styles for dynamic theming. Allow them with:

```html
<meta http-equiv="Content-Security-Policy" 
      content="style-src 'self' 'unsafe-inline';">
```

## Form Submission Issues

### Problem: Form Submissions Not Working

#### Check 1: Verify submitUrl

Ensure the `submitUrl` in your form message is correct and accessible:

```json
{
  "content_type": "form",
  "content_attributes": {
    "form": {
      "submitUrl": "https://your-api.com/contact-form",
      "fields": [...]
    }
  }
}
```

#### Check 2: Handle POST Requests

Your form endpoint must accept POST requests with JSON data:

```javascript
// Express.js example
app.post('/contact-form', express.json(), (req, res) => {
  console.log('Form data:', req.body);
  // Process form data
  res.json({ success: true, message: 'Form submitted successfully' });
});
```

#### Check 3: CORS for Form Submissions

Form submissions are separate from chat messages and may need their own CORS configuration:

```javascript
app.use('/contact-form', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

### Problem: Form Validation Errors

Ensure your form field validation patterns are valid RegEx:

```json
{
  "id": "email",
  "type": "email",
  "validation": {
    "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    "message": "Please enter a valid email address"
  }
}
```

## Server-Side Rendering (SSR)

### Problem: "window is not defined" or "document is not defined"

The widget uses browser APIs that aren't available during SSR.

#### Solution 1: Dynamic Import (Recommended)

```jsx
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

#### Solution 2: Next.js Dynamic Import

```jsx
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

#### Solution 3: Conditional Rendering

```jsx
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

### Problem: Hydration Mismatches

Ensure the component renders the same on server and client:

```jsx
// Use a loading state that matches SSR
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

return mounted ? <ChatWidget {...props} /> : <div className="chat-widget-loading" />;
```

## Installation & Package Issues

### Problem: "Package not found" or 403 Forbidden

This is a private GitHub package that requires authentication.

#### Solution: Configure npm Authentication

1. Create `.npmrc` in your project root:

```text
@merteraslan:registry=https://npm.pkg.github.com/
```

2. Generate a GitHub Personal Access Token:
   - Go to GitHub Settings > Personal Access Tokens
   - Create token with `read:packages` permission

3. Login to npm:

```bash
npm login --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: your-personal-access-token
```

### Problem: Version Conflicts

#### Check Peer Dependencies

Ensure you have compatible React versions:

```json
{
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

#### Force Resolution (if needed)

```json
{
  "overrides": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

## Styling & Theming

### Problem: Widget Not Visible or Positioned Wrong

#### Check 1: CSS Import

Ensure you import the widget styles:

```jsx
import { ChatWidget } from '@merteraslan/chat-widget';
import '@merteraslan/chat-widget/dist/style.css';
```

#### Check 2: Z-Index Conflicts

The widget uses high z-index values. If it's hidden behind other elements:

```css
.chat-widget {
  z-index: 9999 !important;
}
```

#### Check 3: Container Constraints

Ensure the widget's parent doesn't have `overflow: hidden` or positioning constraints:

```css
/* Avoid this */
.container {
  overflow: hidden; /* This might hide the widget */
  position: relative; /* This might affect positioning */
}
```

### Problem: Custom Colors Not Applied

Ensure you pass a valid hex color:

```jsx
// Correct
<ChatWidget color="#3b82f6" />

// Incorrect
<ChatWidget color="blue" />
<ChatWidget color="rgb(59, 130, 246)" />
```

## Performance & Bundle Size

### Problem: Large Bundle Size

#### Solution 1: Tree Shaking

Ensure your bundler supports tree shaking and the widget is imported correctly:

```jsx
// Correct - tree-shakeable
import { ChatWidget } from '@merteraslan/chat-widget';

// Avoid - imports entire package
import * as ChatWidget from '@merteraslan/chat-widget';
```

#### Solution 2: Lazy Loading

Load the widget only when needed:

```jsx
const ChatWidget = lazy(() => 
  import('@merteraslan/chat-widget').then(module => ({
    default: module.ChatWidget
  }))
);

// Use with Suspense
<Suspense fallback={<div>Loading chat...</div>}>
  <ChatWidget webhookUrl="..." />
</Suspense>
```

### Problem: Memory Leaks

The widget properly cleans up event listeners, but ensure you don't hold references:

```jsx
// Avoid storing refs unless necessary
const widgetRef = useRef(null);

// Cleanup in useEffect if needed
useEffect(() => {
  return () => {
    // Cleanup code
  };
}, []);
```

## Mobile & Responsive Issues

### Problem: Widget Not Mobile-Friendly

The widget is responsive by default. If you have issues:

#### Check Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### Check Touch Events

Ensure touch events aren't being prevented:

```css
/* Avoid this on mobile */
* {
  touch-action: none;
}
```

### Problem: Keyboard Issues on Mobile

For form inputs, ensure proper keyboard types:

```json
{
  "type": "email", // Shows email keyboard
  "type": "tel"    // Shows numeric keyboard
}
```

## Webhook & Backend Integration

### Problem: "No Response from Webhook"

#### Check 1: Network Tab

Open browser DevTools > Network tab to see the actual request/response.

#### Check 2: Response Format

Ensure your webhook returns valid JSON:

```javascript
// Correct
res.json({ output: "Hello!" });

// Incorrect
res.send("Hello!"); // Plain text
```

#### Check 3: HTTP Status Codes

Return proper status codes:

```javascript
// Success
res.status(200).json({ output: "Hello!" });

// Error
res.status(500).json({ error: "Something went wrong" });
```

### Problem: Webhook Timeout

Add timeout handling in your backend:

```javascript
// Express.js with timeout
app.use('/webhook', (req, res, next) => {
  req.setTimeout(30000); // 30 second timeout
  next();
});
```

## TypeScript Issues

### Problem: Type Definitions Not Found

#### Solution 1: Manual Type Declaration

Create a `types/chat-widget.d.ts` file:

```typescript
declare module '@merteraslan/chat-widget' {
  export interface ChatWidgetProps {
    webhookUrl: string;
    title?: string;
    initialMessage?: string;
    sessionId?: string;
    csrfToken?: string;
    color?: string;
    agentName?: string;
  }
  
  export const ChatWidget: React.FC<ChatWidgetProps>;
}
```

#### Solution 2: Update tsconfig.json

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### Problem: Module Resolution Issues

Ensure proper module resolution:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@merteraslan/chat-widget": ["node_modules/@merteraslan/chat-widget"]
    }
  }
}
```

## Debugging Tips

### Enable Console Logging

The widget logs information in development mode. Check the console for:

- Network requests and responses
- Interactive message parsing
- Form submission events
- Error messages

### Test with Demo Page

Use the included `demo-interactive.html` to test your webhook responses:

1. Update the webhook URL in the demo
2. Test different message types
3. Verify CORS and CSP settings

### Network Analysis

Use browser DevTools to analyze:

- Request/response headers
- Payload size and format
- Response times
- Error status codes

## Getting Help

If you're still experiencing issues:

1. **Check the console** for error messages
2. **Review the Network tab** in DevTools
3. **Test with the demo page** to isolate issues
4. **Create a minimal reproduction** of the problem
5. **Open an issue** on GitHub with:
   - Error messages
   - Browser and version
   - Code examples
   - Network request/response details

## Version-Specific Issues

### v0.0.4 Known Issues

- None currently reported

### Upgrading from v0.0.3

- No breaking changes
- Enhanced TypeScript support
- Improved error handling

For more help, visit the [GitHub Issues](https://github.com/merteraslan/chat-widget/issues) page.
