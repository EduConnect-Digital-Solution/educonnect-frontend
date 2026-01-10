import apiClient from '../../utils/axiosConfig';

export async function RegSchool(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/register', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function LoginSchool(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/login', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function LoginUser(payload) {
    try {
        const { data } = await apiClient.post('/api/user/auth/login', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getStudentInfo(studentId) {
    try {
        const { data } = await apiClient.get(`/api/parent/children/${studentId}`);
        return data.data.children[0];
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getParentProfile() {
    try {
        const { data } = await apiClient.get(`/api/parent/profile`);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function verifyOTP(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/verify-email', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function resendOTP(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/resend-otp', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// New API function for dashboard data
export async function getDashboardAnalytics() {
    try {
        const { data } = await apiClient.get('/api/admin/dashboard/analytics');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// New API function for dashboard data
export async function getParentDashboard() {
    try {
        const { data } = await apiClient.get('/api/parent/dashboard');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


// New API function for dashboard data
export async function getTeacherDashboard() {
    try {
        const { data } = await apiClient.get('/api/teacher/dashboard');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


// New API function for dashboard data
export async function getTeacherClasses() {
    try {
        const { data } = await apiClient.get('/api/teacher/classes');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getTeacherStudents() {
    try {
        const { data } = await apiClient.get('/api/teacher/students');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function getSubjectsByClass(className) {

    // expected response:
    // {
    //     "success": true,
    //     "message": "Subjects retrieved successfully",
    //     "data": {
    //     "className": "JSS1",
    //         "subjects": [
    //         {
    //             "name": "Math",
    //             "studentCount": 1,
    //             "gradedCount": 0,
    //             "gradingProgress": 0
    //         },
    //         {
    //             "name": " english",
    //             "studentCount": 1,
    //             "gradedCount": 0,
    //             "gradingProgress": 0
    //         },
    //         {
    //             "name": " social studies",
    //             "studentCount": 1,
    //             "gradedCount": 0,
    //             "gradingProgress": 0
    //         }
    //     ],
    //         "totalSubjects": 3,
    //         "generatedAt": "2026-01-10T00:16:34.048Z"
    // }
    // }


    try {
        const { data } = await apiClient.get(`/api/teacher/classes/${className}/subjects`);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getStudentsByClassandSubject(className, subjectName) {
    try {
        const { data } = await apiClient.get(`/api/teacher/classes/${className}/subjects/${subjectName}/students`);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function assignGrade(payload) {
    try {
        const { data } = await apiClient.post(`/api/teacher/grades`, payload);
        console.log(data);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function publishGrade(payload) {
    try {
        const { data } = await apiClient.post(`/api/teacher/grades/publish`, payload);
        console.log(data);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function updateGrade(payload, gradeId) {
    try {
        const { data } = await apiClient.put(`/api/teacher/grades/${gradeId}`, payload);
        console.log(data);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function viewGrade(studentId) {
    // expected response:
    // {
    //     "success": true,
    //     "message": "Student grades retrieved successfully",
    //     "data": {
    //     "student": {
    //         "id": "69619964c53468428414fe98",
    //             "studentId": "268491",
    //             "firstName": "Bryan",
    //             "lastName": "Mbuemo",
    //             "fullName": "Bryan Mbuemo",
    //             "class": "JSS1",
    //             "section": "A"
    //     },
    //     "academicYear": "2026-2027",
    //         "term": "All Terms",
    //         "subject": "All Subjects",
    //         "gradesBySubject": {
    //         "Math": [
    //             {
    //                 "id": "6962543c21164cec62250132",
    //                 "subject": "Math",
    //                 "class": "JSS1",
    //                 "section": "A",
    //                 "term": "Second Term",
    //                 "academicYear": "2026-2027",
    //                 "totalScore": 175,
    //                 "totalMaxScore": 200,
    //                 "percentage": 87.5,
    //                 "letterGrade": "B+",
    //                 "gradePoints": 3.3,
    //                 "assessments": [
    //                     {
    //                         "type": "Test",
    //                         "title": "Mid-term Mathematics Test",
    //                         "score": 85,
    //                         "maxScore": 100,
    //                         "weight": 1,
    //                         "date": "2024-01-15T00:00:00.000Z",
    //                         "remarks": "Good performance in algebra",
    //                         "_id": "6962543c21164cec62250133",
    //                         "id": "6962543c21164cec62250133"
    //                     },
    //                     {
    //                         "type": "Assignment",
    //                         "title": "Homework Assignment 1",
    //                         "score": 90,
    //                         "maxScore": 100,
    //                         "weight": 1,
    //                         "date": "2024-01-20T00:00:00.000Z",
    //                         "remarks": "Excellent work",
    //                         "_id": "6962543c21164cec62250134",
    //                         "id": "6962543c21164cec62250134"
    //                     }
    //                 ],
    //                 "remarks": "Overall good performance. Needs improvement in geometry.",
    //                 "isPublished": true,
    //                 "teacher": {
    //                     "id": "69600f7dd2250cd945def81b",
    //                     "name": "Milos Kerkez"
    //                 },
    //                 "createdAt": "2026-01-10T13:29:32.744Z",
    //                 "updatedAt": "2026-01-10T13:29:47.823Z"
    //             },
    //             {
    //                 "id": "69623d3aae4ba3f66d35c1a5",
    //                 "subject": "Math",
    //                 "class": "JSS1",
    //                 "section": "",
    //                 "term": "First Term",
    //                 "academicYear": "2026-2027",
    //                 "totalScore": 80,
    //                 "totalMaxScore": 100,
    //                 "percentage": 80,
    //                 "letterGrade": "B-",
    //                 "gradePoints": 2.7,
    //                 "assessments": [
    //                     {
    //                         "type": "Test",
    //                         "title": "test test",
    //                         "score": 80,
    //                         "maxScore": 100,
    //                         "weight": 1,
    //                         "date": "2026-01-10T00:00:00.000Z",
    //                         "remarks": "test",
    //                         "_id": "69623d3aae4ba3f66d35c1a6",
    //                         "id": "69623d3aae4ba3f66d35c1a6"
    //                     }
    //                 ],
    //                 "remarks": "test test",
    //                 "isPublished": true,
    //                 "teacher": {
    //                     "id": "69600f7dd2250cd945def81b",
    //                     "name": "Milos Kerkez"
    //                 },
    //                 "createdAt": "2026-01-10T11:51:22.991Z",
    //                 "updatedAt": "2026-01-10T13:05:34.143Z"
    //             }
    //         ]
    //     },
    //     "summary": {
    //         "totalSubjects": 1,
    //             "totalGrades": 2,
    //             "publishedGrades": 2,
    //             "unpublishedGrades": 0,
    //             "gpa": 3,
    //             "averagePercentage": 83.75
    //     },
    //     "generatedAt": "2026-01-10T13:30:18.535Z"
    // }
    // }
    try {
        const { data } = await apiClient.get(`/api/teacher/students/${studentId}/grades`);
        console.log(data);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}




// New API function for dashboard data
export async function getDashboardUsers(role = '', status = '') {
    try {
        const { data } = await apiClient.get('/api/admin/dashboard/users', {
            params: {

                role: role || undefined,
                status: status || undefined
            }
        });
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// function to invite a teacher
export async function inviteTeacher(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/invite-teacher', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// function to invite a teacher
export async function inviteParent(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/invite-parent', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


// Function Returns a maximum of 10 pending invitations
export async function getInvitations() {
    try {
        const { data } = await apiClient.get('/api/school/auth/invitations?status=pending');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// function to invite a teacher
export async function resendInvitation(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/resend-invitation', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// function to invite a teacher
export async function terminateInvitation(payload) {
    try {
        const { data } = await apiClient.post('/api/school/auth/cancel-invitation', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getAllStudents() {
    try {
        const { data } = await apiClient.get('/api/students');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getAllParents() {
    try {
        const { data } = await apiClient.get('/api/parent-management/parents');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function getSchoolProfile() {
    try {
        const { data } = await apiClient.get('/api/school/profile');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function createStudent(payload) {
    try {
        const { data } = await apiClient.post('/api/students', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function deactivateSchool(payload) {
    /*
        {
          "schoolId": "SPR5866",
          "isActive": false,
          "reason": "School requested temporary suspension"
        }
    */
    try {
        const { data } = await apiClient.post('/api/school/profile/status', payload);
        console.log(data);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function reactivateSchool(payload) {
    /*
        {
          "schoolId": "SPR5866",
          "isActive": true,
          "reason": "School requested activation"
        }
    */
    try {
        const { data } = await apiClient.post('/api/school/profile/status', payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}




export async function verifySession() {
    try {
        const { data } = await apiClient.get('/api/user/auth/me');
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function updateStudent(studentId, payload) {
    try {
        const { data } = await apiClient.put(`/api/students/${studentId}`, payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function updateSchool(payload) {
    try {
        const { data } = await apiClient.put(`/api/school/profile`, payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


// Toggle User Status for Teachers and Parents
export async function toggleStatus(payload) {
    try {
        const { data } = await apiClient.post(`/api/admin/dashboard/users/toggle-status`, payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// Toggle User Status for Students
export async function toggleStudentStatus(payload) {
    try {
        const { data } = await apiClient.post(`/api/students/toggle-status`, payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

// Toggle User Status for Students
export async function deleteUser(payload) {
    try {
        const { data } = await apiClient.delete(`/api/admin/dashboard/users/remove`, {data: payload});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function deleteStudent(payload) {
    try {
        const { data } = await apiClient.delete(`/api/students/remove`, {data: payload});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export async function deleteGrade(payload, studentId) {
    try {
        const { data } = await apiClient.delete(`/api/teacher/grades/${studentId}`, {data: payload});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}




export async function linkStudentToParent(payload, parentId) {
    try {
        const { data } = await apiClient.post(`/api/parent-management/parents/${parentId}/link-students`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function unlinkStudentToParent(payload, parentId) {
    try {
        const { data } = await apiClient.post(`/api/parent-management/parents/${parentId}/unlink-students`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function assignClass(payload) {
    try {
        const { data } = await apiClient.post(`/api/admin/teachers/assign-classes`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function assignSubjects(payload) {
    try {
        const { data } = await apiClient.post(`/api/admin/teachers/assign-subjects`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}



export async function completeRegistration(payload) {
    try {
        const { data } = await apiClient.post(`/api/user/auth/complete-registration`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}


export async function updateParentProfile(payload) {
    try {
        const { data } = await apiClient.put(`/api/parent/profile`,
            payload);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}




