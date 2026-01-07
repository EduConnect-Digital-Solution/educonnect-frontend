import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

// Components that should load immediately (not lazy loaded)
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthLayout } from "./components/auth/AuthLayout.jsx";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

// LAZY LOADED PAGES
const Home = lazy(() => import("./pages/Home.jsx").then(m => ({ default: m.Home })));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.jsx").then(m => ({ default: m.LoginPage })));
const RegisterSchool = lazy(() => import("./pages/auth/RegisterSchool.jsx").then(m => ({ default: m.RegisterSchool })));
const VerifySchoolPage = lazy(() => import("./pages/auth/VerifySchoolPage.jsx").then(m => ({ default: m.VerifySchoolPage })));
const AuthWelcome = lazy(() => import("./pages/auth/AuthWelcome.jsx"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/application/AdminDashboard/AdminDashboard.jsx"));
const UserList = lazy(() => import("./pages/application/AdminDashboard/UsersList.jsx"));
const ParentsList = lazy(() => import("./pages/application/AdminDashboard/UserManagement/getParents.jsx"));
const TeachersList = lazy(() => import("./pages/application/AdminDashboard/UserManagement/getTeachers.jsx"));
const StudentsList = lazy(() => import("./pages/application/AdminDashboard/UserManagement/getStudents.jsx"));
const SchoolSettings = lazy(() => import("./pages/application/AdminDashboard/UserManagement/SchoolProfile.jsx"));
const AdminProfile = lazy(() => import("./pages/application/AdminDashboard/AdminProfile.jsx"));

// Parent Pages
const ParentDashboard = lazy(() => import("./pages/application/ParentDashboard/ParentDashboard.jsx"));
const ChildSelectionPage = lazy(() => import("./pages/application/ParentDashboard/MyChildren.jsx"));
const ParentProfilePage = lazy(() => import("./pages/application/ParentDashboard/ParentProfilePage.jsx"));

// Teacher Pages
const TeacherDashboard = lazy(() => import("./pages/application/TeacherDashboard/TeacherDashboard.jsx"));
const StudentList = lazy(() => import("./pages/application/TeacherDashboard/MyStudents.jsx"));
const TeacherProfile = lazy(() => import("./pages/application/TeacherDashboard/UserProfile.jsx"));
const ClassStudents = lazy(() => import("./pages/application/TeacherDashboard/ClassStudents.jsx"));

function AuthContextBridge() {
    const auth = useAuth();

    useEffect(() => {
        // Expose auth context to axios interceptor
        window.authContext = auth;

        return () => {
            delete window.authContext;
        };
    }, [auth]);

    return null;
}

const LoadingFallback = () => (
    <div className="h-screen w-full  flex items-center justify-center font-[Outfit]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>

    </div>
);

function AppRoutes() {
    return (
        <div className={`font-[Outfit]`}>
            <AuthContextBridge />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<AuthLayout />}>
                        <Route path="/register/school" element={<RegisterSchool />} />
                        <Route path="/login/welcome" element={<AuthWelcome />} />
                        <Route path="/register" element={<Navigate to="/register/school" />} />
                        <Route path="/register/admin" element={<RegisterSchool />} />
                    </Route>

                    <Route path="/verify" element={<VerifySchoolPage />} />

                    {/* Admin Protected Routes */}
                    <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/school-profile" element={<ProtectedRoute requiredRole="admin"><SchoolSettings /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/admin-profile" element={<ProtectedRoute requiredRole="admin"><AdminProfile /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><UserList /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users/parents" element={<ProtectedRoute requiredRole="admin"><ParentsList /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users/students" element={<ProtectedRoute requiredRole="admin"><StudentsList /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users/teachers" element={<ProtectedRoute requiredRole="admin"><TeachersList /></ProtectedRoute>} />

                    {/* Parent Protected Routes */}
                    <Route path="/dashboard/parent" element={<ProtectedRoute requiredRole="parent"><ParentDashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/parent/children" element={<ProtectedRoute requiredRole="parent"><ChildSelectionPage /></ProtectedRoute>} />
                    <Route path="/dashboard/parent/profile" element={<ProtectedRoute requiredRole="parent"><ParentProfilePage /></ProtectedRoute>} />

                    {/* Teacher Protected Routes */}
                    <Route path="/dashboard/teacher" element={<ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/teacher/students" element={<ProtectedRoute requiredRole="teacher"><StudentList /></ProtectedRoute>} />
                    <Route path="/dashboard/teacher/profile" element={<ProtectedRoute requiredRole="teacher"><TeacherProfile /></ProtectedRoute>} />
                    <Route path="/dashboard/teacher/students/:subject/:class" element={<ProtectedRoute requiredRole="teacher"><ClassStudents /></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;