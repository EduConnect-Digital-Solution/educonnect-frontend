// src/pages/auth/AdminInfo.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function AdminInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Combine school data from previous step with admin data
    const [formData, setFormData] = useState({
        ...location.state?.schoolData,
        fullName: '',
        adminEmail: '',
        password: '',
        confirmPassword: ''
    });

    const handleCreateAccount = () => {
        // Here you would handle form validation and the final account creation logic.
        // You have access to all the data in the `formData` state.
        console.log('Account creation data:', formData);
        // On success, you might navigate to a success page or dashboard
        navigate('/success');
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

            {/* Form */}
            <div className="space-y-5">
                {/* Full Name */}
                <div>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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

                {/* Confirm Password */}
                <div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Re-enter your password"
                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                    <NavLink to={`/verify`} className={`w-full `}>
                        <button
                            onClick={handleCreateAccount}
                            className="w-full py-4 bg-[#0A61A4] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                        >
                            Create Account
                        </button>
                    </NavLink>
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
