import React, {useEffect, useRef, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {
    BookOpen, CheckCircle,
    ChevronDown,
    ChevronRight, Clock, FileText, GraduationCap,
    LayoutDashboard,
    LogOut, Mail,
    Menu, MoreHorizontal, Plus, RefreshCw, Search,
    Settings,
    User,
    UserCheck, School, UserPlus,
    Users,
    X, XCircle,
} from "lucide-react";
import {Images} from "../../../../components/images.jsx";
import {
    createStudent,
    getAllStudents, inviteParent,
    inviteTeacher,
    resendInvitation, terminateInvitation,
} from "../../../auth/authAPIs.js";
import {Toast} from "../../../../components/Toast.jsx";
import {useAuth} from "../../../../contexts/AuthContext.jsx";

export function Sidebar({ Logout }){
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);


    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
        // Automatically open the dropdown if we are on a sub-route
        if (location.pathname.includes('/dashboard/admin/users')) {
            setIsUserMenuOpen(true);
        }
    }, [location]);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard/admin' },
        { name: 'User Management', icon: Settings, link: '/dashboard/admin/users'},
        { name: 'Students', icon: GraduationCap, link: '/dashboard/admin/users/students' },
        { name: 'School Profile', icon: School, link: '/dashboard/admin/school-profile' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            )}

            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-[50] w-64 bg-white border-r border-gray-200 
                    flex flex-col h-screen transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:sticky lg:top-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>

                {/* 1. Header Section */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
                    <NavLink to="/" className="flex items-center">
                        <img src={`${Images.main_logo}`} alt="Logo" className="w-32" />
                    </NavLink>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-600 p-2"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 2. Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto pt-6 px-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                        Menu
                    </p>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            if (item.hasSubmenu) {
                                return (
                                    <div key={item.name} className="space-y-1">
                                        <div
                                            className={`flex items-center w-full p-3 rounded-lg transition duration-150 ${
                                                location.pathname.includes(item.link)
                                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {/* Main link (navigates) */}
                                            <NavLink
                                                to={item.link}
                                                className="flex items-center flex-1 text-sm"
                                            >
                                                <item.icon className="w-5 h-5 mr-3" />
                                                {item.name}
                                            </NavLink>

                                            {/* Dropdown toggle (does NOT navigate) */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setIsUserMenuOpen(!isUserMenuOpen);
                                                }}
                                                className="ml-2 p-1 rounded hover:bg-gray-200"
                                            >
                                                {isUserMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </button>
                                        </div>

                                        {/* Dropdown Items */}
                                        {isUserMenuOpen && (
                                            <div className=" space-y-1">
                                                {item.subItems.map((sub) => (
                                                    <NavLink
                                                        key={sub.name}
                                                        to={sub.link}
                                                        className={({ isActive }) =>
                                                            `block p-2 pl-4 text-sm rounded-r-lg transition duration-150 ${
                                                                isActive
                                                                    ? 'text-blue-600 font-semibold border-l-2 border-blue-600 -ml-[2px]'
                                                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                                            }`
                                                        }
                                                    >
                                                        {sub.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-lg transition duration-150 ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                        }`
                                    }
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span className="flex-1 text-sm">{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* 3. Bottom Logout Section */}
                <div className="p-4 border-t border-gray-200 shrink-0 relative z-[60]">
                    <button
                        onClick={() => { Logout()}}
                        className="flex items-center cursor-pointer w-full p-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition duration-150"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export const AdminOverviewDashboard = (overview) => {
    // Define the metric data, colors, and icons
    const metrics = [
        {
            title: 'Total Users',
            value: overview.overview.totalUsers,
            icon: UserCheck, // Icon for 'My Students'
            colorClass: 'bg-blue-100/50 text-gray-800', // Light blue-gray background
        },
    {
            title: 'Total Active Users',
            value: overview.overview.totalActiveUsers,
            icon: Users, // Icon for 'Total Students'
            colorClass: 'bg-yellow-100/50 text-gray-800', // Light yellow background
        },
        {
            title: 'Total Students',
            value: overview.overview.totalStudents,
            icon: BookOpen, // Icon for 'Subjects Taught'
            colorClass: 'bg-green-100/50 text-gray-800', // Light green background
        },
       {
            title: 'Total Invitations',
            value: overview.overview.totalInvitations,
            icon: GraduationCap, // Icon for 'Classes Assigned'
            colorClass: 'bg-purple-100/50 text-gray-800', // Light purple background
        },
        {
            title: 'Pending Invites',
            value: overview.overview.pendingInvitations,
            icon: GraduationCap, // Icon for 'Classes Assigned'
            colorClass: 'bg-purple-100/50 text-gray-800', // Light purple background
        },
    ];

    return (
        <div className="p-6">
            {/* Overview Heading (Kept from original design) */}
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Overview</h1>

            {/* Metrics Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <EducationMetricCard
                        key={metric.title}
                        title={metric.title}
                        value={metric.value}
                        icon={metric.icon}
                        colorClass={metric.colorClass}
                    />
                ))}
            </div>
        </div>
    );
};

export const Input = ({ label, ...props }) => (
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

export const QuickActions = () => {
    const inputRef = useRef(null);

    const [viewTeacher, setViewTeacher] = useState(false);
    const [viewStudent, setViewStudent] = useState(false);
    const [viewParent, setViewParent] = useState(false);

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

    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [studentsToSubmit, setStudentsToSubmit] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [allStudentsList, setAllStudentsList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

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
    const [studentFormData, setStudentFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
//   "teacherIds": ["694fe6e4f6a5eff53cd7f8eb"],
        class: "",
        section: "",
        rollNumber: "",
        grade: "",
        dateOfBirth: "",
        gender: "", // TODO: create dropdown for gender, male, female or other
        address: "",
        phone: ""
    });


    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

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

    const handleCreateStudent = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation Checks
        if (!studentFormData?.firstName) {
            showToast("Please input first name");
            return;
        }

        if (!studentFormData?.lastName) {
            showToast("Please input last name");
            return;
        }

        const payload = {
            firstName: studentFormData.firstName.trim(),
            lastName: studentFormData.lastName.trim(),
        };

        // 2. Define the optional fields to check
        const optionalFields = [
            'email', 'class', 'section', 'rollNumber',
            'grade', 'dateOfBirth', 'gender', 'address', 'phone'
        ];

        // 3. Only add them to payload if they are not empty
        optionalFields.forEach(field => {
            const value = studentFormData[field];

            // Check if value exists and isn't just whitespace
            if (value && String(value).trim() !== "") {
                payload[field] = typeof value === 'string' ? value.trim() : value;

                // Special handling for email to ensure lowercase
                if (field === 'email') {
                    if (!studentFormData?.email || !emailPattern.test(teacherFormData.email)) {
                        showToast("Please provide a valid email address.");
                        return;
                    }
                    payload.email = payload.email.toLowerCase();
                }
            }
        });

        console.log(payload)

        try {
            await createStudent(payload);
            showToast('Student created successfully', 'success');
            setViewStudent(false)
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
        <>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                </div>

                <div className="space-y-4 flex-1">
                    <QuickActionCard
                        title="Register Students"
                        description="Add new students to the system."
                        buttonText="Add Students"
                        icon={Plus}
                        buttonFunction={() => setViewStudent(true)}
                        colorClass="bg-blue-50 text-blue-600"
                        />
                    <QuickActionCard
                        title="Invite Teachers"
                        description="Create teacher accounts and assign classes or send invitation links."
                        buttonText="Invite Teachers"
                        icon={Plus}
                        buttonFunction={() => setViewTeacher(true)}
                        colorClass="bg-purple-50 text-purple-600"
                    />
                    <QuickActionCard
                        title="Invite Parents"
                        description="Send parent invites to connect guardians with their students' accounts."
                        buttonText="Send Invites"
                        buttonFunction={() => {
                            setViewParent(true)
                            fetchAllStudents()
                        }}
                        icon={Plus}
                        colorClass="bg-green-50 text-green-600"
                    />
                </div>

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

                {viewStudent && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/30"
                                onClick={() => setViewStudent(false)}
                            />

                            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                                {/* Close */}
                                <button
                                    onClick={() => setViewStudent(false)}
                                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                >
                                    <X size={20} />
                                </button>

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Create Student</h3>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-5">
                                    {/* Names */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            value={studentFormData.firstName}
                                            onChange={(e) => setStudentFormData({...studentFormData, firstName: e.target.value})}
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            value={studentFormData.lastName}
                                            onChange={(e) => setStudentFormData({...studentFormData, lastName: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            value={studentFormData.email}
                                            onChange={(e) => setStudentFormData({...studentFormData, email: e.target.value})}
                                        />
                                        <Input
                                            label="Phone Number"
                                            value={studentFormData.phone}
                                            onChange={(e) => setStudentFormData({...studentFormData, phone: e.target.value})}
                                        />
                                    </div>


                                    <div className="grid grid-cols-3 gap-4">
                                        <Input
                                            label="Class"
                                            value={studentFormData.class}
                                            onChange={(e) => setStudentFormData({...studentFormData, class: e.target.value})}
                                            placeholder="JSS1"
                                        />
                                        <Input
                                            label="Section"
                                            value={studentFormData.section}
                                            onChange={(e) => setStudentFormData({...studentFormData, section: e.target.value})}
                                            placeholder="A"
                                        />
                                        <Input
                                            label="Roll Number"
                                            value={studentFormData.rollNumber}
                                            onChange={(e) => setStudentFormData({...studentFormData, rollNumber: e.target.value})}
                                        />
                                    </div>

                                    {/*TODO: Dropdown scale for if they use JSS format of Grade Format*/}
                                    <div className="grid grid-cols-3 gap-4">
                                        <Input
                                            label="Grade"
                                            value={studentFormData.grade}
                                            onChange={(e) => setStudentFormData({...studentFormData, grade: e.target.value})}
                                        />
                                        <Input
                                            label="Date of Birth"
                                            type="date"
                                            value={studentFormData.dateOfBirth}
                                            onChange={(e) => setStudentFormData({...studentFormData, dateOfBirth: e.target.value})}
                                        />
                                        <Input
                                            label="Gender"
                                            value={studentFormData.gender}
                                            onChange={(e) => setStudentFormData({...studentFormData, gender: e.target.value})}
                                        />
                                    </div>

                                    <Input
                                        label="Address"
                                        type="email"
                                        value={studentFormData.address}
                                        onChange={(e) => setStudentFormData({...studentFormData, address: e.target.value})}
                                    />

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setViewStudent(false)}
                                            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleCreateStudent}
                                            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Add Student
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>


        </>
    );
};

export const PendingInvitations = (invitations) => {
    const [showAllInvites, setShowAllInvites] = useState(false);
    if (!invitations.invitations || invitations.invitations.length === 0) return null;

    const displayInvites = invitations.invitations.slice(0, 3);
    const hasMore = invitations.invitations.length > 3;

    return (
        <>

            {/* Invitation Management Section */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Pending Invitations</h2>
                        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
                            Manage access invitations
                        </p>
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    {displayInvites.map((inv) => (
                        <InvitationItem key={inv.id} inv={inv} /> // Extracted to a sub-component for reuse
                    ))}
                </div>

                {/* See More Button - Only shows if more than 3 */}
                {hasMore && (
                    <button
                        onClick={() => setShowAllInvites(true)}
                        className="mt-6 w-full py-3 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all group flex items-center justify-center gap-2"
                    >
                        View all {invitations.invitations.length} invitations
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>


            {showAllInvites && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/40"
                        onClick={() => setShowAllInvites(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">All Invitations</h2>
                                <p className="text-sm font-medium text-gray-400">Showing {invitations.invitations.length} total sent invites</p>
                            </div>
                            <button
                                onClick={() => setShowAllInvites(false)}
                                className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable List */}
                        <div className="p-8 overflow-y-auto space-y-4">
                            {invitations.invitations.map((inv) => (
                                <InvitationItem key={inv.id} inv={inv} isFullWidth={true} />
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-50 text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                End of list
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const RecentActivity = (recentActivity) => {
    const data = recentActivity.recentActivity;
    // Combine and sort by date
    const activities = [
        ...data.users.map(u => ({ ...u, type: 'USER_REG' })),
        ...data.students.map(u => ({ ...u, type: 'STUD' })),
        ...data.invitations.map(i => ({ ...i, type: 'INVITE' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const getActionText = (item) => {
        if (item.type === 'STUD') return ' was added to the system as a student';
        if (item.type === 'USER_REG' && item.isActive) return ' joined as a ';
        return ' was invited as a ';
    };
    return (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Recent Activity</h3>
                {/*<span className="text-xs text-blue-600 font-medium cursor-pointer">View All</span>*/}
            </div>

            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
                {activities.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            {/* Icon Logic */}
                            <div className={`p-2 rounded-lg ${item.type === 'USER_REG' ? 'bg-green-50' : 'bg-blue-50'}`}>
                                {
                                    item.type === 'USER_REG' && item.isActive || item.type === 'STUD' ? <UserPlus size={18} className="text-green-600"/> : <Mail size={18} className="text-blue-600"/>
                                }
                            </div>

                            <div className="flex-1">
                                <p className="text-sm text-gray-900 leading-tight">
                                    <span className="font-semibold">{item.name || item.email}</span>
                                    {getActionText(item)}
                                    <span className="capitalize text-gray-600">{item.role}</span>
                                </p>

                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>

                                    {/* Status Badges */}
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase
                                        ${item.isActive || item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            item.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {item.status || (item.isActive ? 'Active' : 'Inactive')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EducationMetricCard = ({ title, value, icon: Icon, colorClass }) => {
    return (
        // Apply background and text color based on the colorClass prop
        <div className={`p-6 rounded-xl shadow-md flex items-center justify-between min-w-[200px] ${colorClass}`}>

            {/* Icon and Title Container */}
            <div className="flex flex-col space-y-2">
                <Icon className="w-8 h-8 opacity-70" /> {/* Larger icon */}
                <p className="text-base font-medium opacity-80 whitespace-nowrap">{title}</p>
            </div>

            {/* Value */}
            <h2 className="text-5xl font-bold">{value}</h2>
        </div>
    );
};

export const availableSubjects = [
    "English Language",
    "English Studies",
    "Mathematics",
    "Further Mathematics",
    "Basic Science",
    "Basic Technology",
    "Basic Science and Technology",
    "Biology",
    "Chemistry",
    "Physics",
    "Agricultural Science",
    "Health Education",
    "Physical Education",
    "Physical and Health Education",
    "Computer Studies",
    "Information and Communication Technology (ICT)",
    "Data Processing",
    "Software Craft Practice",
    "Networking",
    "Social Studies",
    "Civic Education",
    "Security Education",
    "Government",
    "History",
    "Geography",
    "Economics",
    "Commerce",
    "Financial Accounting",
    "Business Studies",
    "Marketing",
    "Insurance",
    "Office Practice",
    "Tourism",
    "Literature-in-English",
    "Christian Religious Studies (CRS)",
    "Islamic Religious Studies (IRS)",
    "Arabic",
    "Visual Arts",
    "Music",
    "Theatre Arts / Drama",
    "Cultural and Creative Arts",
    "French",
    "Nigerian Languages",
    "Hausa",
    "Igbo",
    "Yoruba",
    "Pre-Vocational Studies",
    "Home Economics",
    "Entrepreneurship",
    "Technical Drawing",
    "Auto Mechanics",
    "Auto Electrical Work",
    "Building Construction",
    "Woodwork",
    "Metalwork",
    "Electrical Installation and Maintenance",
    "Electronics",
    "Welding and Fabrication",
    "Plumbing and Pipe Fitting",
    "Carpentry and Joinery",
    "Furniture Making",
    "Painting and Decoration",
    "Refrigeration and Air Conditioning",
    "GSM Repairs",
    "Catering Craft Practice",
    "Garment Making",
    "Fashion Design",
    "Leather Goods",
    "Printing Craft Practice",
    "Animal Husbandry",
    "Fisheries",
    "Photography",
    "Cosmetology",
    "Environmental Management"
];

const InvitationItem = ({inv}) => {
    // Basic date formatter for "invitedAt"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const resendCount = inv.resendCount || 0;

    const statusStyles = {
        pending: 'bg-amber-50 text-amber-600',
        accepted: 'bg-green-50 text-green-600',
        expired: 'bg-red-50 text-red-600',
        cancelled: 'bg-gray-50 text-gray-600'
    };

    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
    const [cancelInvitation, setCancelInvitation] = useState(false);

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const auth = useAuth();
    const schoolID = auth.user?.schoolId;

    const [deleteReason, setDeleteReason] = useState('');

    const resendPayload = {
        invitationId: inv.id,
        schoolId: schoolID
    }

    const cancelPayload = {
        invitationId: inv.id,
        reason: deleteReason,
        schoolId: schoolID
    }

    function handleResend() {
        resendInvitation(resendPayload).then(() => {
            showToast('Invitation resent successfully', 'success');
        })
    }

    function handleCancel() {

        terminateInvitation(cancelPayload).then(() => {
            showToast('Invite has been cancelled', 'success');
        })
    }




    return (
        <div
            className="group p-4 rounded-2xl border border-gray-50 bg-white hover:border-blue-100 hover:shadow-sm transition-all flex items-center gap-4">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            {/* Status Icon */}
            <div className={`p-3 rounded-xl bg-blue-50 text-blue-500 shrink-0`}>
                <Mail size={20}/>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-sm truncate">
                        {inv.email}
                    </h3>
                    <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${statusStyles[inv.status] || statusStyles.pending}`}>
                        {inv.status}
                    </span>
                    {/* Subtle resend count indicator next to status */}
                    {resendCount > 0 && (
                        <span className="text-[9px] font-bold text-gray-400 italic">
                            ({resendCount} {resendCount === 1 ? 'retry' : 'retries'})
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-tight">
                        {inv.role}
                    </span>
                    <span className="text-gray-200 text-xs">•</span>
                    <span className="text-[10px] font-bold text-gray-500">
                        {formatDate(inv.invitedAt)}
                    </span>
                    <span className="text-gray-200 text-xs">•</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-medium">By</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50/50 px-1.5 rounded">
                            {inv.invitedBy.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <div className="relative">
                    <button
                        onClick={handleResend}
                        title="Resend Invitation"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <RefreshCw size={14}/>
                    </button>

                    {/* Floating Badge on the Button */}
                    {resendCount > 0 && (
                        <div
                            className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white ring-2 ring-white">
                            {resendCount}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setCancelInvitation(true)}
                    title="Cancel" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <XCircle size={14}/>
                </button>
            </div>


            {cancelInvitation && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/30" onClick={() => setCancelInvitation(null)} />
                        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <button
                                onClick={() => setCancelInvitation(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div>
                                <h3 className="text-xl text-center font-bold mb-3 text-gray-900">Cancel Invitation</h3>
                                <div className="flex items-center gap-3 mb-4">

                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        {inv.email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{inv.email}</p>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-center gap-1 text-gray-600 ">
                                    <p className="text-sm ">Current Status:</p>
                                    <span className={`text-[15px] font-medium`}>
                                        {inv.status}
                                    </span>
                                </div>

                                <div className="w-full text-left mb-6">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        Reason for cancellation
                                    </label>
                                    <textarea
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                        rows="3"
                                        placeholder="Please provide a reason for cancelling this invitation..."
                                        value={deleteReason}
                                        onChange={(e) => setDeleteReason(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setCancelInvitation(null)}
                                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={!deleteReason.trim()}
                                        onClick={() => {
                                            handleCancel();
                                            setCancelInvitation(null);
                                            setDeleteReason('');
                                        }}
                                        className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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



