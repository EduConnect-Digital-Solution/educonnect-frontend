// src/pages/auth/RegisterSchool.jsx
import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {ArrowLeft, Building2, Eye, EyeOff, Globe,
        Info, Lock, Mail, MapPin, Phone} from 'lucide-react';
import {RegSchool} from "./authAPIs.js";
import {Toast} from "../application/AdminDashboard/components/ui/Toast.jsx";
import {Tooltip, TooltipContent, TooltipTrigger,} from "../../components/ui/tooltip.jsx"
import {VerifySchoolModal} from "../../components/modals.jsx";

export function RegisterSchool() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [toAdmin, settoAdmin] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
    const [showVerifySchoolModal, setShowVerifySchoolModal] = useState(false); // New state
    const [verificationEmail, setVerificationEmail] = useState(''); // New state

    const showToast = (message, type = 'error', duration = 2000, onClose = null) => {
        setToast({ show: true, message, type, onClose });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
            if (onClose) onClose();
        }, duration);
    };

    const [schoolFormData, setschoolFormData] = useState({
        schoolName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        state: ''
    });

    const [formData, setFormData] = useState({
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
            showToast("Please provide a valid strong password.");
            return;
        }

        const combinedPayload = {
        ...handleProceed(),
            adminFirstName: formData.adminFirstName.trim(),
            adminLastName: formData.adminLastName.trim(),
            email: formData.adminEmail.trim().toLowerCase(),
            password: formData.password,
        };

        console.log('combinedPayload', combinedPayload);

        try {
            await RegSchool(combinedPayload);
            showToast('School registered successfully', 'success');
            setVerificationEmail(combinedPayload.email);
            setShowVerifySchoolModal(true);

        } catch (err) {
            const message = err?.message || err?.error || 'Registration failed';
            showToast(message, 'error');
        }
    };

    const formatWebsiteUrl = (url) => {
        if (!url) return null;
        let cleanUrl = url.trim().toLowerCase();

        // Check if the URL already starts with http:// or https://
        // If not, prepend https://
        if (!/^https?:\/\//i.test(cleanUrl)) {
            cleanUrl = `https://${cleanUrl}`;
        }

        return cleanUrl;
    };

    // Application in your data object:
    const handleProceed = () => {
        // 1. Define specific regex patterns
        const urlPattern = /^(?:https?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/;

        // Basic international phone pattern (allows +, spaces, and 10-15 digits)
        const phonePattern = /^(\+234|0)[789][01]\d{8}$/;

        // Validation Checks
        if (!schoolFormData?.schoolName || schoolFormData.schoolName.trim().length < 5) {
            showToast("A valid school name is required to proceed.");
            return;
        }

        if (!schoolFormData?.website || !urlPattern.test(schoolFormData.website)) {
            showToast("Please provide a valid website.");
            return;
        }


        if (!schoolFormData?.phone || !phonePattern.test(schoolFormData.phone)) {
            showToast("Please provide a contact phone number.");
            return;
        }


        if (!schoolFormData?.address) {
            showToast("Please provide a valid address for the school.");
            return;
        }
        if (!schoolFormData?.description) {
            showToast("Please provide a short description for the school.");
            return;
        }

        settoAdmin(true)

        return {
            schoolName: schoolFormData.schoolName.trim(),
            website: formatWebsiteUrl(schoolFormData.website),
            phone: schoolFormData.phone.trim(),
            address: schoolFormData.address.trim(),
            description: schoolFormData.description.trim(),
        };
    };

    return (
        <>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            {!toAdmin && (
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
                                    value={schoolFormData?.schoolName || ""}
                                    onChange={(e) => setschoolFormData({...schoolFormData, schoolName: e.target.value})}
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
                                    value={schoolFormData?.website || ""}
                                    onChange={(e) => setschoolFormData({...schoolFormData, website: e.target.value})}
                                    placeholder="School website"
                                    className="w-full pl-12  px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={schoolFormData?.phone || ""}
                                    onChange={(e) => setschoolFormData({...schoolFormData, phone: e.target.value})}
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
                                    value={schoolFormData?.address || ""}
                                    onChange={(e) => setschoolFormData({...schoolFormData, address: e.target.value})}
                                    placeholder="Street address"
                                    rows="3"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none">
                        </textarea>
                            </div>
                            <div className="w-full relative">
                                <Info className="absolute left-4 top-4 w-5 h-5 text-gray-400"/>
                                <textarea
                                    name="description" // Updated name
                                    value={schoolFormData?.description || ""} // Updated value
                                    onChange={(e) => setschoolFormData({...schoolFormData, description: e.target.value})} // Updated handler
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
                            to={`/login`}
                            className="text-[#0A61A4] font-semibold hover:underline"
                        >
                            Sign in
                        </NavLink>
                    </p>
                </>
            )}

            {toAdmin && (
                <>
                    {/* Back button */}
                    <div className="mb-6">
                        <button
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => settoAdmin(false)}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </button>

                    </div>

                    {/* Form Header */}
                    <div className="text-center mb-8 mx-auto ">
                        <div className={`flex flex-row  text-center justify-center w-full`}>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Admin Information
                            </h2>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className={`w-10`} />
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p className={`max-w-xs`}>
                                        An admin is responsible for managing school operations, overseeing user accounts, and ensuring smooth functioning of the EduConnect platform for your institution.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <p className="text-gray-600">
                            You're one step away from digitizing your school operations.
                        </p>
                    </div>

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
            )}

            {showVerifySchoolModal && (
                <VerifySchoolModal
                    onClose={() => setShowVerifySchoolModal(false)}
                    email={verificationEmail}
                    showToast={showToast}
                />
            )}
        </>
    );
}
