import axios from 'axios';

export async function RegSchool(payload) {
    try {
        const { data } = await axios.post(
            'https://educonnect-backend-t7j1.onrender.com/api/school/auth/register',
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return data;
    } catch (error) {
        // normalize and rethrow so callers can show a toast
        throw error?.response?.data || error;
    }
}