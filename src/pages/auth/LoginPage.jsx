// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import {Building2, Mail, Lock, ArrowLeft} from 'lucide-react';
import {Images} from "../../components/images.jsx";
import { useSearchParams } from 'react-router-dom';

export function LoginPage() {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role');
    const [formData, setFormData] = useState({
        schoolID: '',
        schoolEmail: '',
        schoolPassword: ''
    });

    const navigate = useNavigate();

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login data:', formData);
        navigate(`/dashboard/${role}`);
    };



    return (
        <>
            <div className="absolute top-0 z-50 bg-gray-200/50 rounded-xl m-10 p-5 overflow-hidden items-center ">
                <NavLink to={`/`}>
                    <img
                        src={`${Images.main_logo}`}
                        alt="EduConnect Logo Icon"
                        className="w-[120px] md:w-[170px] "
                    />
                </NavLink>
            </div>
            <div className="min-h-screen flex bg-[#F4F5F9] items-center justify-center p-4">
                <img
                    alt={``}
                    src={`${Images.verify_bg}`}
                    className={`fixed inset-0 h-full w-full object-cover z-0`} // <-- Updated Classes
                />
                <div className="max-w-md w-full z-30">
                    {/* Main card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {role ? role.charAt(0).toUpperCase() + role.slice(1) : ''} Login
                            </h2>
                            <p className="text-gray-600">
                                Digitize your school operations with ease
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* School ID */}
                            <div>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="schoolID"
                                        value={formData?.schoolID || ''}
                                        onChange={(e) => setFormData({ ...formData, schoolID: e.target.value })}
                                        placeholder="Enter school ID"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="schoolEmail"
                                        value={formData?.schoolEmail || ''}
                                        onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
                                        placeholder="Enter email"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="schoolPassword"
                                        value={formData?.schoolPassword || ''}
                                        onChange={(e) => setFormData({ ...formData, schoolPassword: e.target.value })}
                                        placeholder="Enter password"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>


                            {/* Submit Button */}
                            <button
                                onClick={handleLogin}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                            >
                                Continue
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            New to EduConnect?{' '}
                            <NavLink
                                to="/register/school"
                                className="text-blue-600 font-semibold hover:underline">
                                Create an Account
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
}
