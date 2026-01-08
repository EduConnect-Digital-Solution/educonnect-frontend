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
export async function getDashboardUsers(role = '', status = '') {
    try {
        const { data } = await apiClient.get('/api/admin/dashboard/users', {
            params: {
                // If a value is empty, Axios usually omits it or sends it as empty.
                // We can use undefined to ensure the key isn't sent at all if empty.
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
        const { data } = await apiClient.get('/api/school/auth/me');
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


