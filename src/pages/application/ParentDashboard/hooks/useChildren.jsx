import { useState, useEffect } from 'react';
import { getStudentInfo } from '../services/parentService';

export const useChildren = ({studentId}) => {
    const [loading, setLoading] = useState(true);

    const [children, setChildren] = useState();


    useEffect(() => {
        if (!studentId) return; // Only fetch if studentId is provided
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const analyticsData = await getStudentInfo(studentId);
                const totalChildren = analyticsData.data.children;
                setChildren(totalChildren.map(child => ({ ...child })));
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
                // setError is not defined, so remove or define it if needed
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [studentId]);

    return { loading, children };
};
