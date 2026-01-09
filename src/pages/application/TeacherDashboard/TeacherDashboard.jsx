import React from 'react';
import {
    EducationOverviewDashboard,
    RecentActivity,
    TeacherAnalyticsBox, QuickActions, TeacherResponsibilities
} from "./teacherUtils/teacherComponents.jsx";
import {useData} from "./hooks/useData.jsx";
import TeacherLayout from "./components/layout/TeacherLayout.jsx";

export default function TeacherDashboard() {
    const { loading, statistics, error, classes, recentActivity } = useData();


    if (loading) {
        return (
            <TeacherLayout>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Teacher Dashboard...</p>
                </div>
            </TeacherLayout>
        );
    }
    return (
        <>
            <TeacherLayout>
                <EducationOverviewDashboard statistics={statistics}/>

                <div className="grid grid-cols-1 p-2 lg:grid-cols-3 gap-6">
                    <TeacherResponsibilities classes={classes} />
                    <QuickActions />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-2">
                    <TeacherAnalyticsBox/>
                    <RecentActivity activities={recentActivity} />
                </div>

            </TeacherLayout>
        </>
    )
}

