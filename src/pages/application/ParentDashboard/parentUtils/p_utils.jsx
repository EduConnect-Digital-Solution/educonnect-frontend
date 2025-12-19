// File containing components and utilities for the Parent Dashboard
import {
    Bell,
    BookOpen, Calendar,
    ChevronDown, FileText,
    GraduationCap,
    LayoutDashboard,
    LogOut, LucideMail,
    Menu, MessageCircle, MoreHorizontal, Search,
    User,
    UserCheck,
    Users,
    X
} from "lucide-react";
import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Images} from "../../../../components/images.jsx";

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex h-16 px-4 sm:px-6 lg:px-8">
                {/* Right Side: Notifications, Theme Toggle, and Profile */}
                <div className="flex items-center space-x-3 ml-auto">
                    {/* Notifications Icon */}
                    <button
                        className="p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Notifications"
                    >
                        <Bell className="w-6 h-6" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center px-3 py-2 space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 transition duration-150">
                        <span className="text-sm font-medium text-gray-800 hidden sm:block">
                            Musharof
                        </span>

                        <User className="w-6 h-6 ring-2 rounded-full ring-black" />
                    </div>
                </div>
            </div>
        </header>

    );
};

export const StatsMetricCard = ({ title, value, icon: Icon, colorClass }) => {
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

export const SummaryCard = ({ title, value, icon: Icon, color }) => (
    <div className={`flex items-center justify-between p-6 rounded-2xl shadow-sm border border-gray-100 ${color}`}>
        <div>
            <Icon size={24} className="mb-2 opacity-80" />
            <p className="text-sm font-bold opacity-70">{title}</p>
        </div>
        <p className="text-4xl font-bold">{value}</p>
    </div>
);

export const StatRing = ({ percentage, label }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                    <circle
                        cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-green-500"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{percentage}%</span>
            </div>
            <span className="text-[9px] font-bold text-gray-400 uppercase text-center leading-tight">{label}</span>
        </div>
    );
};

export const ParentSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard/parent' },
        { name: 'My Children', icon: GraduationCap, link: '/dashboard/parent/children', label: '' },
        { name: 'Profile', icon: User, link: '/dashboard/parent/profile' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-3 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            )}

            {/*Darkened Backdrop Overlay */}
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
                                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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

