import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {
    AlertCircle,
    AlertTriangle, BarChart3,
    BookOpen, CalendarDays, CheckCircle2, ChevronRight, Clock,
    GraduationCap,
    LayoutDashboard, LayoutGrid,
    LogOut, Mail,
    Menu, MessageCircle, MessageSquare,
    MoreHorizontal, Search, ShieldCheck, Upload,
    User,
    UserCheck, UserCog,
    Users,
    X
} from "lucide-react";
import {Images} from "../../../../components/images.jsx";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard/teacher' },
        { name: 'My Classes', icon: GraduationCap, link: '/dashboard/teacher/classes', label: '' },
        { name: 'Grades', icon: GraduationCap, link: '/dashboard/teacher/classes', label: 'COMING SOON' },
        { name: 'My Students', icon: GraduationCap, link: '/dashboard/teacher/students', label: '' },
        { name: 'User Profile', icon: User, link: '/dashboard/teacher/profile' },
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
                        <img src={Images.main_logo} alt="Logo" className="w-32" />
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
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.link}
                                end={item.link === '/dashboard/teacher'}
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
                                {item.label && (
                                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      {item.label}
                                    </span>
                                )}
                            </NavLink>
                        ))}
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

export const EducationMetricCard = ({ title, value, icon: Icon, colorClass }) => {
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

export const EducationOverviewDashboard = () => {

    // Define the metric data, colors, and icons
    const metrics = [
        {
            title: 'My Students',
            value: 32,
            icon: UserCheck, // Icon for 'My Students'
            colorClass: 'bg-blue-100/50 text-gray-800', // Light blue-gray background
        },
        {
            title: 'Subjects Taught',
            value: 5,
            icon: BookOpen, // Icon for 'Subjects Taught'
            colorClass: 'bg-green-100/50 text-gray-800', // Light green background
        },
        {
            title: 'Classes Assigned',
            value: 3,
            icon: GraduationCap, // Icon for 'Classes Assigned'
            colorClass: 'bg-purple-100/50 text-gray-800', // Light purple background
        },
    ];

    return (
        <div className="p-6">
            {/* Overview Heading (Kept from original design) */}
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Overview</h1>

            {/* Metrics Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

export const TeacherDashboardHome = () => {
    const [timeframe, setTimeframe] = useState('Last Month');
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const [activeTab, setActiveTab] = useState('overview');

    const classes = [
        { name: 'Primary 1', count: 8, max: 25 },
        { name: 'Primary 2', count: 12, max: 25 },
        { name: 'Primary 3', count: 20, max: 25 },
        { name: 'Primary 4', count: 24, max: 25 },
        { name: 'Primary 5', count: 24, max: 25 },
    ];

    const children = [
        { id: 1, name: "Sandra J", class: "Pry 3", teacher: "Mrs Okafor", status: "Active", attendance: "98%", nextPayment: "3.45" },
        { id: 2, name: "David J", class: "Pry 1", teacher: "Mr James", status: "Inactive", attendance: "45%", nextPayment: "3.45" },
        { id: 3, name: "Daniel J", class: "Nursery 2", teacher: "Miss Shade", status: "Active", attendance: "92%", nextPayment: "3.45" },
    ];
    const alerts = [
        {
            title: 'Low-Performing Students',
            description: '3 students are performing below expected level this week',
            cta: 'View Student Details',
            type: 'critical',
            icon: AlertTriangle,
            bgColor: 'bg-gray-50',
            textColor: 'text-gray-500',
            iconColor: 'text-gray-500',
        },
        {
            title: 'CompleteRegistration Escalations',
            description: 'You have 1 urgent message from a parent',
            cta: 'Open Message',
            type: 'warning',
            icon: MessageSquare,
            bgColor: 'bg-gray-50',
            textColor: 'text-gray-500',
            iconColor: 'text-gray-500',
        },
        {
            title: 'Students Needing Attention',
            description: '2 students need attention due to consistent missed assignments',
            cta: "Message Parents",
            type: 'info',
            icon: AlertCircle,
            bgColor: 'bg-gray-50',
            textColor: 'text-gray-500',
            iconColor: 'text-gray-500',
        },
    ];

    // --- Enhanced Quick Action Card Component ---
    const QuickActionCard = ({ title, description, buttonText, icon: Icon, colorClass, comingSoon }) => (
        <div className={`group p-4 rounded-xl border transition-all duration-200 ${
            comingSoon ? 'bg-gray-50/50 border-gray-100 opacity-75' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
        }`}>
            <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${colorClass} ${!comingSoon && 'group-hover:scale-110'} transition-transform`}>
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-sm ${comingSoon ? 'text-gray-400' : 'text-gray-900'}`}>{title}</h3>
                        {comingSoon && (
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded">Post MVP</span>
                        )}
                    </div>
                    <p className="text-gray-500 text-xs mb-3 leading-relaxed">{description}</p>
                    <button
                        disabled={comingSoon}
                        className={`w-full py-2 text-xs font-bold rounded-lg transition-colors ${
                            comingSoon
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent'
                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                        }`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-1 p-2 lg:grid-cols-3 gap-6">

                <div className="col-span-2 h-[540px]">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">

                        {/* Tabs Header (INSIDE the card) */}
                        <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-100">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex-1 py-2 text-sm font-bold rounded-xl transition ${
                                    activeTab === 'overview'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Class Overview
                            </button>

                            <button
                                onClick={() => setActiveTab('students')}
                                className={`flex-1 py-2 text-sm font-bold rounded-xl transition ${
                                    activeTab === 'students'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                List of Students
                            </button>
                        </div>


                        {/* List of Classes taken and Students taught */}
                        <div className="overflow-y-auto bg-gray-100/50">
                            {/*List of Students*/}
                            {activeTab === 'students' && (
                                <div className="bg-white h-full flex flex-col">
                                    <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row justify-between gap-4">
                                        <h2 className="text-lg font-bold text-gray-800">List of Students</h2>

                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    placeholder="Search child..."
                                                    className="pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <NavLink to={`/dashboard/teacher/students`} className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all flex items-center gap-1">
                                                View All <ChevronRight size={14} />
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="overflow-auto bg-gray-50/30 flex-1">
                                        <div className="flex-1 overflow-y-auto bg-gray-50/30">
                                            <table className="w-full text-left">
                                                <thead className="sticky top-0 bg-gray-50/80 backdrop-blur z-10">
                                                <tr className="text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                                                    <th className="px-6 py-4">Student</th>
                                                    <th className="px-6 py-4">Class/Teacher</th>
                                                    <th className="px-6 py-4">Attendance</th>
                                                    <th className="px-6 py-4">Overall Grade</th>
                                                    <th className="px-6 py-4 text-center">Status</th>
                                                </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-100">
                                                {children.map((child) => (
                                                    <tr key={child.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                                    {child.name.charAt(0)}
                                                                </div>
                                                                <span className="font-bold text-gray-800">{child.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="text-sm font-semibold text-gray-700">{child.class}</p>
                                                            <p className="text-xs text-gray-400">{child.teacher}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm font-bold text-gray-700">{child.attendance}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                                {child.nextPayment}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        child.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                        {child.status}
                                                    </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/*List of Classes*/}
                            {activeTab === 'overview' && (
                                <div className="bg-white border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden flex flex-col">
                                    {/* Header Section with Button at Top Right */}
                                    <div className="p-6 border-b border-gray-50 flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800 mb-1">Class Overview</h2>
                                            <p className="text-gray-400 text-sm">Number of students in each class</p>
                                        </div>

                                        {/* Relocated View All Button */}
                                        <NavLink to={``} className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all flex items-center gap-1">
                                            View All <ChevronRight size={14} />
                                        </NavLink>
                                    </div>

                                    {/* Scrollable Body: Adjust 'max-h-[400px]' to your preferred height */}
                                    <div className="p-6 overflow-y-auto max-h-[400px] custom-scrollbar">
                                        <div className="space-y-6">
                                            {classes.map((cls, idx) => (
                                                <div key={idx} className="group cursor-default">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                                            {cls.name}
                                                        </span>
                                                        <span className="text-sm font-bold text-gray-900">{cls.count}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                                (cls.count / cls.max) > 0.8 ? 'bg-orange-400' : 'bg-blue-500'
                                                            }`}
                                                            style={{ width: `${(cls.count / cls.max) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* 2. Enhanced Quick Actions Box */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        <QuickActionCard
                            title="Upload Lessons"
                            description="Upload notes, slides and resources"
                            buttonText="Upload Now"
                            icon={Upload}
                            colorClass="bg-gray-50 text-gray-600"
                            comingSoon={true}
                        />
                        <QuickActionCard
                            title="Create Quiz"
                            description="Test your students' understanding quickly"
                            buttonText="Create Quiz"
                            icon={BookOpen}
                            colorClass="bg-gray-50 text-gray-600"
                            comingSoon={true}
                        />
                        <QuickActionCard
                            title="Message Parents"
                            description="Communicate with parents in real time"
                            buttonText="Message"
                            icon={Mail}
                            colorClass="bg-gray-50 text-gray-600"
                            comingSoon={true}
                        />
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-2">
                {/* 1. Enhanced Analytics Box */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                Analytics Box
                            </h2>
                            <p className="text-xs text-gray-400 font-medium">Student engagement and performance trends</p>
                        </div>

                        {/* Segmented Control instead of a plain dropdown */}
                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <select className="text-sm border border-gray-300 rounded-lg py-1.5 px-3 focus:ring-blue-500 focus:border-blue-500">

                                <option>Last Month</option>

                                <option>Last 6 Months</option>

                                <option>Last Year</option>

                            </select>
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

                {/* 1. Important Alerts Section */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1">
                            <h2 className="text-xl font-bold text-gray-800">Important Alerts</h2>
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded">Coming Soon</span>
                        </div>
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse">
            3 ACTION ITEMS
          </span>
                    </div>

                    <div className="space-y-4">
                        {alerts.map((alert, idx) => (
                            <div
                                key={idx}
                                className={`${alert.bgColor} p-4 rounded-xl flex items-start gap-4 transition-all hover:shadow-md cursor-default border border-transparent hover:border-gray-200`}
                            >
                                <div className={`${alert.iconColor} mt-1`}>
                                    <alert.icon size={22} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold ${alert.textColor} text-sm lg:text-base`}>
                                        <div className="flex items-center gap-1">
                                            {alert.title}
                                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded">Post MVP</span>
                                        </div>

                                    </h3>
                                    <p className="text-gray-500 text-sm mt-0.5">{alert.description}</p>
                                </div>
                                <button className={`text-sm cursor-not-allowed font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity ${alert.textColor}`}>
                                    {alert.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>

    );
};

export const CircularProgress = ({ value, label, colorClass }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 70 70">
                    <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="6"
                        cx="35"
                        cy="35"
                        r={radius}
                        fill="transparent"
                    />
                    <circle
                        className={`${colorClass} stroke-current transition-all duration-500 ease-in-out`}
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="35"
                        cy="35"
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 35 35)"
                    />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className={`text-xl font-bold ${colorClass}`}>{value}%</span>
                </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-600 text-center leading-tight">{label}</p>
        </div>
    );
};

export const AccountAndClasses = () => {
    // Mock Data
    const assignedClasses = [
        {
            subject: "Quantitative Reasoning",
            students: 48,
            performance: 78,
        },
        {
            subject: "Mathematics",
            students: 56,
            performance: 81,
        },
        {
            subject: "Basic Science",
            students: 50,
            performance: 76,
        }
    ];

    const permissions = [
        { label: "Create Assignments", enabled: true },
        { label: "Message Parents", enabled: true },
        { label: "Edit Class Details", enabled: true },
        { label: "View Analytics", enabled: true },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* --- 1. Classes Assigned Card --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Classes Assigned</h2>
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 font-bold rounded-lg text-sm">
            3
          </span>
                </div>

                <div className="space-y-8">
                    {assignedClasses.map((item, idx) => (
                        <div key={idx} className="group">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                All Classes - Subject Teacher ({item.subject})
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Student Count */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-transparent group-hover:border-blue-100 transition-all">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Users size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{item.students} students</p>
                                    </div>
                                </div>

                                {/* Performance */}
                                <div className="flex flex-col justify-center gap-1 p-3 rounded-xl bg-green-50/50 border border-transparent group-hover:border-green-100 transition-all">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 size={16} className="text-green-600" />
                                        <p className="text-sm font-bold text-gray-800">Performance: {item.performance}%</p>
                                    </div>
                                    {/* Enhancement: Performance Bar */}
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                                        <div
                                            className="bg-green-500 h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${item.performance}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 2. Account Status Card --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Account Status</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold uppercase">Active</span>
                    </div>
                </div>

                {/* Verification Status */}
                <section className="mb-8">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Verification Status</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['Email Verification', 'Phone Verification', 'ID Verification', 'Qualification Verification'].map((text) => (
                            <div key={text} className="flex items-center justify-between p-3 border border-gray-50 bg-gray-50/30 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">{text}</span>
                                <CheckCircle2 size={18} className="text-green-500 fill-green-50" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Role & Permissions */}
                <section className="mb-8">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role & Permissions</p>
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck size={16} className="text-blue-600" />
                        <span className="text-sm font-bold text-gray-800">Role: <span className="text-blue-600">Subject Teacher</span></span>
                    </div>

                    <div className="space-y-3">
                        {permissions.map((perm) => (
                            <div key={perm.label} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{perm.label}</span>
                                {/* Custom Toggle Switch */}
                                <div className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${perm.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                    <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${perm.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic font-medium">Note: Permissions can only be edited by Admin</p>
                </section>

                {/* Account Activity */}
                <section className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Activity</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-gray-400" />
                            <p className="text-xs text-gray-500">Last Login: <span className="font-bold text-gray-800">Today at 12:04 PM</span></p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CalendarDays size={16} className="text-gray-400" />
                            <p className="text-xs text-gray-500">Date Joined: <span className="font-bold text-gray-800">Friday, 20th Oct, 2023 at 2:40 PM</span></p>
                        </div>
                        <div className="flex items-center gap-3">
                            <UserCog size={16} className="text-gray-400" />
                            <p className="text-xs text-gray-500">Created by: <span className="font-bold text-gray-800">Admin (ID: 0123456789)</span></p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};


