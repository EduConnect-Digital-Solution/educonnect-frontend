import React from 'react';
import {AnalyticsAndActions, ChildListandNotification, ParentsOverviewDashboard} from "./parentUtils/p_utils.jsx";
import {useAnalytics} from "./hooks/useAnalytics.jsx";
import ParentLayout from "./components/layout/ParentLayout.jsx";


export default function ParentDashboard() {
    const { loading, overview, error, children, notifications } = useAnalytics();
    console.log(children);

    if (loading) {
        return (
            <ParentLayout>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Parent Dashboard...</p>
                </div>
            </ParentLayout>
        );
    }

    return (
        <>
            <ParentLayout>
                <ParentsOverviewDashboard overview={overview}/>
                <AnalyticsAndActions />
                <ChildListandNotification children={children} notifications={notifications}/>
            </ParentLayout>
        </>
    )
}