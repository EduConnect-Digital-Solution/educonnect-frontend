import React, {useState} from 'react';
import {useSearchParams, useNavigate} from "react-router-dom";
import {Building2, Lock, Mail, Phone} from "lucide-react";
import {Toast} from "../../application/AdminDashboard/components/ui/Toast.jsx";
import {completeRegistration, RegSchool} from "../authAPIs.js";


export default function CompleteRegistration() {
    const [formData, setFormData] = React.useState({
        email: "",
        schoolId: "",
        currentPassword: "",
        newPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role');
    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error', duration = 2000, onClose = null) => {
        setToast({ show: true, message, type, onClose });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
            if (onClose) onClose();
        }, duration);
    };
    async function handleSubmit() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^(\+234|0)[789][01]\d{8}$/;

        try {
            if (!formData?.schoolId) {
                showToast("Please provide the school ID sent in your mail.");
                return;
            }

            if (!formData?.firstName) {
                showToast("Please provide a valid website.");
                return;
            }

            if (!formData?.lastName) {
                showToast("Please provide a valid website.");
                return;
            }

            if (!formData?.email || !emailPattern.test(formData.email)) {
                showToast("Please provide a valid website.");
                return;
            }


            if (!formData?.phone || !phonePattern.test(formData.phone)) {
                showToast("Please provide a contact phone number.");
                return;
            }

            if (!formData?.currentPassword) {
                showToast("Please provide a valid address for the school.");
                return;
            }

            if (!formData?.newPassword) {
                showToast("Please provide a valid address for the school.");
                return;
            }

            const payload = {...formData}
            try {
                await completeRegistration(payload);

                showToast('Registration Complete', 'success', 2000, () => {
                    navigate(`/dashboard/${role}`);
                });

            } catch (err) {
                const message = err?.message || err?.error || 'Registration failed';
                showToast(message, 'error');
            }

            console.log(payload);
        } catch (error) {
            showToast(error.response, 'error')
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
            <>
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 mb-3">
                        Complete Registration
                    </h2>
                    <p className="text-gray-500 font-medium">
                        You have been added to the EduConnect system as a {role}.
                        Please complete your registration by providing the following details.
                    </p>
                </div>
                <div className="space-y-5">
                    <div className={`flex gap-5`}>
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="firstName"
                                value={formData?.firstName || ''}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="Enter First Name"
                                className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="lastName"
                                value={formData?.lastName || ''}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Enter Last Name"
                                className="w-full pl-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="schoolId"
                                value={formData?.schoolId || ''}
                                onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                                placeholder="Enter school ID"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className={`flex gap-5`}>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="email"
                                value={formData?.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter email"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="phone"
                                value={formData?.phone || ''}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter Phone Number"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData?.currentPassword || ''}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            placeholder="Enter temporary password"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            name="newPassword"
                            value={formData?.newPassword || ''}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                    >
                        Continue
                    </button>
                </div>
            </>
        </div>
    );
}