import { useState, useEffect } from 'react';
import { getParentDashboard, getParentProfile } from '../services/parentService';
import {FileText} from "lucide-react";

export const useAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState({
        totalChildren: 0,
        enrolledChildren: 0,
        activeChildren: 0,
        classesRepresented: 0
    });

    const [children, setChildren] = useState();
    const [notifications, setNotifications] = useState();
    const [parentInfo, setParentInfo] = useState();


    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const analyticsData = await getParentDashboard();
                const profileData = await getParentProfile();

                const totalStudents = analyticsData.data.children;
                const totalNotifications = analyticsData.data.notifications;

                // Setting Parent Related Analytics Variables
                setParentInfo(profileData.data.parent);
                setOverview(analyticsData.data.statistics);
                setChildren(totalStudents.map(child => ({
                    id: child.id,
                    studentId: child.studentId,
                    fullName: child.fullName,
                    classDisplay: child.classDisplay,
                    age: child.age,
                    gender: child.gender,
                    dateOfBirth: child.dateOfBirth,
                    isEnrolled: child.isEnrolled,
                    teachers: child.teachers
                })));
                setNotifications(totalNotifications.map(notification => ({
                    type: notification.type,
                    title: notification.title,
                    message: notification.message,
                    timestamp: notification.timestamp,
                    isRead: notification.isRead
                })));



            } catch (err) {
                console.error('Failed to fetch analytics:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { loading, overview, error, children, notifications, parentInfo };
};
