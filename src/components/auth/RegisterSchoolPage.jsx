// Register School Page
import React, {useState} from "react";
import { ArrowLeft, School, User, Mail, Lock, Phone, Building2, MapPin } from 'lucide-react';
import {NavLink} from "react-router-dom";
import {Images} from "../images.jsx";

export function RegisterSchoolPage() {
    const [formData, setFormData] = useState({
        schoolName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        state: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="hidden z-50 md:flex items-center absolute space-x-2">
                <NavLink to={`/`}>
                    <img
                        src={`${Images.main_logo}`}
                        alt="EduConnect Logo Icon"
                        className="w-[120px] md:w-[170px] md:ml-24 my-6"
                    />
                </NavLink>

            </div>
            <div className="min-h-screen w-full z-50 flex bg-white">

                {/*LEFT SIDE IMAGE*/}
                <div className={`hidden xl:flex bg-gray-100 w-1/2`}>
                    <div className="flex h-full relative p-25">
                        <img
                            src={`${Images.auth}`}
                            alt="school children"
                            className="rounded-2xl object-cover"
                        />

                        {/* dark overlay */}
                        <div className="absolute inset-0 rounded-2xl m-25 bg-black/30" />

                        {/* text */}
                        <div className="absolute bottom-10 left-10 m-25 text-white max-w-lg">
                            <h1 className="text-3xl font-bold mb-3">
                                Streamlining administration and payroll processes for schools
                            </h1>
                            <p className="text-gray-200">
                                Empowering schools with efficient payroll and administrative solutions that ensure
                                accuracy, transparency, and compliance across every level.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="lg:max-w-3xl w-full mx-auto p-8 md:p-20 flex flex-col justify-center">

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

                    {/* FORM (YOUR EXACT FORM BELOW) */}
                    <div className="space-y-5 ">

                        {/* School Name */}
                        <div>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData?.schoolName || ""}
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
                                    placeholder="School website"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <NavLink to={`/create-admin`}>
                            <button
                                className="w-full py-4 bg-[#0A61A4] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                                 Proceed
                            </button>
                        </NavLink>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already registered?{" "}
                        <a
                            href={`/welcome`}
                            className="text-[#0A61A4] font-semibold hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                    <p className="text-center text-sm text-gray-600 mt-3">
                        By using these services you agree to Gradelink’s
                          {" "}
                        <a
                            href={`/welcome`}
                            className="text-[#0A61A4] font-semibold hover:underline"
                        >
                            Terms of Service
                        </a>
                        {" "}and{" "}
                        <a
                            href={`/welcome`}
                            className="text-[#0A61A4] font-semibold hover:underline"
                        >
                            Privacy Policy
                        </a>

                    </p>
                </div>
            </div>

        </>
    );
}