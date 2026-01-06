import React, {useEffect, useState} from 'react';

import {Header} from "../dashboardUtilities.jsx";
import {
    AdminOverviewDashboard,
    PendingInvitations,
    QuickActions, RecentActivity,
    Sidebar
} from "./adminUtils/a_utils.jsx";
import {getDashboardAnalytics, getInvitations} from "../../auth/authAPIs.js";
import {useAuth} from "../../../contexts/AuthContext.jsx";
import AnalyticsComponent from "./AnalyticsComponent.jsx";
import {Mail} from "lucide-react";

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userStats, setUserStats] = useState(null);
    const [overview, setOverview] = useState({
        totalUsers: 0,
        totalActiveUsers: 0,
        totalStudents: 0,
        totalActiveStudents: 0,
        totalInvitations: 0,
        pendingInvitations: 0
    });

    const [invitationList, setInvitations] = useState([]);
    const [userActivities, setUserActivities] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getDashboardAnalytics();

                const recentActivity = data.data.recentActivity;

                const invites = await getInvitations();

                const fetchedOverview = data.data.overview;
                const pendingInvites = invites.data.invitations;

                setUserStats(data.data.userStatistics);
                setOverview(fetchedOverview);
                setUserActivities(recentActivity);

                // 1. Map the raw data into the format your state expects
                const formattedInvites = pendingInvites.map(invite => ({
                    id:  invite.id,
                    email: invite.email,
                    role: invite.role,
                    status: invite.status,
                    invitedBy: { name: invite.invitedBy.name },
                    invitedAt: invite.invitedAt,
                    resendCount: invite.resendCount,
                }));

                // 2. Update the state ONCE with the full array
                setInvitations(formattedInvites);

            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);


    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>;
    }


    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar
                    Logout={handleLogout}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header handleLogout={handleLogout} />
                    <main className="flex-1 md:p-6">
                        <AdminOverviewDashboard
                            overview={overview}
                        />
                        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 p-2`}>
                            <AnalyticsComponent userStatsAnalytics={userStats}/>
                            <QuickActions />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-2">
                            <RecentActivity recentActivity={userActivities}/>

                            {/* Logic: If NOT loading AND we have at least one invitation, show the section */}
                            {!loading && invitationList.length > 0 ? (
                                <PendingInvitations invitations={invitationList} />
                            ) : !loading && invitationList.length === 0 ? (
                                <div className="bg-white p-12 rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                    <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 mb-4">
                                        <Mail size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">No invitations yet</h3>
                                    <p className="text-sm text-gray-500 max-w-xs mt-1">
                                        When you invite teachers or parents, they will appear here for management.
                                    </p>
                                </div>
                            ) : (
                                /* Optional: Show a skeleton or spinner while loading is true */
                                <div className="h-64 bg-gray-50 animate-pulse rounded-[32px]" />
                            )}
                        </div>

                    </main>
                </div>
            </div>
        </>
    )
}







