import { useState, useEffect } from 'react';
import {getTeacherDashboard, getTeacherClasses, getTeacherStudents} from '../services/teacherService.jsx';

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
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                return await Promise.all([
                    getTeacherDashboard(),
                    getTeacherClasses(),
                    getTeacherStudents(),
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
            .then(([dashboardRes, classRes, StudentsRes]) => {
                setStatistics(dashboardRes.data.statistics);
                setSubjects(dashboardRes.data.teacher.subjects);
                setClasses(classRes.data.classes);
                setRecentActivity(dashboardRes.data.recentActivity.map(notification => ({
                    type: notification.type,
                    message: notification.message,
                    timestamp: notification.timestamp,
                })));
                setStudents(StudentsRes.data.students.map(std => ({
                    id: std.studentId,
                    fullName: std.fullName,
                    email: std.email,
                    class: std.classDisplay,
                    age: std.age,
                    gender: std.gender,
                    parents: std.parents.map(parent => ({
                        email: parent.email
                    })),
                    isEnrolled: std.isEnrolled,
                })));
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    return { loading, statistics, error, classes, recentActivity, students, subjects};
};
