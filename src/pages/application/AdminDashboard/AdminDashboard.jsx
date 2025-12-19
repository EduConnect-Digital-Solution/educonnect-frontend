import React from 'react';

import {Header} from "../dashboardUtilities.jsx";
import {AdminOverviewDashboard, AnalyticsAndActions, BottomSection, Sidebar} from "./adminUtils/a_utils.jsx";

export default function AdminDashboard() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar is fixed on the left */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 md:p-6">
                        <AdminOverviewDashboard />
                        <AnalyticsAndActions />
                        <BottomSection />
                    </main>
                </div>
            </div>
        </>
    )
}







