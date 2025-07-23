# Canned Response Messages

Canned response messages (also known as quick replies) provide users with pre-defined response options that they can select with a single click. This improves user experience by reducing typing and provides faster navigation through common conversation flows.

## Use Cases

- **FAQ Navigation**: Quick answers to frequently asked questions
- **Menu Systems**: Navigate through different support categories
- **Lead Qualification**: Gather information about user needs
- **Satisfaction Surveys**: Quick feedback collection
- **Appointment Booking**: Time slot selection
- **Product Categories**: Browse different product types
- **Support Routing**: Direct users to appropriate departments
- **Yes/No Questions**: Simple binary choices

## Message Format

### Basic Structure

```json
{
  "content": "How can I help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Choose an option",
      "description": "Select from the options below or type your own message",
      "responses": [
        {
          "id": "support",
          "text": "I need technical support",
          "value": "technical_support"
        },
        {
          "id": "sales",
          "text": "I want to talk to sales",
          "value": "sales_inquiry"
        }
      ]
    }
  }
}
```

### Alternative Format (Quick Reply)

The `quick_reply` content type works identically to `canned_response`:

```json
{
  "content": "What would you like to do?",
  "content_type": "quick_reply",
  "content_attributes": {
    "responses": {
      "responses": [
        {
          "id": "option1",
          "text": "Option 1"
        }
      ]
    }
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Header text displayed above the options |
| `content_type` | string | Must be `"canned_response"` or `"quick_reply"` |
| `content_attributes.responses` | object | Responses configuration object |
| `responses.responses` | array | Array of response option objects |

### Response Configuration

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Optional section title |
| `description` | string | Optional instruction text |
| `responses` | array | Array of individual response options |

## Response Option Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `id` | string | Unique identifier for the response | ✅ |
| `text` | string | Display text shown to the user | ✅ |
| `value` | string | Value sent when selected (defaults to text if not provided) | ❌ |

## Examples

### Customer Support Menu

```json
{
  "content": "How can we assist you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Customer Support",
      "description": "Choose the option that best describes your need:",
      "responses": [
        {
          "id": "technical",
          "text": "Technical Support",
          "value": "technical_support"
        },
        {
          "id": "billing",
          "text": "Billing Questions",
          "value": "billing_inquiry"
        },
        {
          "id": "account",
          "text": "Account Issues",
          "value": "account_help"
        },
        {
          "id": "feedback",
          "text": "Feedback & Suggestions",
          "value": "customer_feedback"
        },
        {
          "id": "other",
          "text": "Something Else",
          "value": "general_inquiry"
        }
      ]
    }
  }
}
```

### Product Interest

```json
{
  "content": "What are you interested in?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Product Categories",
      "responses": [
        {
          "id": "software",
          "text": "Software Solutions",
          "value": "software_products"
        },
        {
          "id": "hardware",
          "text": "Hardware Products",
          "value": "hardware_products"
        },
        {
          "id": "services",
          "text": "Professional Services",
          "value": "consulting_services"
        },
        {
          "id": "training",
          "text": "Training & Education",
          "value": "training_programs"
        }
      ]
    }
  }
}
```

### Satisfaction Survey

```json
{
  "content": "How would you rate your experience?",
  "content_type": "quick_reply",
  "content_attributes": {
    "responses": {
      "title": "Customer Satisfaction",
      "description": "Your feedback helps us improve our service",
      "responses": [
        {
          "id": "excellent",
          "text": "😍 Excellent",
          "value": "5"
        },
        {
          "id": "good",
          "text": "😊 Good",
          "value": "4"
        },
        {
          "id": "okay",
          "text": "😐 Okay",
          "value": "3"
        },
        {
          "id": "poor",
          "text": "😞 Poor",
          "value": "2"
        },
        {
          "id": "terrible",
          "text": "😠 Terrible",
          "value": "1"
        }
      ]
    }
  }
}
```

### Yes/No Question

```json
{
  "content": "Would you like to receive our newsletter?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "responses": [
        {
          "id": "yes",
          "text": "Yes, sign me up!",
          "value": "newsletter_subscribe"
        },
        {
          "id": "no",
          "text": "No, thanks",
          "value": "newsletter_decline"
        }
      ]
    }
  }
}
```

### Appointment Booking

```json
{
  "content": "When would you like to schedule your appointment?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Available Time Slots",
      "description": "All times are in your local timezone",
      "responses": [
        {
          "id": "morning",
          "text": "Tomorrow 9:00 AM",
          "value": "2024-01-15T09:00:00"
        },
        {
          "id": "afternoon",
          "text": "Tomorrow 2:00 PM",
          "value": "2024-01-15T14:00:00"
        },
        {
          "id": "evening",
          "text": "Tomorrow 5:00 PM",
          "value": "2024-01-15T17:00:00"
        },
        {
          "id": "different",
          "text": "Choose a different time",
          "value": "custom_time"
        }
      ]
    }
  }
}
```

### Language Selection

```json
{
  "content": "Please select your preferred language",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Language / Idioma / Langue",
      "responses": [
        {
          "id": "english",
          "text": "🇺🇸 English",
          "value": "en"
        },
        {
          "id": "spanish",
          "text": "🇪🇸 Español",
          "value": "es"
        },
        {
          "id": "french",
          "text": "🇫🇷 Français",
          "value": "fr"
        },
        {
          "id": "german",
          "text": "🇩🇪 Deutsch",
          "value": "de"
        }
      ]
    }
  }
}
```

### Help Topics

```json
{
  "content": "What do you need help with?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Help Topics",
      "description": "Browse our most common help topics",
      "responses": [
        {
          "id": "getting_started",
          "text": "🚀 Getting Started",
          "value": "help_getting_started"
        },
        {
          "id": "account_setup",
          "text": "⚙️ Account Setup",
          "value": "help_account_setup"
        },
        {
          "id": "troubleshooting",
          "text": "🔧 Troubleshooting",
          "value": "help_troubleshooting"
        },
        {
          "id": "integrations",
          "text": "🔗 Integrations",
          "value": "help_integrations"
        },
        {
          "id": "billing",
          "text": "💳 Billing & Payments",
          "value": "help_billing"
        }
      ]
    }
  }
}
```

## Event Handling

When a user selects a canned response, a custom event is dispatched:

```javascript
document.addEventListener('cannedResponseSelected', (event) => {
  console.log('Response selected:', event.detail);
  // event.detail contains:
  // {
  //   id: "support",
  //   text: "I need technical support", 
  //   value: "technical_support"
  // }
});
```

### Event Detail Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | The unique ID of the selected response |
| `text` | string | The display text that was shown to the user |
| `value` | string | The value to be processed (falls back to text if no value provided) |

## Integration Examples

### React Integration

```javascript
import { useEffect } from 'react';

