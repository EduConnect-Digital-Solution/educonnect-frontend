
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
        const bufferTime = bufferMinutes * 60 * 1000; // Convert to milliseconds
        return expiry <= (now + bufferTime);
    };

    // Function to refresh access token using httpOnly cookie
    const refreshAccessToken = async (force = false) => {
        try {
            // Only refresh if token is expired/expiring soon, unless forced
            if (!force && tokenExpiry && !isTokenExpiredOrExpiringSoon(tokenExpiry)) {
                return accessToken; // Return existing token if still valid
            }

            // console.log('Refreshing access token...');
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

                // console.log('Token refreshed successfully');
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

    // Function to check if user has a valid session
    const checkAuthStatus = async () => {
        try {
            setLoading(true);

            // First, try to refresh token to see if we have a valid session
            const token = await refreshAccessToken(true); // Force refresh to check session

            if (token) {
                // console.log('Valid session found');
                return true;
            } else {
                // console.log('No valid session');
                return false;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Function to get a valid access token (refreshes if needed)
    const getValidAccessToken = async () => {
        if (!accessToken || !tokenExpiry) {
            return await refreshAccessToken(true);
        }

        if (isTokenExpiredOrExpiringSoon(tokenExpiry)) {
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

        // console.log('User logged in successfully');
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post(`${baseURL}/api/school/auth/logout`, {}, {
                withCredentials: true
            });
            // console.log('Logout API called successfully');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAccessToken(null);
            setUser(null);
            setTokenExpiry(null);
            // console.log('Auth state cleared');
        }
    };

    // Check auth status only once on app load
    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                // Only check auth status if we don't already have a valid token
                if (!accessToken || !tokenExpiry || isTokenExpiredOrExpiringSoon(tokenExpiry)) {
                    const isAuthenticated = await checkAuthStatus();
                    if (mounted) {
                        // console.log('Initial auth check completed:', isAuthenticated);
                    }
                } else {
                    // We already have a valid token, just stop loading
                    setLoading(false);
                    // console.log('Using existing valid token');
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
        if (!tokenExpiry || !accessToken) return;

        const timeUntilExpiry = tokenExpiry - Date.now();
        const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 1000); // Refresh 5 minutes before expiry, minimum 1 second

        const timer = setTimeout(() => {
            // console.log('Auto-refreshing token before expiry');
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
        getValidAccessToken, // New function to get valid token
        isAuthenticated: !!accessToken && !!user && tokenExpiry && !isTokenExpiredOrExpiringSoon(tokenExpiry)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};