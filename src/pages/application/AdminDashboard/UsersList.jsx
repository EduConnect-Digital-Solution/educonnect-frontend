import React, {Fragment, useEffect, useRef, useState} from 'react';
import { Search, Filter, ArrowDownUp, ChevronLeft, ChevronRight, X, UserCircle2, Plus, Trash2  } from 'lucide-react';
import {availableSubjects, Input, Sidebar} from "./adminUtils/a_utils.jsx";
import {Header} from "../dashboardUtilities.jsx";
import {createStudent, getAllStudents, getDashboardUsers, inviteParent, inviteTeacher} from "../../auth/authAPIs.js";
import {Toast} from "../../../components/Toast.jsx";
import {useAuth} from "../../../contexts/AuthContext.jsx";

// Helper to get initials for avatar fallback
const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const getRoleBadgeStyle = (role) => {
    const styles = {
        teacher: 'bg-blue-100 text-blue-700',
        parent: 'bg-purple-100 text-purple-700',
        admin: 'bg-red-100 text-red-700',
        student: 'bg-green-100 text-green-700'
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

const UserList = () => {
    const user = useAuth();

    const [statusChangeUser, setStatusChangeUser] = useState(null);
    const inputRef = useRef(null);
    const [viewTeacher, setViewTeacher] = useState(false);
    const [viewParent, setViewParent] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');
    const [showAddUserDropdown, setShowAddUserDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mockUsers, setMockUsers] = useState([]);
    const [userStatuses, setUserStatuses] = useState([]);
    const [filters, setFilters] = useState({ role: '', status: '' });
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [studentsToSubmit, setStudentsToSubmit] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [allStudentsList, setAllStudentsList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const itemsPerPage = 8;
    const handleChangeStatus = (user) => { setStatusChangeUser(user); };
    // Filter users based on search

    useEffect( () => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const getUsers = await getDashboardUsers(filters.role, filters.status)

                // setUserStatuses([...new Set(getUsers.data.users.map(user => user.statusDisplay))]);


                const userList = getUsers.data.users.map(userInfo => ({
                    id: userInfo.id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    name: userInfo.firstName + " " + userInfo.lastName,
                    email: userInfo.email,
                    role: userInfo.role,
                    status: userInfo.statusDisplay,
                    activityStatus: userInfo.isActive === true ? 'activate' : userInfo.isActive === false ? 'deactivate' : 'Unknown',
                    inviteSentBy: userInfo.invitedBy?.name || 'n/a'
                }))
                setMockUsers(userList)

                if (!filters.role && !filters.status) {
                    const uniqueStatuses = [...new Set(getUsers.data.users.map(u => u.statusDisplay))];
                    setUserStatuses(uniqueStatuses);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            }finally {
                setLoading(false);
            }
        }
        fetchUsers()
    }, [filters]);




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



    const QuickActionCard = ({ title, description, buttonText, icon: Icon, colorClass, buttonFunction }) => (
        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${colorClass} transition-transform group-hover:scale-110`}>
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-xs mb-3 leading-relaxed">{description}</p>
                    <button
                        onClick={buttonFunction}
                        className="w-full py-2 text-xs font-bold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );


    const [teacherFormData, setTeacherFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subjects: [''],
        message: '',
    });
    const [parentFormData, setParentFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        studentIds: [''],
        message: '',
    });
    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };
    const handleInviteTeacher = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation Checks
        if (!teacherFormData?.firstName) {
            showToast("Please input first name");
            return;
        }

        if (!teacherFormData?.lastName) {
            showToast("Please input last name");
            return;
        }

        if (!teacherFormData?.subjects || teacherFormData.subjects.length === 0) {
            showToast("Please add at least 1 subject");
            return;
        }
        if (!teacherFormData?.message) {
            showToast("Please input an invitation message");
            return;
        }

        if (!teacherFormData?.email || !emailPattern.test(teacherFormData.email)) {
            showToast("Please provide a valid email address.");
            return;
        }

        const payload = {
            email: teacherFormData.email.trim().toLowerCase(),
            firstName: teacherFormData.firstName.trim(),
            lastName: teacherFormData.lastName.trim(),
            subjects: subjects,
            message: teacherFormData.message.trim(),
        };

        try {
            await inviteTeacher(payload);
            showToast('Teacher invited successfully', 'success');
            setViewTeacher(false)
        } catch (err) {
            const message = err?.message || err?.error || 'Registration failed';
            showToast(message, 'error');
        }
    };
    const handleInviteParent = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation Checks
        if (!parentFormData?.email || !emailPattern.test(parentFormData.email)) {
            showToast("Please provide a valid email address.");
            return;
        }

        if (!parentFormData?.firstName) {
            showToast("Please input first name");
            return;
        }

        if (!parentFormData?.lastName) {
            showToast("Please input last name");
            return;
        }

        if (!parentFormData?.studentIds || parentFormData.studentIds.length === 0) {
            showToast("Please add at least 1 student");
            return;
        }
        if (!parentFormData?.message) {
            showToast("Please input an invitation message");
            return;
        }

        const stud_list = selectedStudents.map(student => {
            return student.id
        })
        if (stud_list.length !== 0) {
            setStudentsToSubmit(stud_list)
        }

        const payload = {
            email: parentFormData.email.trim().toLowerCase(),
            firstName: parentFormData.firstName.trim(),
            lastName: parentFormData.lastName.trim(),
            studentIds: studentsToSubmit,
            message: parentFormData.message.trim(),
        };

        console.log(payload)

        try {
            await inviteParent(payload);
            showToast('Parent invited successfully', 'success');
            setViewTeacher(false)
        } catch (err) {
            const message = err?.message || err?.error || 'Registration failed';
            showToast(message, 'error');
        }
    };


    // Filter subjects based on input
    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = availableSubjects.filter(subject =>
                subject.toLowerCase().includes(inputValue.toLowerCase()) &&
                !subjects.includes(subject)
            );
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects(availableSubjects.filter(s => !subjects.includes(s)));
        }
    }, [inputValue, subjects]);

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())||
        user.activityStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);
    const handleAddSubject = (subject) => {
        if (subject.trim() && !subjects.includes(subject)) {
            setSubjects([...subjects, subject]);
            setInputValue('');
            setShowDropdown(false);
            inputRef.current?.focus();
        }

    };

    // This creates a filtered list based on what the user types
    const filteredStudents = allStudentsList.filter((student) => {
        const searchTerm = inputValue.toLowerCase();
        return (
            student.fullName.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            (student.studentId && student.studentId.toLowerCase().includes(searchTerm))
        );
    });

    const handleRemoveSubject = (subjectToRemove) => {
        setSubjects(subjects.filter(subject => subject !== subjectToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSubject(inputValue);
        }
    };

    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    const handleInputBlur = () => {
        // Delay closing dropdown to allow dropdown click to register
        setTimeout(() => setShowDropdown(false), 200);
    };

    const fetchAllStudents = async () => {
        const response = await getAllStudents();
        setAllStudentsList(response.data.students);
    }

    // 1. Rename your state for clarity
    const [selectedStudents, setSelectedStudents] = useState([]);

    // 2. Handle Adding a Student
    const handleAddStudent = (student) => {
        const isAlreadyAdded = selectedStudents.some(s => s.id === student.id);

        if (!isAlreadyAdded) {
            setSelectedStudents([...selectedStudents, student]);
        }

        // RESET everything after selection
        setInputValue('');
        setShowDropdown(false);
        if (inputRef.current) inputRef.current.blur();
    };

    // 3. Handle Removing a Student
    const handleRemoveStudent = (studentToRemove) => {
        setSelectedStudents((prev) =>
            prev.filter((s) => s.id !== studentToRemove.id)
        );
    };

    // 4. Handle Enter Key on Input
    const handleStudentKeyDown = (e) => {
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     if (filteredStudents.length > 0) {
        //         handleAddStudent(filteredStudents[0]);
        //     }
        // }
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            {/* Sidebar - Fixed */}
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header - Fixed */}
                <Header />

                {/* Main Content */}

                    <main className="flex-1 p-6 flex flex-col">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                            {/* Header Section */}

                            {loading && (
                                <div className="min-h-screen flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                                </div>
                            )}
                            {!loading && (
                                <>
                                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 flex-shrink-0">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowAddUserDropdown(!showAddUserDropdown)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                                                >
                                                    <Plus size={18} />
                                                    Add New User
                                                </button>

                                                {showAddUserDropdown && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                                                        {['Teacher', 'Parent'].map((role) => (
                                                            <button
                                                                key={role}
                                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                                onClick={() => {
                                                                    if (role === 'Teacher') {
                                                                        setViewTeacher(true)
                                                                    }else{
                                                                        fetchAllStudents()
                                                                        setViewParent(true)
                                                                    }
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
                                                    placeholder="Search users..."
                                                    value={searchQuery}
                                                    onChange={handleSearch}
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                />
                                            </div>

                                            {/* Actions */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                                    className={`p-2 rounded-lg transition-colors ${showFilterDropdown ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                                                >
                                                    <Filter size={20} />
                                                </button>

                                                {showFilterDropdown && (
                                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4">
                                                        <div className="space-y-4">
                                                            {/* Role Filter */}
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role</label>
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {['admin', 'teacher', 'parent'].map((role) => (
                                                                        <button
                                                                            key={role}
                                                                            onClick={() => setFilters(prev => ({ ...prev, role: prev.role === role ? '' : role }))}
                                                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filters.role === role ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                                                        >
                                                                            {role}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Status Filter */}
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {userStatuses.map((statusDisplayName) => {
                                                                        // We send this to the API (e.g., "pending registration" -> "pending")
                                                                        // Note: You might need a more specific mapping if your API is strict
                                                                        const apiValue = statusDisplayName.toLowerCase();

                                                                        return (
                                                                            <button
                                                                                key={statusDisplayName}
                                                                                onClick={() => {
                                                                                    setFilters(prev => ({
                                                                                        ...prev,
                                                                                        // If already selected, clear it. Otherwise, set to lowercase value.
                                                                                        status: prev.status === apiValue ? '' : apiValue
                                                                                    }));
                                                                                }}
                                                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                                                    filters.status === apiValue
                                                                                        ? 'bg-blue-600 text-white'
                                                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                                                }`}
                                                                            >
                                                                                {statusDisplayName}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
                                                                <button
                                                                    onClick={() => setFilters({ role: '', status: '' })}
                                                                    className="text-xs text-red-500 hover:underline"
                                                                >
                                                                    Clear All
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table Section */}
                                    <div className="flex-1 overflow-y-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-gray-50/50 sticky top-0">
                                            <tr>
                                                {['S/N', 'Name', 'Email', 'Role', 'Status', 'Invited By', 'Actions'].map((header) => (
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
                                                        <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.inviteSentBy}</td>
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-2">
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
                                                        No users found.
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
                                </>
                            )}

                        </div>
                    </main>


                {viewTeacher && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/30"
                                onClick={() => setViewTeacher(false)}
                            />

                            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                                {/* Close */}
                                <button
                                    onClick={() => setViewTeacher(false)}
                                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                >
                                    <X size={20} />
                                </button>

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Invite Teacher</h3>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-5">
                                    {/* Names */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            value={teacherFormData.firstName}
                                            onChange={(e) => setTeacherFormData({...teacherFormData, firstName: e.target.value})}
                                            placeholder="e.g. John"
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            value={teacherFormData.lastName}
                                            onChange={(e) => setTeacherFormData({...teacherFormData, lastName: e.target.value})}
                                            placeholder="e.g. Doe"
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        value={teacherFormData.email}
                                        onChange={(e) => setTeacherFormData({...teacherFormData, email: e.target.value})}
                                        placeholder="teacher@school.com"
                                    />

                                    {/* Subjects */}
                                    <div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Subjects
                                            </label>

                                            {/* Selected Subjects */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {subjects.map((subject) => (
                                                    <div
                                                        key={subject}
                                                        className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded-lg"
                                                    >
                                                        <span>{subject}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSubject(subject)}
                                                            className="hover:text-blue-900 transition-colors"
                                                            aria-label={`Remove ${subject}`}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Input and Dropdown Container */}
                                            <div className="relative">
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    placeholder="Add subject and press Enter"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    onFocus={handleInputFocus}
                                                    onBlur={handleInputBlur}
                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                />

                                                {/* Dropdown List */}
                                                {showDropdown && filteredSubjects.length > 0 && (
                                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-sm z-10">
                                                        {filteredSubjects.map((subject) => (
                                                            <button
                                                                key={subject}
                                                                type="button"
                                                                onClick={() => {
                                                                    handleAddSubject(subject);

                                                                    if (inputRef.current) {
                                                                        inputRef.current.blur();
                                                                    }
                                                                }}
                                                                className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-700"
                                                            >
                                                                {subject}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* No results message */}
                                                {showDropdown && inputValue.trim() && filteredSubjects.length === 0 && (
                                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-sm z-10 p-3">
                                                        <p className="text-xs text-gray-500">
                                                            No matching subjects. Press Enter to add "{inputValue}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Invitation Message */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Invitation Message
                                        </label>
                                        <textarea
                                            value={teacherFormData.message}
                                            onChange={(e) => setTeacherFormData({...teacherFormData, message: e.target.value})}
                                            placeholder="Write a brief invitation message..."
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setViewTeacher(false)}
                                            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleInviteTeacher}
                                            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Send Invite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewParent && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/30"
                                onClick={() => setViewParent(false)}
                            />

                            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                                {/* Close */}
                                <button
                                    onClick={() => setViewParent(false)}
                                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                >
                                    <X size={20} />
                                </button>

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Invite Parent</h3>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-5">
                                    {/* Names */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            value={parentFormData.firstName}
                                            onChange={(e) => setParentFormData({...parentFormData, firstName: e.target.value})}
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            value={parentFormData.lastName}
                                            onChange={(e) => setParentFormData({...parentFormData, lastName: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        value={parentFormData.email}
                                        onChange={(e) => setParentFormData({...parentFormData, email: e.target.value})}
                                    />

                                    {/* Subjects */}
                                    <div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Children (Students)
                                            </label>

                                            {/* Selected Students (The "Pills") */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {selectedStudents.map((student) => (
                                                    <div
                                                        key={student.id}
                                                        className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded-lg animate-in fade-in zoom-in duration-200"
                                                    >
                                                        <span className="font-medium">
                                                            {`${student.firstName} ${student.lastName}`}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveStudent(student)}
                                                            className="hover:text-blue-900 transition-colors p-0.5 rounded-full hover:bg-blue-100"
                                                            aria-label={`Remove ${student.firstName} ${student.lastName}`}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Input and Dropdown Container */}
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <Search size={16} className="text-gray-400" />
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    placeholder="Search for a student to add..."
                                                    value={inputValue}
                                                    onChange={(e) => {
                                                        setInputValue(e.target.value);
                                                        if (!showDropdown) setShowDropdown(true);
                                                    }}
                                                    onKeyDown={handleStudentKeyDown} // Now only prevents default Enter behavior
                                                    onFocus={handleInputFocus}       // Triggers list on click
                                                    onBlur={handleInputBlur}        // Closes with the timeout you set earlier
                                                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                />

                                                {/* Dropdown List - Now shows even when empty */}
                                                {showDropdown && (
                                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                                                        {filteredStudents.length > 0 ? (
                                                            filteredStudents.map((student) => (
                                                                <button
                                                                    key={student.id}
                                                                    type="button"
                                                                    // User MUST click here to add
                                                                    onClick={() => handleAddStudent(student)}
                                                                    className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-gray-700 font-medium group-hover:text-blue-700">
                                                                            {student.fullName}
                                                                        </span>
                                                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                                                                            {student.studentId} • {student.class}
                                                                        </span>
                                                                    </div>
                                                                    <Plus size={14} className="text-gray-300" />
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <div className="p-4 text-center text-sm text-gray-500">
                                                                No matching students found
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Invitation Message */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Invitation Message
                                        </label>
                                        <textarea
                                            value={parentFormData.message}
                                            onChange={(e) => setParentFormData({...parentFormData, message: e.target.value})}
                                            placeholder="Write a brief invitation message..."
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setViewParent(false)}
                                            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleInviteParent}
                                            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Send Invite
                                        </button>
                                    </div>
                                </div>
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

                                    <div className="w-full text-left mb-6">
                                        <label className="text-sm font-semibold text-gray-700 mb-2">
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

                                    <div className="border-t border-gray-100 pt-4 mb-6">
                                        <p className="text-sm font-semibold text-gray-700 mb-3">Select New Status:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['activate', 'deactivate'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => confirmStatusChange(status)}
                                                    disabled={statusChangeUser.activityStatus === status}
                                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                                        statusChangeUser.activityStatus === status
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border cursor-pointer border-gray-200'
                                                    } `}
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

        </div>
    );
};

export default UserList;