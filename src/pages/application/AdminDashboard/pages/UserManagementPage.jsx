import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useUsers } from '../hooks/useUsers';
import UserTableLayout from '../components/users/UserTable';
import UserFilter from '../components/users/UserFilter';

import {
    DeleteUserModal,
    InviteParentModal,
    InviteTeacherModal,
    StatusChangeModal,
    ManageParentStudentLinkModal,
    AssignStudentsToTeacherModal,
    UnassignStudentFromTeacherModal,
    AssignClassesModal
} from "../components/ui/modals.jsx";
import { Toast } from "../components/ui/Toast.jsx";
import { useAuth } from "../../../../contexts/AuthContext.jsx";

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

    const { user } = useAuth();
    const [userToDelete, setUserToDelete] = useState(null);
    const [statusChangeUser, setStatusChangeUser] = useState(null);
    const [addUserRole, setAddUserRole] = useState(null);
    const [viewTeacher, setViewTeacher] = useState(false);
    const [viewParent, setViewParent] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    // State for all modals
    const [showManageLinksModal, setShowManageLinksModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showUnassignModal, setShowUnassignModal] = useState(false);
    const [showAssignClassesModal, setShowAssignClassesModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedParent, setSelectedParent] = useState(null);

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAddNew = (role) => {
        setAddUserRole(role);
        if (role === 'Teacher') {
            setViewTeacher(true)
        } else if (role === 'Parent') {
            setViewParent(true)
        }
    };
    
    const handleDelete = (user) => {
        setUserToDelete(user);
    };
    
    const handleStatusChange = (user) => {
        setStatusChangeUser(user);
    };
    
    const handleOpenAssignModal = (teacher) => {
        setSelectedTeacher(teacher);
        setShowAssignModal(true);
    };
    
    const handleOpenUnassignModal = (teacher) => {
        setSelectedTeacher(teacher);
        setShowUnassignModal(true);
    };

    const handleOpenAssignClassesModal = (teacher) => {
        setSelectedTeacher(teacher);
        setShowAssignClassesModal(true);
    };

    const handleOpenManageLinksModal = (parent) => {
        setSelectedParent(parent);
        setShowManageLinksModal(true);
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
                onAssignStudents={handleOpenAssignModal}
                onUnassignStudents={handleOpenUnassignModal}
                onAssignClasses={handleOpenAssignClassesModal}
                onManageParentLinks={handleOpenManageLinksModal}
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
            </UserTableLayout>

            {viewTeacher && <InviteTeacherModal onClose={() => setViewTeacher(false)} showToast={showToast} />}
            {viewParent && <InviteParentModal onClose={() => setViewParent(false)} showToast={showToast} />}

            {statusChangeUser && <StatusChangeModal
                onClose={() => setStatusChangeUser(null)}
                showToast={showToast}
                user={statusChangeUser}
                schoolId={user.schoolId}
            />}

            {userToDelete && <DeleteUserModal
                onClose={() => setUserToDelete(null)}
                showToast={showToast}
                user={userToDelete}
                schoolId={user.schoolId}
            />}

            {showManageLinksModal && <ManageParentStudentLinkModal
                onClose={() => setShowManageLinksModal(false)}
                showToast={showToast}
                parent={selectedParent}
                schoolId={user.schoolId}
            />}

            {showAssignModal && selectedTeacher && <AssignStudentsToTeacherModal
                onClose={() => setShowAssignModal(false)}
                showToast={showToast}
                teacher={selectedTeacher}
                schoolId={user.schoolId}
            />}

            {showUnassignModal && selectedTeacher && <UnassignStudentFromTeacherModal
                onClose={() => setShowUnassignModal(false)}
                showToast={showToast}
                teacher={selectedTeacher}
                schoolId={user.schoolId}
            />}
            
            {showAssignClassesModal && selectedTeacher && <AssignClassesModal
                onClose={() => setShowAssignClassesModal(false)}
                showToast={showToast}
                teacher={selectedTeacher}
                schoolId={user.schoolId}
            />}
        </AdminLayout>
    );
};

export default UserManagementPage;