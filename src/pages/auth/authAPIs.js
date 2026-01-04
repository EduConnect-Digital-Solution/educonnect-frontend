import axios from 'axios';

// TODO: prevent APIs responses from showing in browser inspect

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


export async function LoginSchool(payload) {
    try {
        const {data} = await axios.post(
            '/api/school/auth/login',
            payload,
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
        return data;
    } catch (error) {
        // normalize and rethrow so callers can show a toast
        throw error?.response?.data || error;
    }
}


export async function verifyOTP(payload) {
    try {
        const {data} = await axios.post(
            'https://educonnect-backend-t7j1.onrender.com/api/school/auth/verify-email',
            payload,
            {headers: {'Content-Type': 'application/json'}}
        );
        console.log(data);
        return data;
    } catch (error) {
        // normalize and rethrow so callers can show a toast
        throw error?.response?.data || error;
    }
}

export async function resendOTP(payload) {
    try {
        const {data} = await axios.post(
            'https://educonnect-backend-t7j1.onrender.com/api/school/auth/resend-otp',
            payload,
            {headers: {'Content-Type': 'application/json'}}
        );
        console.log(data);
        return data;
    } catch (error) {
        // normalize and rethrow so callers can show a toast
        throw error?.response?.data || error;
    }
}