export const ParentsQuickStatsInfo = () => {

    // Define the metric data, colors, and icons
    const metrics = [
        {
            title: 'Total Children',
            value: 3,
            icon: UserCheck, // Icon for 'My Students'
            colorClass: 'bg-blue-100/50 text-gray-800', // Light blue-gray background
        },
        {
            title: 'Enrolled',
            value: 3,
            icon: Users, // Icon for 'Total Students'
            colorClass: 'bg-yellow-100/50 text-gray-800', // Light yellow background
        },
        {
            title: 'Active',
            value: 5,
            icon: BookOpen, // Icon for 'Subjects Taught'
            colorClass: 'bg-green-100/50 text-gray-800', // Light green background
        },
        {
            title: 'Classes',
            value: 3,
            icon: GraduationCap, // Icon for 'Classes Assigned'
            colorClass: 'bg-purple-100/50 text-gray-800', // Light purple background
        },
    ];

    return (
        <div className="md:p-6">
            {/* Overview Heading (Kept from original design) */}
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Overview</h1>

            {/* Metrics Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <StatsMetricCard
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

export const AnalyticsAndActions = () => {
    const [selectedChild, setSelectedChild] = useState('Sandra J');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');

    const children = ['Sandra J', 'David J', 'Daniel J'];
    const subjects = ['All Subjects', 'Mathematics', 'Basic Science', 'English'];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* 1. Student Performance & Attendance Analytics Box */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Child Progress Analytics</h2>
                            <p className="text-xs text-gray-400 font-medium">Tracking performance vs. attendance trends</p>
                        </div>
                        {/* Legend */}
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Performance</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Attendance</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-3 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                        {/* Child Selector */}
                        <div className="relative flex-1 min-w-[140px]">
                            <select
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                {children.map(child => <option key={child}>{child}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Subject Selector */}
                        <div className="relative flex-1 min-w-[140px]">
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                {subjects.map(sub => <option key={sub}>{sub}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* --- Graph Container --- */}
                <div className="relative h-72 w-full mt-4 bg-white">
                    {/* Y-axis Labels */}
                    <div className="absolute left-0 top-0 h-[calc(100%-24px)] flex flex-col justify-between text-[10px] font-bold text-gray-400 z-10">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                    </div>

                    {/* X-axis Labels */}
                    <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-around text-[11px] font-bold text-gray-400 pt-2">
                        {weeks.map((week) => (
                            <span key={week}>{week}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Parent Quick Actions Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="space-y-4 flex-1">
                    {/* 1. COMING SOON FEATURE */}
                    <QuickActionCard
                        title="View Report Cards"
                        description="Download latest terminal results and assessments"
                        buttonText="Coming Soon"
                        icon={FileText}
                        colorClass="bg-gray-100 text-gray-400"
                        comingSoon={true} // New prop to handle post-MVP state
                    />

                    {/* 2. ACTIVE FEATURE */}
                    <QuickActionCard
                        title="Contact Teacher"
                        description="Get in touch with the school admin or teachers"
                        buttonText="Coming Soon"
                        icon={LucideMail}
                        // colorClass="bg-green-50 text-green-600"
                        comingSoon={true} // New prop to handle po
                        colorClass="bg-gray-100 text-gray-400"
                        // st-MVP state
                    />

                    {/*3. ACTIVE FEATURE*/}
                    <QuickActionCard
                        title="Contact Support"
                        description="Get in touch with the school admin or teachers"
                        buttonText="Coming Soon"
                        icon={MessageCircle}
                        colorClass="bg-gray-100 text-gray-400"
                        comingSoon={true} // New prop to handle post-MVP state
                    />
                </div>
            </div>
        </div>
    );
};

export const ChildListandNotification = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Data
    const children = [
        { id: 1, name: "Sandra J", class: "Pry 3", teacher: "Mrs Okafor", status: "Active", attendance: "98%", nextPayment: "3.45" },
        { id: 2, name: "David J", class: "Pry 1", teacher: "Mr James", status: "Inactive", attendance: "45%", nextPayment: "3.45" },
        { id: 3, name: "Daniel J", class: "Nursery 2", teacher: "Miss Shade", status: "Active", attendance: "92%", nextPayment: "3.45" },
    ];

    const allNotifications = [
        { id: 1, text: "Your child has a new assignment", time: "1 hour ago" },
        { id: 2, text: "School resumes Monday 7:30AM", time: "1 day ago" },
        { id: 3, text: "PTA meeting this Friday at 4PM", time: "3 days ago" },
        { id: 4, text: "Term 2 Result portal is now open", time: "4 days ago" },
        { id: 5, text: "New sports equipment fee update", time: "1 week ago" },
        { id: 6, text: "Health checkup scheduled for Monday", time: "1 week ago" },
    ];

    const displayNotifications = allNotifications.slice(0, 4);
    const hiddenCount = allNotifications.length - displayNotifications.length;

    return (
        <div className="py-5 bg-gray-50">
            {/* Main Side-by-Side Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">

                {/* 1. List of Children (70% Width on Large Screens) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800">List of Children</h2>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search child..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Child</th>
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
                                            {/*<CreditCard size={14} className="text-gray-400" />*/}
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

                {/* 2. Notifications (30% Width on Large Screens) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                            {hiddenCount > 0 && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">
                                    +{hiddenCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-xs font-bold text-blue-600 hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    <div className="p-6 space-y-4 flex-1">
                        {displayNotifications.map((notif) => (
                            <div key={notif.id} className="flex gap-4 group cursor-pointer">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                        {notif.text}
                                    </p>
                                    <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wide">
                                        {notif.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Event Teaser */}
                    <div className="m-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-lg text-orange-500 shadow-sm">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-orange-700 uppercase">Upcoming Event</p>
                            <p className="text-sm font-bold text-gray-800">Parent-Teacher Night</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- VIEW ALL NOTIFICATIONS MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <Bell className="text-blue-600" size={20} />
                                <h3 className="text-lg font-bold text-gray-800">All Notifications</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="p-2 max-h-[400px] overflow-y-auto">
                            {allNotifications.map((notif) => (
                                <div key={notif.id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                                    <p className="text-sm font-bold text-gray-800">{notif.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 text-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



