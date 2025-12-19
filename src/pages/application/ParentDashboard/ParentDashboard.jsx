import React from 'react';
import {
    ParentSidebar,
    ParentsQuickStatsInfo,
    AnalyticsAndActions, ChildListandNotification
} from "./parentUtils/p_utils.jsx";
import {Header} from "../dashboardUtilities.jsx";


export default function ParentDashboard() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar is fixed on the left */}
                <ParentSidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                        <ParentsQuickStatsInfo />
                        <AnalyticsAndActions />
                        <ChildListandNotification />
                    </main>
                </div>
            </div>
        </>
    )
}