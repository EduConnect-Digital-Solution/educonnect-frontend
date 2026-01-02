import React from 'react';
import {Header} from "../dashboardUtilities.jsx";
import {TeacherDashboardHome, EducationOverviewDashboard, Sidebar} from "./teacherUtils/teacherComponents.jsx";
// TODO: make a my classes sidebar page
export default function TeacherDashboard() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50  w-full ">
                {/* Sidebar is fixed on the left */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 md:p-6">
                        <EducationOverviewDashboard />
                        <TeacherDashboardHome />
                    </main>
                </div>
            </div>
        </>
    )
}

