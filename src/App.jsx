import React, {Suspense, lazy, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthLayout} from "./components/auth/AuthLayout.jsx";

// LAZY LOADED PAGES
const Home = lazy(() => import("./pages/Home.jsx").then(m => ({ default: m.Home })));
const AuthPage = lazy(() => import("./pages/auth/AuthPage.jsx"));
const CompleteRegistration = lazy(() => import("./pages/auth/UserRegistration/CompleteRegistration"));
const RegisterSchool = lazy(() => import("./pages/auth/RegisterSchool.jsx").then(m => ({ default: m.RegisterSchool })));
const VerifySchoolPage = lazy(() => import("./pages/auth/VerifySchoolPage.jsx").then(m => ({ default: m.VerifySchoolPage })))

// Admin Pages
const DashboardPage = lazy(() => import("./pages/application/AdminDashboard/pages/DashboardPage.jsx"));
const UserManagementPage = lazy(() => import("./pages/application/AdminDashboard/pages/UserManagementPage.jsx"));
const Students = lazy(() => import("./pages/application/AdminDashboard/pages/StudentManagement.jsx"));
const SchoolProfilePage = lazy(() => import("./pages/application/AdminDashboard/pages/SchoolProfilePage.jsx"));
const AdminProfilePage = lazy(() => import("./pages/application/AdminDashboard/pages/AdminProfilePage.jsx"));

// CompleteRegistration Pages
const ParentDashboard = lazy(() => import("./pages/application/ParentDashboard/ParentDashboard.jsx"));
const ChildSelectionPage = lazy(() => import("./pages/application/ParentDashboard/MyChildren.jsx"));
const ParentProfilePage = lazy(() => import("./pages/application/ParentDashboard/ParentProfilePage.jsx"));

// Teacher Pages
const TeacherDashboard = lazy(() => import("./pages/application/TeacherDashboard/TeacherDashboard.jsx"));
const StudentList = lazy(() => import("./pages/application/TeacherDashboard/MyStudents.jsx"));
const TeacherProfile = lazy(() => import("./pages/application/TeacherDashboard/UserProfile.jsx"));
const ClassStudents = lazy(() => import("./pages/application/TeacherDashboard/ClassStudents.jsx"));

const LoadingFallback = () => (
    <div className="h-screen w-full flex items-center justify-center font-[Outfit]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
);

const AuthContextBridge = ({ children }) => {
    const auth = useAuth();

    useEffect(() => {
        // Make auth context available to axios interceptors
        window.authContext = auth;

        return () => {
            delete window.authContext;
        };
    }, [auth]);

    return children;
};

// TODO: make it so that when a user opens our website they arent checked if they are authenticated, they are taken to the login page, then when they choose their role, instead of seeing the forms if they are logged in they will see proceed to dashboard, if they are not they will see the forms

function AppRoutes() {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <LoadingFallback />;
    }

    return (
        <div className={`font-[Outfit]`}>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<AuthPage />} />

                    <Route element={<AuthLayout />}>
                        <Route path="/register/school" element={<RegisterSchool />} />
                        <Route path="/complete-registration" element={<CompleteRegistration />} />
                        <Route path="/register" element={<Navigate to="/register/school" />} />
                    </Route>

                    <Route path="/verify" element={<VerifySchoolPage />} />

                    {/* Admin Protected Routes */}
                    <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><DashboardPage /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/school-profile" element={<ProtectedRoute requiredRole="admin"><SchoolProfilePage /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/profile" element={<ProtectedRoute requiredRole="admin"><AdminProfilePage /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><UserManagementPage /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users/parents" element={<ProtectedRoute requiredRole="admin"><UserManagementPage /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/students" element={<ProtectedRoute requiredRole="admin"><Students /></ProtectedRoute>} />
                    <Route path="/dashboard/admin/users/teachers" element={<ProtectedRoute requiredRole="admin"><UserManagementPage /></ProtectedRoute>} />

                    {/* CompleteRegistration Protected Routes */}
                    <Route path="/dashboard/parent" element={<ProtectedRoute requiredRole="parent"><ParentDashboard /></ProtectedRoute>}/>
                    <Route path="/dashboard/parent/children" element={<ProtectedRoute requiredRole="parent"><ChildSelectionPage /></ProtectedRoute>} />
                    <Route path="/dashboard/parent/profile" element={<ProtectedRoute requiredRole="parent"><ParentProfilePage /></ProtectedRoute>} />

                    {/* Teacher Protected Routes */}
                    <Route path="/dashboard/teacher" element={
                        <ProtectedRoute requiredRole="teacher">
                            <TeacherDashboard />
                         </ProtectedRoute>
                        } />
                    <Route path="/dashboard/teacher/students" element={
                        <ProtectedRoute requiredRole="teacher">
                            <StudentList />
                         </ProtectedRoute>
                    } />
                    <Route path="/dashboard/teacher/profile" element={
                        <ProtectedRoute requiredRole="teacher">
                            <TeacherProfile />
                         </ProtectedRoute>
                    } />
                    <Route path="/dashboard/teacher/students/:subject/:class" element={
                        <ProtectedRoute requiredRole="teacher">
                            <ClassStudents />
                        </ProtectedRoute>
                    } />

                    {/*<Route path="*" element={<Navigate to="/" />} />*/}
                </Routes>
            </Suspense>
        </div>
    );
}

function App() {
    return (
    <AuthProvider>
        <AuthContextBridge>
            <AppRoutes />
        </AuthContextBridge>
    </AuthProvider>
    );
}

export default App;