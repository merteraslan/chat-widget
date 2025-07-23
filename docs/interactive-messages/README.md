# Interactive Messages

Interactive messages enhance chat conversations by providing rich, engaging content that goes beyond simple text. The chat widget supports multiple interactive message types, each designed for specific use cases and user interactions.

## Available Message Types

### 📄 [Article Messages](articles.md)

Display clickable articles, documentation links, or knowledge base resources. Perfect for sharing relevant information and guiding users to helpful resources.

**Use cases**: Knowledge base articles, help documentation, API docs, tutorials, product information

### 📝 [Form Messages](forms.md)

Collect structured data through interactive forms with various field types, validation, and submission handling.

**Use cases**: Lead generation, support tickets, feedback collection, user registration, surveys

### 🎴 [Card Messages](cards.md)

Showcase rich visual content with images, descriptions, badges, prices, and action links in an organized card layout.

**Use cases**: Product catalogs, service offerings, team members, blog posts, event listings

### ⚡ [Canned Response Messages](canned-responses.md)

Provide pre-defined response options that users can select with a single click for faster navigation and interaction.

**Use cases**: FAQ navigation, menu systems, satisfaction surveys, yes/no questions, quick replies

## Getting Started

Interactive messages are sent as JSON objects with a specific structure. All interactive messages follow this basic format:

```json
{
  "content": "Display text for the message",
  "content_type": "message_type",
  "content_attributes": {
    // Type-specific configuration
  }
}
```

### Basic Example

Here's a simple canned response message:

```json
{
  "content": "How can I help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        {
          "id": "support",
          "text": "I need technical support"
        },
        {
          "id": "sales", 
          "text": "I want to talk to sales"
        }
      ]
    }
  }
}
```

## Common Properties

All interactive messages share these common properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Header text displayed with the message |
| `content_type` | string | Type of interactive message |
| `content_attributes` | object | Type-specific configuration and data |

## Integration Methods

### Webhook Response

The most common way to send interactive messages is through webhook responses:

```javascript
// Your webhook endpoint
app.post('/webhook', (req, res) => {
  res.json({
    content: "Choose a topic:",
    content_type: "canned_response",
    content_attributes: {
      responses: {
        responses: [
          { id: "billing", text: "Billing Questions" },
          { id: "technical", text: "Technical Support" }
        ]
      }
    }
  });
});
```

### Direct API Call

You can also send interactive messages directly through the chat API:

```javascript
await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: {
      content: "Featured products",
      content_type: "card",
      content_attributes: {
        cards: {
          cards: [
            {
              title: "Product 1",
              description: "Great product",
              image: "https://example.com/image.jpg"
            }
          ]
        }
      }
    }
  })
});
```

## Event Handling

Interactive messages can dispatch custom events that your application can listen for:

```javascript
// Listen for form submissions
document.addEventListener('formSubmitted', (event) => {
  console.log('Form data:', event.detail);
});

// Listen for canned response selections
document.addEventListener('cannedResponseSelected', (event) => {
  console.log('Selected:', event.detail);
});

// Listen for card clicks
document.addEventListener('cardClicked', (event) => {
  console.log('Card clicked:', event.detail);
});
```

## Styling and Theming

Interactive messages automatically inherit your widget's theme colors. When you set the `color` prop on the ChatWidget component, all interactive elements will use that color consistently:

```jsx
<ChatWidget 
  color="#007bff"  // All interactive elements will use this color
  // ... other props
/>
```

### Custom Styling

You can override specific styles using CSS custom properties:

```css
.chat-widget {
  --widget-primary-color: #007bff;
  --widget-primary-hover: #0056b3;
  --widget-primary-light: #e7f3ff;
}
```

## Best Practices

### General Guidelines

1. **Keep content concise** - Users prefer quick, scannable content
2. **Use clear call-to-actions** - Make it obvious what users should do next
3. **Provide fallback options** - Always include "Other" or "Something else" options
4. **Test on mobile** - Ensure interactive elements work well on touch devices
5. **Consider accessibility** - Use proper alt text, ARIA labels, and keyboard navigation

### Performance Tips

1. **Optimize images** - Use appropriate image sizes and formats
2. **Limit options** - Don't overwhelm users with too many choices
3. **Lazy load content** - Large forms or card sets should load progressively
4. **Handle errors gracefully** - Provide clear feedback when things go wrong

### User Experience

1. **Progressive disclosure** - Start simple, add complexity as needed
2. **Consistent language** - Use the same terminology throughout
3. **Visual hierarchy** - Use styling to guide user attention
4. **Quick feedback** - Provide immediate visual feedback for interactions

## Examples by Use Case

### Customer Support Flow

```json
{
  "content": "How can we help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        { "id": "account", "text": "Account Issues" },
        { "id": "billing", "text": "Billing Questions" },
        { "id": "technical", "text": "Technical Support" },
        { "id": "other", "text": "Something Else" }
      ]
    }
  }
}
```

### Product Showcase

```json
{
  "content": "Check out our latest products",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "cards": [
        {
          "title": "New Product",
          "description": "Amazing features",
          "image": "https://example.com/product.jpg",
          "price": "$99.99",
          "link": "https://shop.example.com/product"
        }
      ]
    }
  }
}
```

### Lead Collection

```json
{
  "content": "Get a free consultation",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Schedule Consultation",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Name",
          "required": true
        },
        {
          "id": "email",
          "type": "email", 
          "label": "Email",
          "required": true
        }
      ]
    }
  }
}
```

## Migration Guide

If you're currently using simple text messages, here's how to enhance them with interactive elements:

### Before (Simple Text)

```json
{
  "content": "Here are some helpful articles: Article 1: https://... Article 2: https://..."
}
```

### After (Interactive Articles)

```json
{
  "content": "Here are some helpful articles:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Article 1",
        "description": "Helpful information about...",
        "link": "https://..."
      }
    ]
  }
}
```

## Troubleshooting

### Common Issues

1. **Interactive message not displaying**: Check that `content_type` matches exactly
2. **Styling looks broken**: Verify CSS custom properties are set correctly
3. **Events not firing**: Ensure event listeners are attached to `document`
4. **Images not loading**: Check CORS settings and image URLs
5. **Form not submitting**: Verify `submitUrl` is accessible and accepts POST requests

### Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Inspect network tab** for failed requests
3. **Validate JSON structure** against the schemas
4. **Test with simple examples** before adding complexity

## API Reference

For detailed API documentation including all properties, validation rules, and advanced examples, see the individual message type documentation:

- [Article Messages API](articles.md#message-format)
- [Form Messages API](forms.md#message-format)
- [Card Messages API](cards.md#message-format)
- [Canned Response Messages API](canned-responses.md#message-format)

## Support

For additional help with interactive messages:

1. Check the [FAQ](../faq.md) for common questions
2. Review [example implementations](../../examples/) in the codebase
3. See [webhook configuration](../webhook-configuration.md) for setup help
4. Refer to the [message schema](../message-schema.md) for validation

---

*Interactive messages make conversations more engaging and help users accomplish tasks faster. Choose the right message type for your use case and follow the best practices for optimal user experience.*
