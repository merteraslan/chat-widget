# Message Schema Documentation

This document provides complete JSON schemas and examples for all supported interactive message types in the Chat Widget.

## Table of Contents

- [Text Messages](#text-messages)
- [Article Messages](#article-messages)
- [Form Messages](#form-messages)
- [Card Messages](#card-messages)
- [Quick Reply Messages](#quick-reply-messages)

## Text Messages

Simple text responses from your AI backend.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `output` | string | ✅ | The text message to display |

### Example

```json
{
  "output": "Hello! How can I help you today?"
}
```

## Article Messages

Display a list of clickable articles, documentation links, or resources.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | ✅ | Header text for the article collection |
| `content_type` | string | ✅ | Must be `"article"` |
| `content_attributes` | object | ✅ | Article configuration object |
| `content_attributes.items` | array | ✅ | Array of article objects |

#### Article Item Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Article title |
| `description` | string | ✅ | Brief description of the article |
| `link` | string | ✅ | URL to the full article |

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["content", "content_type", "content_attributes"],
  "properties": {
    "content": {
      "type": "string",
      "description": "Header text for articles"
    },
    "content_type": {
      "type": "string",
      "const": "article"
    },
    "content_attributes": {
      "type": "object",
      "required": ["items"],
      "properties": {
        "items": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "required": ["title", "description", "link"],
            "properties": {
              "title": {
                "type": "string",
                "minLength": 1
              },
              "description": {
                "type": "string",
                "minLength": 1
              },
              "link": {
                "type": "string",
                "format": "uri"
              }
            }
          }
        }
      }
    }
  }
}
```

### Example

```json
{
  "content": "Here are some helpful resources:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "API Quick Start Guide",
        "description": "A comprehensive guide to get you started with our API",
        "link": "https://docs.example.com/api-guide"
      },
      {
        "title": "Troubleshooting Common Issues",
        "description": "Solutions to frequently encountered problems",
        "link": "https://docs.example.com/troubleshooting"
      }
    ]
  }
}
```

## Form Messages

Interactive forms for data collection with various field types and validation.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | ✅ | Introduction text for the form |
| `content_type` | string | ✅ | Must be `"form"` |
| `content_attributes` | object | ✅ | Form configuration object |
| `content_attributes.form` | object | ✅ | Form definition |

#### Form Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ❌ | Form title |
| `description` | string | ❌ | Form description |
| `submitLabel` | string | ❌ | Submit button text (default: "Submit") |
| `submitUrl` | string | ❌ | Form submission endpoint |
| `fields` | array | ✅ | Array of form field objects |

#### Field Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique field identifier |
| `type` | string | ✅ | Field type (see supported types below) |
| `label` | string | ✅ | Field label |
| `placeholder` | string | ❌ | Placeholder text |
| `required` | boolean | ❌ | Whether field is required |
| `options` | array | ❌ | Options for select/radio fields |
| `validation` | object | ❌ | Validation rules |

#### Supported Field Types

| Type | Description | Additional Properties |
|------|-------------|----------------------|
| `text` | Single-line text input | - |
| `email` | Email input with validation | - |
| `tel` | Telephone number input | - |
| `textarea` | Multi-line text input | - |
| `select` | Dropdown selection | `options` required |
| `checkbox` | Boolean checkbox | - |
| `radio` | Radio button group | `options` required |

#### Option Schema (for select/radio)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | string | ✅ | Option value |
| `label` | string | ✅ | Display text |

#### Validation Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pattern` | string | ❌ | RegEx pattern |
| `message` | string | ❌ | Error message |

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["content", "content_type", "content_attributes"],
  "properties": {
    "content": {
      "type": "string",
      "description": "Form introduction text"
    },
    "content_type": {
      "type": "string",
      "const": "form"
    },
    "content_attributes": {
      "type": "object",
      "required": ["form"],
      "properties": {
        "form": {
          "type": "object",
          "required": ["fields"],
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "submitLabel": {
              "type": "string"
            },
            "submitUrl": {
              "type": "string",
              "format": "uri"
            },
            "fields": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "object",
                "required": ["id", "type", "label"],
                "properties": {
                  "id": {
                    "type": "string",
                    "minLength": 1
                  },
                  "type": {
                    "type": "string",
                    "enum": ["text", "email", "tel", "textarea", "select", "checkbox", "radio"]
                  },
                  "label": {
                    "type": "string",
                    "minLength": 1
                  },
                  "placeholder": {
                    "type": "string"
                  },
                  "required": {
                    "type": "boolean"
                  },
                  "options": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": ["value", "label"],
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "label": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "validation": {
                    "type": "object",
                    "properties": {
                      "pattern": {
                        "type": "string"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Example

```json
{
  "content": "Please fill out this contact form:",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Us",
      "description": "We'd love to hear from you!",
      "submitLabel": "Send Message",
      "submitUrl": "/api/contact-form",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "placeholder": "Enter your name",
          "required": true
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "placeholder": "your@email.com",
          "required": true,
          "validation": {
            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "message": "Please enter a valid email address"
          }
        },
        {
          "id": "subject",
          "type": "select",
          "label": "Subject",
          "required": true,
          "options": [
            { "value": "general", "label": "General Inquiry" },
            { "value": "support", "label": "Technical Support" },
            { "value": "feedback", "label": "Feedback" }
          ]
        },
        {
          "id": "message",
          "type": "textarea",
          "label": "Message",
          "placeholder": "How can we help?",
          "required": true
        },
        {
          "id": "newsletter",
          "type": "checkbox",
          "label": "Subscribe to our newsletter"
        }
      ]
    }
  }
}
```

## Card Messages

Rich visual content with images, badges, prices, and call-to-action buttons.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | ✅ | Introduction text for cards |
| `content_type` | string | ✅ | Must be `"card"` |
| `content_attributes` | object | ✅ | Card configuration object |
| `content_attributes.cards` | object | ✅ | Cards collection definition |

#### Cards Collection Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ❌ | Collection title |
| `description` | string | ❌ | Collection description |
| `cards` | array | ✅ | Array of card objects |

#### Card Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Card title |
| `description` | string | ✅ | Card description |
| `image` | string | ✅ | Image URL |
| `imageAlt` | string | ❌ | Image alt text |
| `link` | string | ❌ | Action URL |
| `linkText` | string | ❌ | Link button text |
| `badge` | string | ❌ | Badge text (e.g., "NEW", "SALE") |
| `price` | string | ❌ | Price display (e.g., "$299") |

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["content", "content_type", "content_attributes"],
  "properties": {
    "content": {
      "type": "string",
      "description": "Cards introduction text"
    },
    "content_type": {
      "type": "string",
      "const": "card"
    },
    "content_attributes": {
      "type": "object",
      "required": ["cards"],
      "properties": {
        "cards": {
          "type": "object",
          "required": ["cards"],
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "cards": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "object",
                "required": ["title", "description", "image"],
                "properties": {
                  "title": {
                    "type": "string",
                    "minLength": 1
                  },
                  "description": {
                    "type": "string",
                    "minLength": 1
                  },
                  "image": {
                    "type": "string",
                    "format": "uri"
                  },
                  "imageAlt": {
                    "type": "string"
                  },
                  "link": {
                    "type": "string",
                    "format": "uri"
                  },
                  "linkText": {
                    "type": "string"
                  },
                  "badge": {
                    "type": "string"
                  },
                  "price": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Example

```json
{
  "content": "Check out these featured products:",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Featured Products",
      "description": "Our most popular items this month",
      "cards": [
        {
          "title": "Wireless Headphones",
          "description": "Premium noise-canceling headphones with 30-hour battery life",
          "image": "https://example.com/headphones.jpg",
          "imageAlt": "Black wireless headphones",
          "link": "https://shop.example.com/headphones",
          "linkText": "View Product",
          "badge": "BESTSELLER",
          "price": "$299"
        },
        {
          "title": "Smart Watch",
          "description": "Track your fitness and stay connected",
          "image": "https://example.com/watch.jpg",
          "imageAlt": "Silver smartwatch",
          "link": "https://shop.example.com/watch",
          "linkText": "Learn More",
          "badge": "NEW",
          "price": "$399"
        }
      ]
    }
  }
}
```

## Quick Reply Messages

Quick reply buttons that users can click to send pre-written responses.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | ✅ | Question or prompt text |
| `content_type` | string | ✅ | Must be `"canned_response"` or `"quick_reply"` |
| `content_attributes` | object | ✅ | Response configuration object |
| `content_attributes.responses` | object | ✅ | Responses collection definition |

#### Responses Collection Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ❌ | Response section title |
| `description` | string | ❌ | Instructions text |
| `responses` | array | ✅ | Array of response objects |

#### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique response identifier |
| `text` | string | ✅ | Button display text |
| `value` | string | ❌ | Value sent to webhook (defaults to text) |

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["content", "content_type", "content_attributes"],
  "properties": {
    "content": {
      "type": "string",
      "description": "Question or prompt text"
    },
    "content_type": {
      "type": "string",
      "enum": ["canned_response", "quick_reply"]
    },
    "content_attributes": {
      "type": "object",
      "required": ["responses"],
      "properties": {
        "responses": {
          "type": "object",
          "required": ["responses"],
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "responses": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "object",
                "required": ["id", "text"],
                "properties": {
                  "id": {
                    "type": "string",
                    "minLength": 1
                  },
                  "text": {
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Example

```json
{
  "content": "How can I help you today?",
  "content_type": "canned_response",
  "content_attributes": {
    "responses": {
      "title": "Choose a topic:",
      "description": "Select the option that best describes your inquiry",
      "responses": [
        {
          "id": "billing",
          "text": "Billing & Payments",
          "value": "I have a question about billing"
        },
        {
          "id": "technical",
          "text": "Technical Support",
          "value": "I need technical support"
        },
        {
          "id": "general",
          "text": "General Information",
          "value": "I need general information"
        }
      ]
    }
  }
}
```

## Form Submission Handling

When a form is submitted (if `submitUrl` is provided), the widget sends a POST request with the following format:

### Request Format

```json
{
  "field_id": "field_value",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "general",
  "message": "Hello, I have a question...",
  "newsletter": true
}
```

### Request Headers

```
Content-Type: application/json
X-CSRFToken: [csrf_token if provided]
```

## Error Handling

If a message doesn't match any known schema, the widget will:

1. Display a fallback message: "This message type is not supported"
2. Log the unrecognized content to the console (in development)
3. Continue normal operation

## Best Practices

1. **Always validate** your JSON against these schemas before sending
2. **Provide fallback text** in the `content` field for unsupported clients
3. **Use descriptive IDs** for form fields and response buttons
4. **Include alt text** for images in card messages
5. **Test form submissions** with your backend endpoints
6. **Keep response arrays** to 5 items or fewer for better UX

## Validation Tools

You can validate your message schemas using online JSON Schema validators:

- [JSONSchemaLint](https://jsonschemalint.com/)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)

Copy the JSON Schema from this document and paste your message JSON to validate.
