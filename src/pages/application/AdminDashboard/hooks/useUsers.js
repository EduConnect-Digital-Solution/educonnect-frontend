import { useState, useEffect, useMemo } from 'react';
import { getDashboardUsers } from '../services/adminService';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ role: '', status: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await getDashboardUsers(filters.role, filters.status);
                const userList = response.data.users.map(userInfo => ({
                    id: userInfo.id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    name: `${userInfo.firstName} ${userInfo.lastName}`,
                    email: userInfo.email,
                    role: userInfo.role,
                    status: userInfo.statusDisplay,
                    activityStatus: userInfo.isActive,
                    inviteSentBy: userInfo.invitedBy?.name || 'n/a'
                }));
                setUsers(userList);
            } catch (err)
 {
                console.error('Failed to fetch users:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [filters]);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        users,
        loading,
        error,
        filters,
        setFilters,
        searchQuery,
        handleSearch,
        currentPage,
        totalPages,
        currentUsers,
        goToPage,
        startIndex,
        endIndex
    };
};
