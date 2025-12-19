// src/pages/auth/SchoolInfo.jsx
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ArrowLeft, Building2, Mail, Phone, MapPin } from 'lucide-react';

export function SchoolInfo() {
    const [formData, setFormData] = useState({
        schoolName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        state: ''
    });
    const navigate = useNavigate();

    const handleProceed = () => {
        // Here you would typically handle form validation
        // and then pass the data to the next step.
        // For now, we'll just navigate.
        navigate('/register/admin', { state: { schoolData: formData } });
    };

    return (
        <>
            {/* Back button */}
            <div className="mb-6">
                <NavLink
                    to={`/`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                </NavLink>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Register your school
                </h2>
                <p className="text-gray-600">
                    Digitize your school operations with ease
                </p>
            </div>

            {/* FORM */}
            <div className="space-y-5 ">
                {/* School Name */}
                <div>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="schoolName"
                            value={formData?.schoolName || ""}
                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                            placeholder="Enter school name"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData?.email || ""}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="school@example.com"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData?.phone || ""}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+234 813 456 7890"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                            name="address"
                            value={formData?.address || ""}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Street address"
                            rows="3"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Website + State */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="state"
                            value={formData?.state || ""}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="School state"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="website"
                            value={formData?.website || ""}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="School website"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Submit button */}
                <button
                    onClick={handleProceed}
                    className="w-full py-4 bg-[#0A61A4] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                    Proceed
                </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
                Already registered?{" "}
                <NavLink
                    to={`/login/welcome`}
                    className="text-[#0A61A4] font-semibold hover:underline"
                >
                    Sign in
                </NavLink>
            </p>
        </>
    );
}
