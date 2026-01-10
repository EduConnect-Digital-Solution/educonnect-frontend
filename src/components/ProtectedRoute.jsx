// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // No explicit loading state here, relying solely on isAuthenticated from AuthContext

    if (!isAuthenticated) {
        // Redirect to login with return URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        // Redirect to appropriate dashboard if role doesn't match
        return <Navigate to={`/dashboard/${user.role}`} replace />;
    }

    return children;
};

export default ProtectedRoute;