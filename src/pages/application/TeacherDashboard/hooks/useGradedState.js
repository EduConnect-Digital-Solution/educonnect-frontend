import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';

const getStorageKey = (userId, studentClass, subject) => {
    if (!userId || !studentClass || !subject) return null;
    return `graded_status_${userId}_${studentClass}_${subject}`;
};

export const useGradedState = (studentClass, subject) => {
    const { user } = useAuth();
    const [gradedStudents, setGradedStudents] = useState({});

    const storageKey = getStorageKey(user?.id, studentClass, subject);

    useEffect(() => {
        if (storageKey) {
            const storedGradedStatus = localStorage.getItem(storageKey);
            if (storedGradedStatus) {
                setGradedStudents(JSON.parse(storedGradedStatus));
            } else {
                setGradedStudents({});
            }
        }
    }, [storageKey]);

    const updateGradedStatus = useCallback((studentId, status = true) => {
        const newGradedStudents = { ...gradedStudents, [studentId]: status };
        setGradedStudents(newGradedStudents);
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(newGradedStudents));
        }
    }, [gradedStudents, storageKey]);

    const clearGradedStatus = useCallback(() => {
        setGradedStudents({});
        if (storageKey) {
            localStorage.removeItem(storageKey);
        }
    }, [storageKey]);
    
    const isStudentGraded = (studentId) => {
        return gradedStudents[studentId] === true;
    }

    return {
        gradedStudents,
        updateGradedStatus,
        clearGradedStatus,
        isStudentGraded
    };
};
