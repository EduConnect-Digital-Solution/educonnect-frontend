import React, { Fragment, useState } from 'react';
import { Search, Filter, ArrowDownUp, ChevronLeft, ChevronRight, X, UserCircle2, Plus, Trash2  } from 'lucide-react';
import {Header} from "../../dashboardUtilities.jsx";
import {Sidebar} from "../adminUtils/a_utils.jsx";

// Helper to get initials for avatar fallback
const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};
// TODO: change user management drop down to view teachers, parents, students
// Helper to get role badge styling
const getRoleBadgeStyle = (role) => {
    const styles = {
        Teacher: 'bg-blue-100 text-blue-700',
        Parent: 'bg-purple-100 text-purple-700',
        Admin: 'bg-red-100 text-red-700',
        Student: 'bg-green-100 text-green-700'
    };
    return styles[role] || 'bg-gray-100 text-gray-700';
};

// Helper to get status badge styling
const getStatusBadgeStyle = (status) => {
    const styles = {
        Active: 'bg-green-100 text-green-700',
        Inactive: 'bg-gray-100 text-gray-700',
        Suspended: 'bg-red-100 text-red-700',
        Pending: 'bg-yellow-100 text-yellow-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
};

// Mock users data - replace with your actual data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@school.com', role: 'Parent', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@parent.com', role: 'Parent', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Michael Brown', email: 'mbrown@school.com', role: 'Parent', status: 'Active', lastLogin: '3 hours ago' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah.j@parent.com', role: 'Parent', status: 'Inactive', lastLogin: '2 weeks ago' },
    { id: 5, name: 'David Wilson', email: 'dwilson@school.com', role: 'Parent', status: 'Active', lastLogin: '30 mins ago' }
];

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);


