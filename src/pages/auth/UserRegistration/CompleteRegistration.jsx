import React, { useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Building2, Lock, Mail, Phone } from "lucide-react";
import { Toast } from "../../application/AdminDashboard/components/ui/Toast.jsx";
import { completeRegistration } from "../authAPIs.js";

export default function CompleteRegistration() {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role'); // "teacher" | "parent"
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        schoolId: "",
        currentPassword: "",
        newPassword: "",
        firstName: "",
        lastName: "",
        phone: "",

        // Teacher fields
        subjects: "",
        qualifications: "",
        experience: "",

        // Parent fields
        address: "",
        occupation: "",
        emergencyContact: "",
        emergencyPhone: ""
    });

    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error', duration = 2000, onClose = null) => {
        setToast({ show: true, message, type, onClose });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
            if (onClose) onClose();
        }, duration);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(\+234|0)[789][01]\d{8}$/;

        if (!formData.schoolId) return showToast("School ID is required");
        if (!formData.firstName) return showToast("First name is required");
        if (!formData.lastName) return showToast("Last name is required");
        if (!emailPattern.test(formData.email)) return showToast("Invalid email address");
        if (!phonePattern.test(formData.phone)) return showToast("Invalid phone number");
        if (!formData.currentPassword) return showToast("Temporary password is required");
        if (!formData.newPassword) return showToast("New password is required");

        /** Build payload safely */
        const payload = {
            email: formData.email,
            schoolId: formData.schoolId,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
        };

        if (role === "teacher") {
            payload.subjects = formData.subjects
                ? formData.subjects.split(',').map(s => s.trim()).filter(Boolean)
                : [];
            payload.qualifications = formData.qualifications;
            payload.experience = formData.experience;
        }

        if (role === "parent") {
            payload.address = formData.address;
            payload.occupation = formData.occupation;
            payload.emergencyContact = formData.emergencyContact;
            payload.emergencyPhone = formData.emergencyPhone;
        }

        try {
            await completeRegistration(payload);
            showToast("Registration complete", "success", 2000, () => {
                navigate(`/dashboard/${role}`);
            });
        } catch (err) {
            showToast(err?.message || "Registration failed");
        }
    }

    return (
        <div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-gray-900 mb-3">
                    Complete Registration
                </h2>
                <p className="text-gray-500 font-medium">
                    You have been added as a {role}. Please complete your registration.
                </p>
            </div>

            <div className="space-y-5">
                {/* Names */}
                <div className="flex gap-5">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* School ID */}
                <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        name="schoolId"
                        value={formData.schoolId}
                        onChange={handleChange}
                        placeholder="Enter school ID"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email & Phone */}
                <div className="flex gap-5">
                    <div className="relative w-full">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative w-full">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Teacher Fields */}
                {role === "teacher" && (
                    <>
                        <input
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            placeholder="Subjects (comma separated e.g Math, English)"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                            placeholder="Qualifications"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="Experience"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}

                {/* Parent Fields */}
                {role === "parent" && (
                    <>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Home address"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            placeholder="Occupation"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            placeholder="Emergency contact name"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleChange}
                            placeholder="Emergency contact phone"
                            className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}

                {/* Passwords */}
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Temporary password"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New password"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
