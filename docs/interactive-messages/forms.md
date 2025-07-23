# Form Messages

Form messages allow you to collect structured data from users through interactive forms. They support various field types including text inputs, dropdowns, checkboxes, radio buttons, and more, with built-in validation and submission handling.

## Use Cases

- **Lead Generation**: Collect contact information and user details
- **Support Tickets**: Gather detailed information about issues
- **Feedback Collection**: Create surveys and feedback forms
- **User Registration**: Handle sign-up processes
- **Data Collection**: Collect any structured information from users
- **Booking Forms**: Handle appointments and reservations

## Message Format

### Basic Structure

```json
{
  "content": "Please fill out this form",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Information",
      "description": "We'll get back to you within 24 hours",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "placeholder": "Enter your full name",
          "required": true
        }
      ],
      "submitLabel": "Submit Form",
      "submitUrl": "https://your-api.com/submit"
    }
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Header text displayed above the form |
| `content_type` | string | Must be `"form"` |
| `content_attributes.form` | object | Form configuration object |
| `form.fields` | array | Array of form field objects |

### Form Configuration

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Optional form title (overrides content if provided) |
| `description` | string | Optional form description |
| `fields` | array | Array of form field definitions |
| `submitLabel` | string | Submit button text (default: "Submit") |
| `submitUrl` | string | URL to submit form data to (optional) |

## Field Types

### Text Input Fields

```json
{
  "id": "name",
  "type": "text",
  "label": "Full Name",
  "placeholder": "Enter your full name",
  "required": true,
  "validation": {
    "pattern": "^[a-zA-Z\\s]+$",
    "message": "Name can only contain letters and spaces"
  }
}
```

**Supported text types**: `text`, `email`, `tel`

### Textarea Fields

```json
{
  "id": "message",
  "type": "textarea",
  "label": "Message",
  "placeholder": "Tell us more about your inquiry...",
  "required": true
}
```

### Select Dropdowns

```json
{
  "id": "department",
  "type": "select",
  "label": "Department",
  "required": true,
  "options": [
    { "value": "sales", "label": "Sales" },
    { "value": "support", "label": "Technical Support" },
    { "value": "billing", "label": "Billing" }
  ]
}
```

### Checkboxes

```json
{
  "id": "newsletter",
  "type": "checkbox",
  "label": "Subscribe to our newsletter",
  "required": false
}
```

### Radio Buttons

```json
{
  "id": "priority",
  "type": "radio",
  "label": "Priority Level",
  "required": true,
  "options": [
    { "value": "low", "label": "Low" },
    { "value": "medium", "label": "Medium" },
    { "value": "high", "label": "High" }
  ]
}
```

## Field Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `id` | string | Unique field identifier | ✅ |
| `type` | string | Field type (text, email, tel, textarea, select, checkbox, radio) | ✅ |
| `label` | string | Field label displayed to user | ✅ |
| `placeholder` | string | Placeholder text for input fields | ❌ |
| `required` | boolean | Whether field is required | ❌ |
| `options` | array | Options for select/radio fields | ❌ |
| `validation` | object | Custom validation rules | ❌ |

### Validation Rules

```json
{
  "validation": {
    "pattern": "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
    "message": "Please enter a valid email address"
  }
}
```

## Examples

### Contact Form

```json
{
  "content": "Get in touch with us",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Contact Us",
      "description": "Fill out the form below and we'll get back to you soon!",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "placeholder": "John Doe",
          "required": true
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "placeholder": "john@example.com",
          "required": true
        },
        {
          "id": "phone",
          "type": "tel",
          "label": "Phone Number",
          "placeholder": "+1 (555) 123-4567",
          "required": false
        },
        {
          "id": "department",
          "type": "select",
          "label": "Department",
          "required": true,
          "options": [
            { "value": "sales", "label": "Sales Inquiry" },
            { "value": "support", "label": "Technical Support" },
            { "value": "billing", "label": "Billing Question" },
            { "value": "other", "label": "Other" }
          ]
        },
        {
          "id": "message",
          "type": "textarea",
          "label": "Message",
          "placeholder": "How can we help you?",
          "required": true
        },
        {
          "id": "newsletter",
          "type": "checkbox",
          "label": "Subscribe to our newsletter for updates",
          "required": false
        }
      ],
      "submitLabel": "Send Message",
      "submitUrl": "https://api.example.com/contact"
    }
  }
}
```

### Survey Form

```json
{
  "content": "Help us improve our service",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Customer Satisfaction Survey",
      "description": "Your feedback helps us serve you better",
      "fields": [
        {
          "id": "satisfaction",
          "type": "radio",
          "label": "How satisfied are you with our service?",
          "required": true,
          "options": [
            { "value": "very_satisfied", "label": "Very Satisfied" },
            { "value": "satisfied", "label": "Satisfied" },
            { "value": "neutral", "label": "Neutral" },
            { "value": "dissatisfied", "label": "Dissatisfied" },
            { "value": "very_dissatisfied", "label": "Very Dissatisfied" }
          ]
        },
        {
          "id": "features",
          "type": "select",
          "label": "Which feature do you use most?",
          "required": true,
          "options": [
            { "value": "chat", "label": "Live Chat" },
            { "value": "docs", "label": "Documentation" },
            { "value": "api", "label": "API" },
            { "value": "dashboard", "label": "Dashboard" }
          ]
        },
        {
          "id": "improvements",
          "type": "textarea",
          "label": "What improvements would you like to see?",
          "placeholder": "Share your suggestions...",
          "required": false
        }
      ],
      "submitLabel": "Submit Survey"
    }
  }
}
```

### Support Ticket Form

```json
{
  "content": "Need help? Create a support ticket",
  "content_type": "form",
  "content_attributes": {
    "form": {
      "title": "Create Support Ticket",
      "fields": [
        {
          "id": "email",
          "type": "email",
          "label": "Your Email",
          "required": true,
          "validation": {
            "pattern": "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
            "message": "Please enter a valid email address"
          }
        },
        {
          "id": "category",
          "type": "select",
          "label": "Issue Category",
          "required": true,
          "options": [
            { "value": "bug", "label": "Bug Report" },
            { "value": "feature", "label": "Feature Request" },
            { "value": "account", "label": "Account Issue" },
            { "value": "payment", "label": "Payment Problem" },
            { "value": "other", "label": "Other" }
          ]
        },
        {
          "id": "priority",
          "type": "radio",
          "label": "Priority",
          "required": true,
          "options": [
            { "value": "low", "label": "Low - General question" },
            { "value": "medium", "label": "Medium - Issue affecting work" },
            { "value": "high", "label": "High - Service disruption" },
            { "value": "urgent", "label": "Urgent - Critical system down" }
          ]
        },
        {
          "id": "subject",
          "type": "text",
          "label": "Subject",
          "placeholder": "Brief description of the issue",
          "required": true
        },
        {
          "id": "description",
          "type": "textarea",
          "label": "Detailed Description",
          "placeholder": "Please provide as much detail as possible...",
          "required": true
        }
      ],
      "submitLabel": "Create Ticket",
      "submitUrl": "https://api.example.com/support/tickets"
    }
  }
}
```

## Form Submission

When a form is submitted:

1. **Client-side validation** runs first to check required fields and validation patterns
2. If validation passes and a `submitUrl` is provided, the form data is sent via POST request
3. The form shows a success message upon successful submission
4. If submission fails, an error message is displayed

### Submission Data Format

The form data is sent as JSON in the following format:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "support",
  "message": "I need help with...",
  "newsletter": true
}
```

## Custom Event Handling

Forms dispatch a custom event when submitted successfully:

```javascript
document.addEventListener('formSubmitted', (event) => {
  console.log('Form submitted:', event.detail);
  // event.detail contains the form data
});
```

## Styling

Form messages come with built-in styling that matches your chat widget theme. Key CSS classes:

- `.interactive-form` - Main form container
- `.form-field` - Individual field wrapper
- `.form-input`, `.form-textarea`, `.form-select` - Input elements
- `.form-error` - Error message styling
- `.form-submit-button` - Submit button
- `.form-success` - Success message container

## Best Practices

1. **Keep forms concise** - Only ask for essential information
2. **Use appropriate field types** - Email fields for emails, tel for phone numbers
3. **Provide clear labels** - Make field purposes obvious
4. **Use validation wisely** - Provide helpful error messages
5. **Group related fields** - Use logical field ordering
6. **Test on mobile** - Ensure forms work well on small screens
7. **Handle errors gracefully** - Provide clear feedback when things go wrong

## Limitations

- Maximum 20 fields per form (recommended)
- File uploads are not currently supported
- Custom CSS styling requires theme customization
- Form submission requires external endpoint for data processing