const ParentsList = () => {
    const [statusChangeUser, setStatusChangeUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');
    const [showAddUserDropdown, setShowAddUserDropdown] = useState(false);
    const [viewUser, setViewUser] = useState(null);

    // Items per page
    const itemsPerPage = 8;

    // Filter users based on search
    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Handle page changes
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset to page 1 when search changes
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleRemoveUser = (user) => {
        // Add your remove logic here
        console.log('Remove user:', user);
        if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
            alert(`User ${user.name} has been removed`);
        }
    };

    const handleChangeStatus = (user) => {
        setStatusChangeUser(user);
    };

    const confirmStatusChange = (newStatus) => {
        console.log('Change status for:', statusChangeUser, 'to:', newStatus);
        alert(`Status changed to: ${newStatus} for ${statusChangeUser.name}`);
        setStatusChangeUser(null);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed */}
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header - Fixed */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-6 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                        {/* Header Section */}
                        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Parent Management Table</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} parents
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowAddUserDropdown(!showAddUserDropdown)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                                    >
                                        <Plus size={18} />
                                        Add New Parent
                                    </button>

                                    {showAddUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                                            {['Teacher', 'Parent'].map((role) => (
                                                <button
                                                    key={role}
                                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                    onClick={() => {
                                                        console.log(`Maps to add ${role}`);
                                                        setShowAddUserDropdown(false);
                                                    }}
                                                >
                                                    Add {role}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Search Bar */}
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search parents..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* Actions */}
                                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Filter size={20} />
                                </button>
                                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowDownUp size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 sticky top-0">
                                <tr>
                                    {['S/N', 'Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((header) => (
                                        <th key={header} className="p-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600">{startIndex + index + 1}.</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                        <span className="text-xs font-medium text-gray-600">{getInitials(user.name)}</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
                                            <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(user.role)} whitespace-nowrap`}>
                                                        {user.role}
                                                    </span>
                                            </td>
                                            <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(user.status)} whitespace-nowrap`}>
                                                        {user.status}
                                                    </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.lastLogin}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setViewUser(user)}
                                                        className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleChangeStatus(user)}
                                                        className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        Change Status
                                                    </button>
                                                    <button
                                                        onClick={() => setUserToDelete(user)} // Changed from handleRemoveUser(user)
                                                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-gray-500">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section */}
                        <div className="p-4 flex justify-center items-center gap-4 border-t border-gray-100 flex-shrink-0">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, index) => (
                                    page === '...' ? (
                                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/*View Details Modal*/}
            {viewUser && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div
                            className="fixed inset-0 bg-black/30"
                            onClick={() => setViewUser(null)}
                        />

                        <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                            {/* Close Button */}
                            <button
                                onClick={() => setViewUser(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <UserCircle2 className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Parent Details</h3>
                                    <p className="text-sm text-gray-500">{viewUser.email}</p>
                                </div>
                            </div>

                            {/* Form */}
                            <form className="space-y-5">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" defaultValue={viewUser.firstName} />
                                    <Input label="Last Name" defaultValue={viewUser.lastName} />
                                </div>

                                <Input label="Email" defaultValue={viewUser.email} />
                                <Input label="School ID" defaultValue={viewUser.schoolId} />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Phone" defaultValue={viewUser.phone} />
                                    <Input label="Occupation" defaultValue={viewUser.occupation} />
                                </div>

                                <Input label="Address" defaultValue={viewUser.address} />

                                {/* Emergency */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Emergency Contact" defaultValue={viewUser.emergencyContact} />
                                    <Input label="Emergency Phone" defaultValue={viewUser.emergencyPhone} />
                                </div>

                                {/* Parent Linking */}
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                        Linked Students
                                    </h4>

                                    {/* Existing Parent IDs */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {viewUser.parentIds?.length ? (
                                            viewUser.parentIds.map((id, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
                                                >
                                                    {id}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            // handleUnlinkParent(id)
                                                        }}
                                                        className="text-blue-500 hover:text-red-500"
                                                    >
                                                      <X size={12} />
                                                    </button>
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">No students linked</p>
                                        )}
                                    </div>

                                    {/* Add Student ID */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter Student ID"
                                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            // onChange={...}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // handleLinkParent()
                                            }}
                                            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Link
                                        </button>
                                    </div>
                                </div>

                                {/* Password Reset */}
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                        Reset Password
                                    </h4>
                                    <Input label="New Password" type="password" placeholder="Enter new password" />
                                </div>

                                {/* Meta (Read Only) */}
                                <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Last Login</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {viewUser.lastLogin || 'Never'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Parent Status</p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                                                viewUser.status
                                            )}`}
                                        >
                                            {viewUser.status}
                                      </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setViewUser(null)}
                                        className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Status Modal */}
            {statusChangeUser && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/30" onClick={() => setStatusChangeUser(null)} />
                        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <button
                                onClick={() => setStatusChangeUser(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <UserCircle2 className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Change User Status</h3>
                                        <p className="text-sm text-gray-500">{statusChangeUser.name}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-3">Current Status:</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(statusChangeUser.status)}`}>
                                        {statusChangeUser.status}
                                    </span>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-3">Select New Status:</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Active', 'Inactive', 'Suspended', 'Pending'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => confirmStatusChange(status)}
                                                disabled={statusChangeUser.status === status}
                                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                                    statusChangeUser.status === status
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setUserToDelete(null)} />
                        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <Trash2 className="w-8 h-8 text-red-600" />
                                </div>

                                <h3 className="text-xl font-black text-gray-900 mb-2">Confirm Removal</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Are you sure you want to delete <span className="font-bold text-gray-800">{userToDelete.name}</span>?
                                    This action is permanent and cannot be undone.
                                </p>

                                <div className="w-full text-left mb-6">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        Reason for removal
                                    </label>
                                    <textarea
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                        rows="3"
                                        placeholder="Please provide a reason for deleting this account..."
                                        value={deleteReason}
                                        onChange={(e) => setDeleteReason(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setUserToDelete(null)}
                                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={!deleteReason.trim()}
                                        onClick={() => {
                                            console.log(`Deleting ${userToDelete.id} for: ${deleteReason}`);
                                            setUserToDelete(null);
                                            setDeleteReason('');
                                        }}
                                        className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentsList;