import React from 'react';
import {AnalyticsAndActions, ChildListandNotification, ParentsOverviewDashboard} from "./parentUtils/p_utils.jsx";
import {useAnalytics} from "./hooks/useAnalytics.jsx";
import ParentLayout from "./components/layout/ParentLayout.jsx";


export default function ParentDashboard() {
    const { loading, overview, error, children, notifications, quickActions } = useAnalytics();
    console.log(children);

    if (loading) {
        return (
            <ParentLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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