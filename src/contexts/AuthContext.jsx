import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenExpiry, setTokenExpiry] = useState(null);

    const baseURL = import.meta.env.DEV
        ? ''
        : 'https://educonnect-backend-t7j1.onrender.com';

    // Helper function to decode JWT and get expiry
    const getTokenExpiry = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000; // Convert to milliseconds
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    // Helper function to check if token is expired or will expire soon
    const isTokenExpiredOrExpiringSoon = (expiry, bufferMinutes = 5) => {
        if (!expiry) return true;
        const now = Date.now();
        const bufferTime = bufferMinutes * 60 * 1000;
        return expiry <= (now + bufferTime);
    };

    // Function to refresh access token using httpOnly cookie
    const refreshAccessToken = async (force = false) => {
        try {
            // Only refresh if token is expired/expiring soon, unless forced
            if (!force && tokenExpiry && !isTokenExpiredOrExpiringSoon(tokenExpiry)) {
                return accessToken; // Return existing token if still valid
            }

            const response = await axios.post(
                `${baseURL}/api/school/auth/refresh-token`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                const userData = response.data.data.user;
                const newToken = response.data.data.tokens.accessToken;
                const expiry = getTokenExpiry(newToken);

                setAccessToken(newToken);
                setUser(userData);
                setTokenExpiry(expiry);

                return newToken;
            }
            return null;
        } catch (error) {
            console.error('Token refresh failed:', error);
            // Only clear auth state if it's an authentication error
            if (error.response?.status === 401 || error.response?.status === 403) {
                setAccessToken(null);
                setUser(null);
                setTokenExpiry(null);
            }
            return null;
        }
    };

    // NEW: Function to check session using /auth/me endpoint
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/user/auth/me`,
                { withCredentials: true }
            );

            if (response.data.success && response.data.user) {
                const userData = response.data.user;

                // Set user data from /auth/me response
                setUser(userData);

                // Note: /auth/me doesn't return accessToken, so we'll get it on first API call
                // The axios interceptor will handle getting a fresh token when needed
                setAccessToken('session-valid'); // Placeholder to indicate valid session

                return true;
            }

            return false;
        } catch (error) {
            console.error('Auth check failed:', error);
            // Clear state on authentication errors
            if (error.response?.status === 401 || error.response?.status === 403) {
                setAccessToken(null);
                setUser(null);
                setTokenExpiry(null);
            }
            return false;
        }
    };

    // Function to get a valid access token (refreshes if needed)
    const getValidAccessToken = async () => {
        // If we don't have a token or it's expired, refresh it
        if (!accessToken || accessToken === 'session-valid' ||
            (tokenExpiry && isTokenExpiredOrExpiringSoon(tokenExpiry))) {
            return await refreshAccessToken(true);
        }

        return accessToken;
    };

    // Login function
    const login = async (loginData) => {
        const token = loginData.data.tokens.accessToken;
        const expiry = getTokenExpiry(token);

        setAccessToken(token);
        setUser(loginData.data.user);
        setTokenExpiry(expiry);
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post(`${baseURL}/api/school/auth/logout`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAccessToken(null);
            setUser(null);
            setTokenExpiry(null);
        }
    };

    // UPDATED: Check auth status only once on app load using /auth/me
    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const isAuthenticated = await checkAuthStatus();

                if (mounted) {
                    setLoading(false);
                }
            } catch (error) {
                if (mounted) {
                    console.error('Initial auth check failed:', error);
                    setLoading(false);
                }
            }
        };

        initAuth();

        return () => {
            mounted = false;
        };
    }, []); // Only run once on mount

    // Set up automatic token refresh before expiry
    useEffect(() => {
        if (!tokenExpiry || !accessToken || accessToken === 'session-valid') return;

        const timeUntilExpiry = tokenExpiry - Date.now();
        const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 1000);

        const timer = setTimeout(() => {
            refreshAccessToken(true);
        }, refreshTime);

        return () => clearTimeout(timer);
    }, [tokenExpiry, accessToken]);

    const value = {
        user,
        accessToken,
        loading,
        login,
        logout,
        refreshAccessToken,
        checkAuthStatus,
        getValidAccessToken,
        isAuthenticated: !!user && !!accessToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};