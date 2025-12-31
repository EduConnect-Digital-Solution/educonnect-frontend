// src/pages/auth/AdminInfo.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {ArrowLeft, User, Mail, Lock, Eye, EyeOff, Globe, Phone} from 'lucide-react';
import {RegSchool} from "./auth.js";
import {Toast} from "../../components/Toast.jsx";

// TODO: put an I hover button to describe who an admin is in the context of the app

export function AdminInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };


    // Combine school data from previous step with admin data
    const [formData, setFormData] = useState({
        ...location.state?.schoolData,
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
        password: '',
    });


    const handleCreateAccount = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validation Checks
        if (!formData?.adminFirstName) {
            showToast("Please input first name");
            return;
        }

        if (!formData?.adminLastName) {
            showToast("Please input last name");
            return;
        }

        if (!formData?.adminEmail || !emailPattern.test(formData.adminEmail)) {
            showToast("Please provide a valid email address.");
            return;
        }


        if (!formData?.password || !passwordPattern.test(formData.password)) {
            showToast("Please provide a valid password.");
            return;
        }


        const combinedPayload = {
            ...location.state?.schoolData,
            adminFirstName: formData.adminFirstName.trim(),
            adminLastName: formData.adminLastName.trim(),
            email: formData.adminEmail.trim().toLowerCase(),
            password: formData.password,

        };

        console.log('combinedPayload', combinedPayload);

        try {
            await RegSchool(combinedPayload);
            showToast('School registered successfully', 'success');
            navigate('/verify');
        } catch (err) {
            const message = err?.message || err?.error || 'Registration failed';
            showToast(message, 'error');
        }
    };

    return (
        <>
            {/* Back button */}
            <div className="mb-6">
                <NavLink to={`/register/school`}>
                    <button
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                </NavLink>

            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Information
                </h2>
                <p className="text-gray-600">
                    You're one step away from digitizing your school operations.
                </p>
            </div>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            {/* Form */}
            <div className="space-y-5">
                {/* Full Name */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="adminFirstName"
                            value={formData?.adminFirstName || ""}
                            onChange={(e) => setFormData({...formData, adminFirstName: e.target.value})}
                            placeholder="First Name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="tel"
                            name="adminLastName"
                            value={formData?.adminLastName || ""}
                            onChange={(e) => setFormData({...formData, adminLastName: e.target.value})}
                            placeholder="Last Name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                            placeholder="admin@example.com"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Create a strong password"
                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className={`flex gap-5 flex-row`}>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 bg-none text-black border border-gray-300 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleCreateAccount}
                        className="w-full py-4 bg-[#0A61A4] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                    >
                        Create Account
                    </button>
                </div>

            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-3">
                By creating an account, you agree to EduConnect’s
                {" "}
                <NavLink
                    to={`/terms`}
                    className="text-[#0A61A4] font-semibold hover:underline"
                >
                    Terms of Service
                </NavLink>
                {" "}and{" "}
                <NavLink
                    to={`/privacy`}
                    className="text-[#0A61A4] font-semibold hover:underline"
                >
                    Privacy Policy
                </NavLink>
            </p>
        </>
    );
}
