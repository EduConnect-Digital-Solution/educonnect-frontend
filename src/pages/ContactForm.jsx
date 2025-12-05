import React, { useState } from 'react';
import {Images} from '../components/images.jsx';

export default function ContactPage() {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            description: '',
            organizationName: '' // <-- NEW FIELD ADDED
        });
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [errors, setErrors] = useState({});

        const validateForm = () => {
            const newErrors = {};

            if (!formData.name.trim()) {
                newErrors.name = 'Name is required';
            }

            if (!formData.description.trim()) {
                newErrors.description = 'Description is required';
            }

            if (!formData.organizationName.trim()) {
                newErrors.organizationName = 'Organization Name is required';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }

            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone Number is required';
            } else if (!/^\d{7,15}$/.test(formData.phone)) {
                newErrors.phone = 'Please enter a valid phone number';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            setIsSubmitting(true);
            setErrors({});

            const formDataForApi = new FormData();

            formDataForApi.append("access_key", "41706b4e-db86-48a7-9570-4ecd950c62da");


            formDataForApi.append("name", formData.name);
            formDataForApi.append("email", formData.email);
            formDataForApi.append("phone", formData.phone);
            formDataForApi.append("description", formData.description);
            formDataForApi.append("Organization Name", formData.organizationName);
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formDataForApi
                });

                const data = await response.json();

                if (data.success) {
                    console.log("Form Submitted Successfully:", data);
                    setIsSubmitted(true);


                    setTimeout(() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', description: '', organizationName: '' });
                    }, 3000);

                } else {
                    console.error("API Error:", data);

                    setErrors({ general: data.message || "An error occurred during submission." });
                }

            } catch (error) {
                console.error("Fetch Error:", error);
                setErrors({ general: "A network error occurred. Please try again." });
            } finally {
                setIsSubmitting(false);
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        };

    return (
        <>
            {/* Form */}
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name and Email Input */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`flex flex-col`}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-200'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className={`flex flex-col`}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-200'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className={`flex flex-col`}>
                            <input
                                type="text"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleChange}
                                placeholder="Organization Name"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.organizationName ? 'border-red-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900`}
                            />
                            {errors.organizationName && (
                                <p className="mt-1 text-sm text-red-500">{errors.organizationName}</p>
                            )}
                        </div>
                            <div className={`flex flex-col`}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${
                                errors.phone ? 'border-red-500' : 'border-gray-200'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                            </div>
                    </div>

                    <textarea
                        name="description"
                        placeholder="Describe your need"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 border ${
                            errors.description ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}>
                    </textarea>
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.organizationName}</p>
                    )}

                    {/* Terms and Submit */}
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            By submitting this form I agree to the{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                            {' '}and{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gray-900 hover:bg-gray-800 active:scale-95'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                            ) : (
                                'Send Enquiry'
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your inquiry has been successfully submitted!</h3>
                    <p className="text-gray-600">We'll we'll reach back out to you as soon as possible.</p>
                </div>
            )}
        </>
    );
}