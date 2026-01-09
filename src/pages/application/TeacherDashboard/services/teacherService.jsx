// This file centralizes all API calls for the teacher dashboard feature.
// It re-exports functions from the main authAPIs services to provide
// a single point of access for all teacher-related data fetching.

export {
    getTeacherDashboard,
    getTeacherClasses,
} from '../../../auth/authAPIs.js';
