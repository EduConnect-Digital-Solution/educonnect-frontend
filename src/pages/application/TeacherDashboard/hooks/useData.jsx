import { useState, useEffect } from 'react';
import {getTeacherDashboard, getTeacherClasses} from '../services/teacherService.jsx';

export const useData = () => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [statistics, setStatistics] = useState({
        myStudents: 0,
        totalStudentsInClasses: 0,
        subjects: 0,
        classes: 0
    });
    const [recentActivity, setRecentActivity] = useState();

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                return await Promise.all([
                    getTeacherDashboard(),
                    getTeacherClasses()
                ]);
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics()
            .then(([dashboardRes, classRes]) => {
                setStatistics(dashboardRes.data.statistics);
                setClasses(classRes.data.classes);
                setRecentActivity(dashboardRes.data.recentActivity.map(notification => ({
                    type: notification.type,
                    message: notification.message,
                    timestamp: notification.timestamp,
                })));
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    return { loading, statistics, error, classes, recentActivity };
};