function ChatBot() {
  useEffect(() => {
    const handleResponseSelection = (event) => {
      const { id, text, value } = event.detail;
      
      // Handle the selected response
      switch (value) {
        case 'technical_support':
          // Route to technical support flow
          break;
        case 'sales_inquiry':
          // Route to sales flow
          break;
        default:
          // Handle unknown response
      }
    };

    document.addEventListener('cannedResponseSelected', handleResponseSelection);
    
    return () => {
      document.removeEventListener('cannedResponseSelected', handleResponseSelection);
    };
  }, []);

  return <ChatWidget />;
}
```

### Next.js API Route

```javascript
// pages/api/chat-response.js
export default function handler(req, res) {
  const { id, text, value } = req.body;
  
  // Process the canned response selection
  switch (value) {
    case 'technical_support':
      return res.json({
        message: "I'll connect you with our technical support team...",
        nextAction: "transfer_to_support"
      });
      
    case 'sales_inquiry':
      return res.json({
        message: "Let me connect you with a sales representative...",
        nextAction: "transfer_to_sales"
      });
      
    default:
      return res.json({
        message: "Thanks for your selection. How else can I help?",
        nextAction: "continue_conversation"
      });
  }
}
```

## Styling

Canned response messages come with built-in styling. Key CSS classes:

- `.interactive-canned-responses` - Main container
- `.interactive-responses-header` - Header section
- `.responses-list` - Container for response buttons
- `.response-button` - Individual response button
- `.response-text` - Response text styling
- `.response-icon` - Arrow icon in buttons

## Best Practices

1. **Keep options concise** - Use clear, short text (max 30-40 characters)
2. **Limit choices** - 3-7 options work best to avoid overwhelming users
3. **Use meaningful IDs** - Make IDs descriptive for easier tracking
4. **Provide escape option** - Always include "Other" or "Something else" option
5. **Progressive disclosure** - Use branching logic to show relevant options
6. **Clear instructions** - Use description text to guide users
7. **Consistent language** - Maintain consistent tone and terminology
8. **Emojis sparingly** - Use emojis to enhance, not replace clear text

## Accessibility

- Keyboard navigation support
- Screen reader friendly with proper ARIA labels
- High contrast button styling
- Focus indicators for better visibility
- Semantic button elements

## Mobile Considerations

- Touch-friendly button sizes (minimum 44px height)
- Proper spacing between options
- Responsive text sizing
- Stack buttons vertically on small screens
- Thumb-friendly interaction areas

## Limitations

- Maximum 10 response options per message (recommended)
- Response text should be kept under 50 characters for best display
- No support for nested/hierarchical responses in single message
- Custom styling requires theme customization
- Events bubble up to document level only
