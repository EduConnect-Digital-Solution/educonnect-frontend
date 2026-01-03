import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home.jsx";
import {VerifySchoolPage}  from "./pages/auth/VerifySchoolPage.jsx";
import { AuthLayout } from "./components/auth/AuthLayout.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegisterSchool } from "./pages/auth/RegisterSchool.jsx";
import TeacherDashboard from "./pages/application/TeacherDashboard/TeacherDashboard.jsx";
import StudentList from "./pages/application/TeacherDashboard/MyStudents.jsx";
import TeacherProfile from "./pages/application/TeacherDashboard/UserProfile.jsx";
import ClassStudents from "./pages/application/TeacherDashboard/ClassStudents.jsx";
import ParentDashboard from "./pages/application/ParentDashboard/ParentDashboard.jsx";
import ChildSelectionPage from "./pages/application/ParentDashboard/MyChildren.jsx";
import ParentProfilePage from "./pages/application/ParentDashboard/ParentProfilePage.jsx";
import AuthWelcome from "./pages/auth/AuthWelcome.jsx";
import AdminDashboard from "./pages/application/AdminDashboard/AdminDashboard.jsx";
import UserList from "./pages/application/AdminDashboard/UsersList.jsx";
import ParentsList from "./pages/application/AdminDashboard/UserManagement/getParents.jsx";
import TeachersList from "./pages/application/AdminDashboard/UserManagement/getTeachers.jsx";
import StudentsList from "./pages/application/AdminDashboard/UserManagement/getStudents.jsx";
import SchoolSettings from "./pages/application/AdminDashboard/UserManagement/SchoolProfile.jsx";
import AdminProfile from "./pages/application/AdminDashboard/AdminProfile.jsx";


function App() {
    return (
        <div className={`font-[Outfit]`}>
            <Routes>
                {/* General Routes */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<LoginPage />} />

                {/* Auth Routes with Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/register/school" element={<RegisterSchool />} />
                    <Route path="/login/welcome" element={<AuthWelcome />} />
                    <Route path="/register" element={<Navigate to="/register/school" />} />
                    <Route path="/register/admin" element={<RegisterSchool />} />
                </Route>

                <Route path="/verify" element={<VerifySchoolPage />} />

                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/admin/school-profile" element={<SchoolSettings />} />
                <Route path="/dashboard/admin/admin-profile" element={<AdminProfile />} />
                <Route path="/dashboard/admin/users" element={<UserList />} />
                <Route path="/dashboard/admin/users/parents" element={<ParentsList />} />
                <Route path="/dashboard/admin/users/students" element={<StudentsList />} />
                <Route path="/dashboard/admin/users/teachers" element={<TeachersList />} />

                <Route path="/dashboard/parent" element={<ParentDashboard />} />
                <Route path="/dashboard/parent/children" element={<ChildSelectionPage />} />
                <Route path="/dashboard/parent/profile" element={<ParentProfilePage />} />

                <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
                <Route path="/dashboard/teacher/students" element={<StudentList />} />
                <Route path="/dashboard/teacher/profile" element={<TeacherProfile />} />
                <Route path="/dashboard/teacher/students/:subject/:class" element={<ClassStudents />} />


                {/* Catch all */}
                {/*<Route path="*" element={<Navigate to="/" />} />*/}
            </Routes>
        </div>
    );
}

export default App;