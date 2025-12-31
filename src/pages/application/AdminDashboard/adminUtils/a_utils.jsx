import React, {useEffect, useState} from "react";
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
    UserCheck, UserPlus,
    Users,
    X, XCircle
} from "lucide-react";
import {Images} from "../../../../components/images.jsx";

export const Sidebar = () => {
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
        {
            name: 'User Management',
            icon: Settings,
            link: '/dashboard/admin/users',
            hasSubmenu: true,
            subItems: [
                { name: 'Parents', link: '/dashboard/admin/users/parents' },
                { name: 'Students', link: '/dashboard/admin/users/students' },
                { name: 'Teachers', link: '/dashboard/admin/users/teachers' },
            ]
        },
        { name: 'School Profile', icon: User, link: '/dashboard/admin/school-profile' },
        { name: 'Admin Profile', icon: User, link: '/dashboard/admin/admin-profile' },
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
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
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
                <div className="p-4 border-t border-gray-200 shrink-0">
                    <button
                        onClick={() => console.log('Logging out...')}
                        className="flex items-center w-full p-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition duration-150"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export const AdminOverviewDashboard = () => {

    // Define the metric data, colors, and icons
    const metrics = [
        {
            title: 'Total Teachers',
            value: 32,
            icon: UserCheck, // Icon for 'My Students'
            colorClass: 'bg-blue-100/50 text-gray-800', // Light blue-gray background
        },
        {
            title: 'Total Students',
            value: 88,
            icon: Users, // Icon for 'Total Students'
            colorClass: 'bg-yellow-100/50 text-gray-800', // Light yellow background
        },
        {
            title: 'Total Parents',
            value: 5,
            icon: BookOpen, // Icon for 'Subjects Taught'
            colorClass: 'bg-green-100/50 text-gray-800', // Light green background
        },
        {
            title: 'Pending Invites',
            value: 13,
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
Week 1
        </div>
    );
};

export const AnalyticsAndActions = () => {
    const [timeframe, setTimeframe] = useState('Last Month');
    const weeks = ['9:00am', '11:00am', '13:00pm', '15:00pm'];

    // --- Enhanced Quick Action Card Component ---
    const QuickActionCard = ({ title, description, buttonText, icon: Icon, colorClass }) => (
        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${colorClass} transition-transform group-hover:scale-110`}>
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-xs mb-3 leading-relaxed">{description}</p>
                    <button className="w-full py-2 text-xs font-bold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 p-2">

            {/* 1. Enhanced Analytics Box */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            Activity Analytics Box
                        </h2>
                        <p className="text-xs text-gray-400 font-medium">View users that are active an inactive</p>
                    </div>

                </div>

                {/* --- Enhanced Graph Visualization --- */}
                <div className="relative h-72 w-full mt-4">
                    {/* Simulated Grid Lines */}
                    <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-full border-t border-gray-50" />
                        ))}
                    </div>

                    {/* Y-axis Labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-gray-400">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span className="mb-6">0</span>
                    </div>



                    {/* X-axis Labels */}
                    <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-around text-[11px] font-bold text-gray-400 border-t border-gray-100 pt-2">
                        {weeks.map((week) => (
                            <span key={week}>{week}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Enhanced Quick Actions Box */}
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
                        colorClass="bg-blue-50 text-blue-600"
                        />
                    <QuickActionCard
                        title="Invite Teachers"
                        description="Create teacher accounts and assign classes or send invitation links."
                        buttonText="Invite Teachers"
                        icon={Plus}
                        colorClass="bg-purple-50 text-purple-600"
                    />
                    <QuickActionCard
                        title="Invite Parents"
                        description="Send parent invites to connect guardians with their students' accounts."
                        buttonText="Send Invites"
                        icon={Plus}
                        colorClass="bg-green-50 text-green-600"
                    />
                </div>
            </div>
        </div>
    );
};

export const BottomSection = () => {
    // Mock data for invitations
    const invitations = [
        {
            id: 1,
            email: 'parent.jdoe@example.com',
            role: 'Parent',
            sentAt: '2 hours ago',
            status: 'Pending',
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50',
        },
        {
            id: 2,
            email: 'teacher.smith@school.edu',
            role: 'Teacher',
            sentAt: '1 day ago',
            status: 'Expired',
            iconColor: 'text-amber-500',
            bgColor: 'bg-amber-50',
        },
        {
            id: 3,
            email: 'admin.support@educonnect.com',
            role: 'Admin',
            sentAt: '3 days ago',
            status: 'Pending',
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },
        {
            id: 4,
            email: 'admin.support@educonnect.com',
            role: 'Admin',
            sentAt: '3 days ago',
            status: 'Pending',
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },
        {
            id: 5,
            email: 'admin.support@educonnect.com',
            role: 'Admin',
            sentAt: '3 days ago',
            status: 'Pending',
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },
        {
            id: 6,
            email: 'admin.support@educonnect.com',
            role: 'Admin',
            sentAt: '3 days ago',
            status: 'Pending',
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },

    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-2">
            <RecentActivities />

            {/* Invitation Management Section */}
            <div className="bg-white p-6  rounded-[32px] shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Pending Invitations</h2>
                        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
                            Manage access invitations
                        </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                        <Search size={18} />
                    </button>
                </div>

                <div className="space-y-3 flex-1">
                    {invitations.map((inv, idx) => (
                        <div
                            key={inv.id}
                            className="group p-4 rounded-2xl border border-gray-50 bg-white hover:border-blue-100 hover:shadow-sm transition-all flex items-center gap-4"
                        >
                            {/* Status Icon */}
                            <div className={`p-3 rounded-xl ${inv.bgColor} ${inv.iconColor} shrink-0`}>
                                <Mail size={20} />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 text-sm">
                                    {inv.email}
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-0.5">
                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-tight">
                                        {inv.role}
                                    </span>
                                    <span className="text-gray-200 text-xs">•</span>
                                    <span className="text-[10px] font-bold text-gray-500">
                                        Sent {inv.sentAt}
                                    </span>
                                    <span className={`md:ml-2 text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                                        inv.status === 'Expired' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                        {inv.status}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => console.log('Resending...')}
                                    title="Resend Invitation"
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <RefreshCw size={16} />
                                </button>
                                <button
                                    onClick={() => console.log('Cancelling...')}
                                    title="Cancel Invitation"
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <XCircle size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecentActivities = () => {
    // Activity data structure mimicking your "Three new students were added" logic
    const activities = [
        {
            id: 1,
            type: 'registration',
            title: 'Three new students were added',
            timestamp: 'Nov 13 at 10:40',
            icon: <UserPlus size={16} />,
            iconBg: 'bg-blue-50 text-blue-600',
        },
        {
            id: 2,
            type: 'invite',
            title: 'Xyz school was sent an invite',
            timestamp: 'Nov 12 at 08:04',
            icon: <Clock size={16} />,
            iconBg: 'bg-indigo-50 text-indigo-600',
            dateHeader: 'Wed 12 Nov 2025'
        },
        {
            id: 3,
            type: 'report',
            title: 'Terminal report for JSS 3 generated',
            timestamp: 'Nov 11 at 14:20',
            icon: <FileText size={16} />,
            iconBg: 'bg-purple-50 text-purple-600',
        },
        {
            id: 4,
            type: 'payment',
            title: 'Tuition payment verified for Ganiu Abbas',
            timestamp: 'Nov 10 at 09:15',
            icon: <CheckCircle size={16} />,
            iconBg: 'bg-green-50 text-green-600',
        }
    ];

    return (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                <div className="flex items-center gap-3">
                    <select className="bg-gray-50 border-none text-xs font-black rounded-xl px-3 py-2 outline-none cursor-pointer text-gray-600 uppercase tracking-wider">
                        <option>This Month</option>
                        <option>Last Month</option>
                    </select>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="p-8 relative">
                {/* The Vertical Line */}
                <div className="absolute left-[51px] top-10 bottom-10 w-[1px] bg-gray-100" />

                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="relative">
                            {/* Optional Date Header like in your screenshot */}
                            {activity.dateHeader && (
                                <div className="mb-6 ml-[44px]">
                                  <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">
                                    {activity.dateHeader}
                                  </span>
                                </div>
                            )}

                            <div className="flex items-center group cursor-pointer">
                                {/* Icon Container */}
                                <div className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110 ${activity.iconBg}`}>
                                    {activity.icon}
                                </div>

                                {/* Content */}
                                <div className="ml-6 flex-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                                        {activity.timestamp}
                                    </p>
                                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {activity.title}
                                    </h3>
                                </div>

                                {/* Action Arrow */}
                                <div className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / View All */}
            {/*<div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">*/}
            {/*    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">*/}
            {/*        View Full Audit Log*/}
            {/*    </button>*/}
            {/*</div>*/}
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

