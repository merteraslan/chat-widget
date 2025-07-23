import React, { useState } from "react";
import type { InteractiveContent, FormField } from "./types";

interface FormMessageProps {
    content: InteractiveContent;
}

export const FormMessage: React.FC<FormMessageProps> = ({ content }) => {
    const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formData = content.content_attributes?.form;

    if (!formData || !formData.fields) {
        return null;
    }

    const handleInputChange = (fieldId: string, value: string | boolean) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }));
        // Clear error when user starts typing
        if (errors[fieldId]) {
            setErrors(prev => ({ ...prev, [fieldId]: '' }));
        }
    };

    const validateField = (field: FormField, value: string | boolean): string => {
        if (field.required && (!value || value === '')) {
            return `${field.label} is required`;
        }

        if (field.validation?.pattern && typeof value === 'string') {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(value)) {
                return field.validation.message || `${field.label} format is invalid`;
            }
        }

        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors: Record<string, string> = {};
        formData.fields.forEach(field => {
            const error = validateField(field, formValues[field.id] || '');
            if (error) {
                newErrors[field.id] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            if (formData.submitUrl) {
                // Submit to external URL
                const response = await fetch(formData.submitUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ submit: 'Failed to submit form. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        void handleSubmit(e);
    };

    const renderField = (field: FormField) => {
        const value = formValues[field.id] || '';
        const error = errors[field.id];

        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
                return (
                    <div key={field.id} className="form-field">
                        <label htmlFor={field.id} className="form-label">
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        <input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={value as string}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`form-input ${error ? 'error' : ''}`}
                            required={field.required}
                        />
                        {error && <span className="form-error">{error}</span>}
                    </div>
                );

            case 'textarea':
                return (
                    <div key={field.id} className="form-field">
                        <label htmlFor={field.id} className="form-label">
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        <textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={value as string}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`form-textarea ${error ? 'error' : ''}`}
                            required={field.required}
                            rows={3}
                        />
                        {error && <span className="form-error">{error}</span>}
                    </div>
                );

            case 'select':
                return (
                    <div key={field.id} className="form-field">
                        <label htmlFor={field.id} className="form-label">
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        <select
                            id={field.id}
                            value={value as string}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`form-select ${error ? 'error' : ''}`}
                            required={field.required}
                        >
                            <option value="">Select an option</option>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {error && <span className="form-error">{error}</span>}
                    </div>
                );

            case 'checkbox':
                return (
                    <div key={field.id} className="form-field form-field-checkbox">
                        <label htmlFor={field.id} className="form-label-checkbox">
                            <input
                                id={field.id}
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                className="form-checkbox"
                                required={field.required}
                            />
                            <span className="checkmark"></span>
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        {error && <span className="form-error">{error}</span>}
                    </div>
                );

            case 'radio':
                return (
                    <div key={field.id} className="form-field">
                        <fieldset className="form-fieldset">
                            <legend className="form-label">
                                {field.label}
                                {field.required && <span className="required">*</span>}
                            </legend>
                            {field.options?.map((option) => (
                                <label key={option.value} className="form-label-radio">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option.value}
                                        checked={value === option.value}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className="form-radio"
                                        required={field.required}
                                    />
                                    <span className="radio-mark"></span>
                                    {option.label}
                                </label>
                            ))}
                        </fieldset>
                        {error && <span className="form-error">{error}</span>}
                    </div>
                );

            default:
                return null;
        }
    };

    if (isSubmitted) {
        return (
            <div className="interactive-form submitted">
                <div className="form-success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                    <span>Form submitted successfully!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="interactive-form">
            <div className="form-header">
                <h4 className="form-title">{formData.title || content.content}</h4>
                {formData.description && (
                    <p className="form-description">{formData.description}</p>
                )}
            </div>

            <form onSubmit={handleFormSubmit} className="form-content">
                {formData.fields.map(renderField)}

                {errors.submit && (
                    <div className="form-error form-submit-error">{errors.submit}</div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form-submit-button"
                >
                    {isSubmitting ? 'Submitting...' : (formData.submitLabel || 'Submit')}
                </button>
            </form>
        </div>
    );
}; 