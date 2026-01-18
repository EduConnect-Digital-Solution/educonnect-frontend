import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Images } from '../../components/images';
import {LoginSchool, LoginUser} from './authAPIs';
import { Toast } from '../application/AdminDashboard/components/ui/Toast';
import {useAuth} from "../../contexts/AuthContext.jsx";

// TODO: add a tour to the user dashboard when they login for the first time

const RoleCard = ({ title, description, onClick }) => (
    <button
        onClick={onClick}
        className="group relative w-full p-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 active:scale-[0.98]"
    >
        <div className="flex items-center gap-5">
            <div className="text-left">
                <h3 className="font-bold text-gray-900 group-hover:text-[#0A61A4] transition-colors">{title}</h3>
                <p className="text-xs text-gray-500 font-medium">{description}</p>
            </div>
        </div>
        <ArrowRight size={18} className="text-gray-300 group-hover:text-[#0A61A4] group-hover:translate-x-1 transition-all" />
    </button>
);

export default function AuthPage() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({
        schoolId: '',
        email: '',
        password: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'error', onClose: null });
    const navigate = useNavigate();
    const { user, login, logout, checkAuthStatus } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showLoggedInConfirmation, setShowLoggedInConfirmation] = useState(false);
    const [checkedSessionForRole, setCheckedSessionForRole] = useState(false); // New state to track if session check is done

    const showToast = (message, type = 'error', duration = 2000, onClose = null) => {
        setToast({ show: true, message, type, onClose });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
            if (onClose) onClose();
        }, duration);
    };

    const handleRoleSelection = async (role) => {
        setSelectedRole(role);
        setIsLoading(true);
        setCheckedSessionForRole(false); // Reset this flag for each new role selection

        try {
            const resultUser = await checkAuthStatus(); // Use the return value of checkAuthStatus

            if (resultUser && resultUser.role === role) {
                setShowLoggedInConfirmation(true);
            } else {
                setShowLoggedInConfirmation(false);
            }
        } catch (error) {
            console.error("Session check failed:", error);
            setShowLoggedInConfirmation(false);
        } finally {
            setIsLoading(false);
            setCheckedSessionForRole(true); // Session check completed for this role
        }
    };

    const handleLogin = async () => {
        if (!formData?.schoolId) return showToast("Please input your School ID");
        if (!formData?.email) return showToast("Please provide an email address.");
        if (!formData?.password) return showToast("Please provide a password.");

        const payload = {
            schoolId: formData.schoolId.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        };

        setIsLoading(true);
        try {
            let res;
            if (selectedRole === 'admin') {
                res = await LoginSchool(payload);
            } else {
                res = await LoginUser(payload);
            }

            if (res.success) {
                await login(res);
                setShowLoggedInConfirmation(true); // Show confirmation UI
                showToast('Login successful!', 'success');
            } else {
                showToast(res.message || 'Login Failed');
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Login failed';
            showToast(message, 'error');
        } finally {
            setIsLoading(false);
            setCheckedSessionForRole(true); // Login attempt completed
        }
    };

    const handleProceedToDashboard = () => {
        if (user && user.role) {
            navigate(`/dashboard/${user.role}`, { replace: true });
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            showToast('Logged out successfully.', 'success', 1500, () => {
                setSelectedRole(null);
                setShowLoggedInConfirmation(false);
                setCheckedSessionForRole(false); // Reset after logout
            });
        } catch (error) {
            showToast(error.message || 'Logout failed.', 'error');
        } finally {
            setIsLoading(false);
        }
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

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            <div className="min-h-screen flex bg-[#F4F5F9] items-center justify-center p-4">
                <img
                    alt={``}
                    src={`${Images.verify_bg}`}
                    className={`fixed inset-0 h-full w-full object-cover z-0`}
                />
                <div className="max-w-md w-full z-30">
                    {!selectedRole ? (
                        <div className="relative z-10 w-full max-w-md px-6">
                            <div className="text-center mb-10">
                                <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                                    EduConnect
                                </h2>
                                <p className="text-gray-500 font-medium">
                                    Welcome back! Please select your portal to continue.
                                </p>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <RoleCard
                                    title="School Administrator"
                                    description="Manage staff, students, and parents"
                                    onClick={() => handleRoleSelection('admin')}
                                />
                                <RoleCard
                                    title="Teacher"
                                    description="Access classrooms, grades, and lessons"
                                    onClick={() => handleRoleSelection('teacher')}
                                />
                                <RoleCard
                                    title="Parent"
                                    description="Monitor your child's progress across classes"
                                    onClick={() => handleRoleSelection('parent')}
                                />
                            </div>

                            <div className="mt-10 text-center">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                    Secure Access Portal
                                </p>
                            </div>
                        </div>
                    ) : isLoading || !checkedSessionForRole ? ( // Show loading while checking session
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <p className="mt-4 text-gray-500 font-medium animate-pulse">Processing...</p>
                        </div>
                    ) : showLoggedInConfirmation && user && user.role === selectedRole ? (
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
                            <p className="text-lg text-gray-700 mb-2">Logged in as: <span className="font-semibold">{user.name ?? user.fullName}</span></p>
                            <p className="text-md text-gray-500 mb-6">Role: <span className="font-semibold capitalize">{user.role}</span></p>
                            <div className="space-y-4">
                                <button
                                    onClick={handleProceedToDashboard}
                                    className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md"
                                >
                                    Proceed to Dashboard
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedRole(null);
                                    setShowLoggedInConfirmation(false);
                                    setCheckedSessionForRole(false);
                                }}
                                className="mt-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Choose a different role
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login
                                </h2>
                                <p className="text-gray-600">
                                    Digitize your school operations with ease
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="schoolId"
                                            value={formData?.schoolId || ''}
                                            onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                                            placeholder="Enter school ID"
                                            className="w-full pl-5 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData?.email || ''}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter email"
                                            className="w-full pl-5 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData?.password || ''}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Enter password"
                                            className="w-full pl-5 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading} onClick={handleLogin}
                                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                                >
                                    {isLoading ? 'Verifying...' : 'Continue'}
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedRole(null);
                                    setShowLoggedInConfirmation(false);
                                    setCheckedSessionForRole(false);
                                }}
                                className="mt-6 text-sm text-gray-500 hover:text-gray-700 text-center w-full mx-auto transition-colors"
                            >
                                Choose a different role
                            </button>

                            <p className="text-center text-sm text-gray-600 mt-6">
                                New to EduConnect?{' '}
                                <NavLink
                                    to="/register/school"
                                    className="text-blue-600 font-semibold hover:underline">
                                    Create an Account
                                </NavLink>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}