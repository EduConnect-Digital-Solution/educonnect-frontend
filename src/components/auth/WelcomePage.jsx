// Register School Page
import React, {useState} from "react";
import { ArrowLeft, School, User, Mail, Lock, Phone, Building2, MapPin } from 'lucide-react';
import {NavLink} from "react-router-dom";
import {Images} from "../images.jsx";

export function WelcomePage({ onNavigate }) {
    const [formData, setFormData] = useState({
        schoolID: '',
        schoolEmail: '',
        schoolPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log('School registration:', formData);
        onNavigate('createAdmin');
    };

    return (
        <>
            <nav className={`py-5 sticky top-0 bg-gray-50 px-6 md:px-12 flex items-center`}>

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    {/* Logo Icon Placeholder */}
                    <NavLink to={`/`}>
                        <img
                            src={`${Images.main_logo}`} // Placeholder for the book icon
                            alt="EduConnect Logo Icon"
                            className="w-[120px] md:w-[170px] md:ml-14"
                        />
                    </NavLink>

                </div>
            </nav>

            <div className=" flex items-center justify-center p-4 py-8 md:py-12 bg-gray-50">

                {/* 2. Content wrapper: Sets the max width for the combined image + form card, applies shadow and rounded corners */}
                <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Side: Image and Text */}
                    {/* Visible on screens md and up (adjust lg:block as needed) */}
                    <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">

                        {/* Placeholder Image Element */}
                        {/* NOTE: You will need to replace this div with a proper <img> tag referencing your asset */}
                        {/* For this example, I'm using an overlay with text and a placeholder background */}
                        <div className="absolute inset-0 z-0">
                            {/* Placeholder image tag for the visual reference */}
                        </div>

                        {/* Image Placeholder with Dark Overlay and Text */}
                        {/* The dark gradient and text overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: "url('../../assets/images/reg.png')" // REPLACE with actual image path
                            }}
                        >
                            <img alt={``} src={`${Images.about_us}`}/>
                            {/* Semi-transparent dark overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-0 p-12 text-white">
                                <h2 className="text-3xl font-bold mb-4">
                                    Streamlining administration and management processes for schools
                                </h2>
                                <p className="text-sm text-gray-200">
                                    Empowering schools with efficient management and administrative solutions that ensure accuracy, efficiency, and compliance across every level.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form and Navigation */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">

                        {/* Back button (kept outside the main card content as in original code) */}
                        <div className="mb-6">
                            <NavLink
                                to={`/`}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Back to Home</span>
                            </NavLink>
                        </div>

                        {/* Form Header */}
                        <div className="text-center mb-8">
                            {/*<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">*/}
                            {/*    <School className="w-8 h-8 text-white" />*/}
                            {/*</div>*/}
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600">
                                Digitize your school operations with ease
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* School Name */}
                            <div>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="schoolID"
                                        value={formData?.schoolID || ''}
                                        onChange={handleChange}
                                        placeholder="Enter school ID"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                             <div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="schoolEmail"
                                        value={formData?.schoolEmail || ''}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                             <div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="schoolPassword"
                                        value={formData?.schoolPassword || ''}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>


                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                            >
                                Continue
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            New to EduConnect?{' '}
                            <button
                                onClick={() => onNavigate('register')} // Added a placeholder onClick for clarity
                                className="text-blue-600 font-semibold hover:underline">
                                Create an Account
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
        // 1. Main container: full screen, flexbox to align center, no max-width here

    );
}