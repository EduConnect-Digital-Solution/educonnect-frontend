// javascript
// File: `src/pages/auth/AuthPage.jsx`
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Images } from '../../components/images';
import {LoginSchool, LoginUser} from './authAPIs';
import { Toast } from '../application/AdminDashboard/components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';

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
    const { checkAuthStatus, user, isAuthenticated, login } = useAuth();

    const getDashboardRoute = (u) => {
        if (!u || !u.role) return '/';
        if (u.role === 'admin') return '/dashboard/admin';
        if (u.role === 'teacher') return '/dashboard/teacher';
        if (u.role === 'parent') return '/dashboard/parent';
        return '/';
    };

    // Ensure auth status is checked on mount
    useEffect(() => {
        let mounted = true;
        const init = async () => {
            try {
                await checkAuthStatus();
            } catch (e) {
                // ignore — user will stay unauthenticated
            }
        };
        if (mounted) init();
        return () => { mounted = false; };
    }, [checkAuthStatus]);

    // Redirect only when auth is established and user has a role
    useEffect(() => {
        if (isAuthenticated && user?.role) {
            navigate(getDashboardRoute(user), { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const showToast = (message, type = 'error', duration = 2000, onClose = null) => {
        setToast({ show: true, message, type, onClose });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
            if (onClose) onClose();
        }, duration);
    };

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    const handleLogin = async () => {
        if (!formData?.schoolId) {
            showToast("Please input your School ID");
            return;
        }
        if (!formData?.email) {
            showToast("Please provide an email address.");
            return;
        }
        if (!formData?.password) {
            showToast("Please provide a password.");
            return;
        }

        const payload = {
            schoolId: formData.schoolId.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        };


        try {
            let loginData;
            if (selectedRole === 'admin') {
                loginData = await LoginSchool(payload);
            } else {
                loginData = await LoginUser(payload);
            }
            login(loginData);

            if (loginData.success === true) {
                await checkAuthStatus();
                showToast('Login successful', 'success', 2000);
            } else {
                showToast('Login Failed, Please try again');
            }
        } catch (err) {
            const message = err?.message || err?.error || 'Login failed';
            showToast(message, 'error');
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

                                <div>
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
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData?.password || ''}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Enter password"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mt-6"
                                >
                                    Continue
                                </button>
                            </div>

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
