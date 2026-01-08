import { useState, useEffect } from 'react';
import { getDashboardAnalytics, getInvitations } from '../services/adminService';

export const useAnalytics = () => {
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
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const [analyticsData, invitesData] = await Promise.all([
                    getDashboardAnalytics(),
                    getInvitations()
                ]);

                const { recentActivity, overview: fetchedOverview, userStatistics } = analyticsData.data;

                const pendingInvites = invitesData.data.invitations;
                // console.log(recentActivity)

                setUserStats(userStatistics);
                setOverview(fetchedOverview);
                setUserActivities(recentActivity);

                const formattedInvites = pendingInvites.map(invite => ({
                    id: invite.id,
                    email: invite.email,
                    role: invite.role,
                    status: invite.status,
                    invitedBy: { name: invite.invitedBy.name },
                    invitedAt: invite.invitedAt,
                    resendCount: invite.resendCount,
                }));

                setInvitations(formattedInvites);
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { loading, userStats, overview, invitationList, userActivities, error };
};
