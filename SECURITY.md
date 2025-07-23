# Security Policy

## Supported Versions

We actively support and apply security updates to the following versions of the Chat Widget:

| Version | Supported          |
| ------- | ------------------ |
| 0.6.x   | :white_check_mark: |
| 0.5.x   | :white_check_mark: |
| < 0.5.0 | :x:                |

## Reporting a Vulnerability

We take the security of the Chat Widget seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **[mertegithub@gmail.com](mailto:mertegithub@gmail.com)**

Include the following information:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### What to Expect

After you submit a vulnerability report, we will:

1. **Acknowledge your report** within 48 hours
2. **Confirm the problem** and determine the affected versions
3. **Audit code** to find any potential similar problems
4. **Prepare fixes** for all supported versions
5. **Release patched versions** as soon as possible
6. **Publicly disclose** the vulnerability in a coordinated manner

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days with either a fix timeline or explanation of why the issue is not a security vulnerability
- **Resolution**: We aim to patch critical vulnerabilities within 14 days

## Security Best Practices

When using the Chat Widget, we recommend following these security best practices:

### Content Security Policy (CSP)

If you're using Content Security Policy, you may need to allow:

- `connect-src` for your webhook URL
- `style-src 'unsafe-inline'` for dynamic styling (or use nonce-based CSP)

### Webhook Security

- Always use HTTPS for your webhook endpoints
- Implement proper input validation and sanitization on your webhook
- Consider implementing CSRF tokens using the `csrfToken` prop
- Rate limit your webhook endpoints to prevent abuse

### Data Handling

- Be cautious about what data you include in webhook responses
- Avoid including sensitive information in chat messages
- Implement proper authentication and authorization on your backend

## Security Features

The Chat Widget includes several built-in security features:

- **XSS Protection**: User input is automatically escaped by React's built-in JSX rendering, preventing cross-site scripting attacks
- **CSRF Token Support**: Optional CSRF token integration for additional security
- **Secure Communication**: Supports HTTPS-only webhook communication
- **Content Escaping**: Interactive message content is safely rendered through React's automatic escaping mechanisms

**Note**: The widget relies on React's default XSS protection through automatic text escaping. No additional content sanitization libraries are included. If you need to render HTML content from untrusted sources, implement proper sanitization in your webhook responses before sending data to the widget.

## Scope

This security policy applies to the Chat Widget package itself. Security issues in:

- Your webhook implementation
- Your server-side code
- Third-party dependencies outside our control

Should be reported to their respective maintainers.

## Recognition

We appreciate security researchers and users who help improve the security of our project. With your permission, we're happy to acknowledge your contribution in:

- Our changelog
- Security advisories
- Project README

## Questions?

If you have any questions about this security policy, please contact us at [mertegithub@gmail.com](mailto:mertegithub@gmail.com).
