import React, { useState } from 'react';
import { X, UserCircle2, Trash2 } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import { useUsers } from '../hooks/useUsers';
import UserTableLayout from '../components/users/UserTable';
import UserFilter from '../components/users/UserFilter';

import {
    DeleteUserModal,
    InviteParentModal,
    InviteTeacherModal,
    StatusChangeModal,
    ManageParentStudentLinkModal
} from "../components/ui/modals.jsx";
import {Toast} from "../components/ui/Toast.jsx";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
// The modal for adding/editing users would be complex, so for this refactor,
// the logic is simplified here. In a real app, this would be a separate component.

/* TODO:
*   1) Implement Assign / Unassign Classes to Teacher
*   2) Implement Assign / Unassign Student to Teacher
*   3) Implement Assign / Unassign Subject to Teacher
* */


const UserManagementPage = () => {
    const {
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
    } = useUsers();

    const {user} = useAuth();
    const [userToDelete, setUserToDelete] = useState(null);
    const [statusChangeUser, setStatusChangeUser] = useState(null);
    const [addUserRole, setAddUserRole] = useState(null);
    const [showManageLinksModal, setShowManageLinksModal] = useState(false);
    const [statusChangeReason, setStatusChangeReason] = useState('');
    const [viewTeacher, setViewTeacher] = useState(false);
    const [viewParent, setViewParent] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAddNew = (role) => {
        // Logic to open a modal for adding a new user
        setAddUserRole(role);
        if (role === 'Teacher'){
            setViewTeacher(true)
        } else if (role === 'CompleteRegistration'){
            setViewParent(true)
        }
    };
    
    const handleDelete = (user) => {
        setUserToDelete(user);
    };
    
    const handleStatusChange = (user) => {
        setStatusChangeUser(user);
    };

    const confirmStatusChange = (newStatus) => {
        console.log('Change status for:', statusChangeUser, 'to:', newStatus);
        alert(`Status changed to: ${newStatus} for ${statusChangeUser.name}`);
        setStatusChangeUser(null);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        );
    }
    
    if (error) {
        return <AdminLayout><div className="text-center py-8 text-red-500">Failed to load users.</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            <UserTableLayout
                users={currentUsers}
                startIndex={startIndex}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            >
                <UserFilter
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onAddNew={handleAddNew}
                    totalUsers={users.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setShowManageLinksModal(true)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Manage Parent-Student Links
                    </button>
                </div>
            </UserTableLayout>


            {viewTeacher && <InviteTeacherModal onClose={() => setViewTeacher(false)} showToast={showToast} />}
            {viewParent && <InviteParentModal onClose={() => setViewParent(false)} showToast={showToast} />}


            {/* Change Status Modal */}
            {statusChangeUser && <StatusChangeModal
                onClose={() => setStatusChangeUser(null)}
                showToast={showToast}
                user={statusChangeUser}
                schoolId={user.schoolId}
            />}

            {/* Delete Confirmation Modal */}
            {userToDelete && <DeleteUserModal
                onClose={() => setUserToDelete(null)}
                showToast={showToast}
                user={userToDelete}
                schoolId={user.schoolId}
            />}

            {/* Manage Parent-Student Links Modal */}
            {showManageLinksModal && <ManageParentStudentLinkModal
                onClose={() => setShowManageLinksModal(false)}
                showToast={showToast}
                schoolId={user.schoolId}
            />}
        </AdminLayout>
    );
};

export default UserManagementPage;
