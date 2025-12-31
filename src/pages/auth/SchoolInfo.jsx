// src/pages/auth/SchoolInfo.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import {ArrowLeft, Building2, Globe, Phone, MapPin, AlertCircle, X, CheckCircle, Info} from 'lucide-react';
import {RegSchool} from "./auth.js";
import {Toast} from "../../components/Toast.jsx";


export function SchoolInfo() {
    const [formData, setFormData] = useState({
        schoolName: '', email: '', phone: '', address: '', website: '', state: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const navigate = useNavigate();

    const handleProceed = () => {
        // 1. Define specific regex patterns
        const urlPattern = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/;

        // Basic international phone pattern (allows +, spaces, and 10-15 digits)
        const phonePattern = /^(\+234|0)[789][01]\d{8}$/;

        // Validation Checks
        if (!formData?.schoolName || formData.schoolName.trim().length < 5) {
            showToast("A valid school name is required to proceed.");
            return;
        }

        if (!formData?.website || !urlPattern.test(formData.website)) {
            showToast("Please provide a valid website.");
            return;
        }


        if (!formData?.phone || !phonePattern.test(formData.phone)) {
            showToast("Please provide a contact phone number.");
            return;
        }


        if (!formData?.address) {
            showToast("Please provide a valid address for the school.");
            return;
        }


        // 3. Packaging the Payload
        const payload = {
            schoolName: formData.schoolName.trim(),
            website: formData.website?.trim().toLowerCase() || null,
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            description: formData.description.trim(),
        };

        navigate('/register/admin', { state: { schoolData: payload } });
    };


    return (
        <>
            {/* Back button */}
            <div className="mb-6">
                <NavLink
                    to={`/`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5"/>
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

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            {/* FORM */}
            <div className="space-y-5 ">
                {/* School Name */}
                <div>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input
                            type="text"
                            required
                            name="schoolName"
                            value={formData?.schoolName || ""}
                            onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                            placeholder="Enter school name"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Website + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">

                        <Globe className="absolute left-4 top-4 w-5 h-5 text-gray-400"/>
                        <input
                            type="text"
                            name="website"
                            value={formData?.website || ""}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            placeholder="School website"
                            className="w-full pl-12  px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="tel"
                                name="phone"
                                value={formData?.phone || ""}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+234 813 456 7890"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                </div>

                {/* Address */}
                <div className="flex flex-wrap gap-4 md:gap-0 md:flex-nowrap md:space-x-4">
                    <div className="w-full relative">
                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400"/>
                        <textarea
                            name="address"
                            value={formData?.address || ""}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder="Street address"
                            rows="3"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none">
                        </textarea>
                    </div>
                    <div className="w-full relative">
                        <Info className="absolute left-4 top-4 w-5 h-5 text-gray-400"/>
                        <textarea
                            name="description" // Updated name
                            value={formData?.description || ""} // Updated value
                            onChange={(e) => setFormData({...formData, description: e.target.value})} // Updated handler
                            placeholder="School Description"
                            rows="3"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none">
                        </textarea>
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
