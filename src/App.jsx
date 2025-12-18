import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home.jsx";
import {VerifySchoolPage}  from "./components/auth/VerifySchoolPage.jsx";
import { SuccessPage } from "./components/auth/SuccessPage.jsx";
import { AuthLayout } from "./components/auth/AuthLayout.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { SchoolInfo } from "./pages/auth/SchoolInfo.jsx";
import { AdminInfo } from "./pages/auth/AdminInfo.jsx";
import TeacherDashboard from "./pages/application/TeacherDashboard.jsx";
import StudentList from "./components/MyStudents.jsx";
import TeacherProfile from "./components/UserProfile.jsx";

function App() {
    return (
        <div className={`font-[Outfit]`}>
            <Routes>
                {/* General Routes */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<LoginPage />} />
                {/* Auth Routes with Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/register" element={<Navigate to="/register/school" />} />
                    <Route path="/register/school" element={<SchoolInfo />} />
                    <Route path="/register/admin" element={<AdminInfo />} />
                </Route>

                {/* Other Routes */}
                <Route path="/verify" element={<VerifySchoolPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/dashboard/teacher" element={<TeacherDashboard />} />

                <Route path="/dashboard/teacher/my-students" element={<StudentList />} />
                <Route path="/dashboard/teacher/profile" element={<TeacherProfile />} />

                {/* Catch all */}
                {/*<Route path="*" element={<Navigate to="/" />} />*/}
            </Routes>
        </div>
    );
}

export default App;