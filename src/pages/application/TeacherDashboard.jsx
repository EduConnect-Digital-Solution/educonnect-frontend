import React, {useState} from 'react';
import {Menu, Search, Bell, Sun, Book} from 'lucide-react';
import {
    LayoutDashboard,
    Bot,
    ShoppingCart,
    Calendar,
    User,
    Zap,
} from 'lucide-react';
import { AlertTriangle, MessageSquare, AlertCircle, ChevronRight } from 'lucide-react';
import { Users, BookOpen, UserCheck, GraduationCap } from 'lucide-react';
import { Upload, MessageCircle, MoreHorizontal, TrendingUp } from 'lucide-react';
import {NavLink} from "react-router-dom";
import {Images} from "../../components/images.jsx";

export default function TeacherDashboard() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar is fixed on the left */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                        <EducationOverviewDashboard />
                    </main>
                </div>
            </div>
        </>
    )
}

// TODO: add myclasses to the sidebar that allows the teacher to view their classes from a drop down menu

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

const EducationOverviewDashboard = () => {

    // Define the metric data, colors, and icons
    const metrics = [
        {
            title: 'My Students',
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
            <AnalyticsAndActions />
            <BottomSection />
        </div>
    );
};

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Left Side: Menu and Search */}
                <div className="flex items-center space-x-4">
                    {/* Hamburger Menu Icon */}
                    <button
                        className="text-gray-500 hover:text-gray-600 p-2 rounded-lg"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Search Bar */}
                    <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-2 w-72">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search or type command..."
                            className="bg-transparent focus:outline-none w-full text-gray-800 placeholder-gray-500 text-sm"
                        />
                        {/* The 'K' icon/shortcut button */}
                        <button className="flex items-center justify-center h-6 w-6 text-xs text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm ml-2">
                            K
                        </button>
                    </div>
                </div>

                {/* Right Side: Notifications, Theme Toggle, and Profile */}
                <div className="flex items-center space-x-3">
                    {/* Dark Mode Toggle (Moon/Sun) */}
                    {/*<button*/}
                    {/*    className="p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100 transition duration-150"*/}
                    {/*    aria-label="Toggle theme"*/}
                    {/*>*/}
                    {/*    <Sun className="w-6 h-6" /> /!* Using Sun for the light mode icon as seen *!/*/}
                    {/*</button>*/}

                    {/* Notifications Icon */}
                    <button
                        className="p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Notifications"
                    >
                        <Bell className="w-6 h-6" />
                        {/* Optional: Add a dot for notification count if needed */}
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition duration-150">
            <span className="text-sm font-medium text-gray-800 hidden sm:block">
              Musharof
            </span>
                        {/*<img*/}
                        {/*    className="h-9 w-9 rounded-full object-cover ring-2 ring-white"*/}
                        {/*    src={`${User}`} // Replace with the actual image path*/}
                        {/*    alt=""*/}
                        {/*/>*/}

                        <User className="w-6 h-6 ring-2 rounded-full ring-black" />

                    </div>
                </div>
            </div>
        </header>
    );
};

export const Sidebar = () => {
    // Define navigation items
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard/teacher', current: true, hasDropdown: false },
        { name: 'My Students', icon: GraduationCap, link: '/dashboard/teacher/my-students', current: false, hasDropdown: true, label: '' },
        { name: 'User Profile', icon: User, link: '/dashboard/teacher/profile', current: false, hasDropdown: false },
    ];

    // TODO: change from message parents to email parents
    return (
        <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200 sticky top-0">
            {/* Sidebar Header (Logo and Menu Icon) */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <NavLink to={`/`}>
                        <img
                            src={`${Images.main_logo}`}
                            alt="EduConnect Logo Icon"
                            className="w-34"
                        />
                    </NavLink>

                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto pt-6 px-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    Menu
                </p>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={`${item.link}`} // Placeholder link
                            className={`flex items-center p-3 rounded-lg transition duration-150 ${
                                item.current
                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                        >
                            {/* Icon */}
                            <item.icon className="w-5 h-5 mr-3" />

                            {/* Text */}
                            <span className="flex-1 text-sm">{item.name}</span>

                            {/* Label (NEW tag) */}
                            {item.label && (
                                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {item.label}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>
            </div>


        </div>
    );
};

const AnalyticsAndActions = () => {
    const [timeframe, setTimeframe] = useState('Last Month');
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* 1. Enhanced Analytics Box */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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

                    {/* Styled Area Chart Area */}
                    <div className="absolute left-8 right-0 bottom-6 top-0">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* The Area Path */}
                            <path
                                d="M0 20 Q 25 150, 50 160 T 100 80 T 150 180 T 200 120 L 200 280 L 0 280 Z"
                                fill="url(#chartGradient)"
                                className="w-full h-full"
                                vectorEffect="non-scaling-stroke"
                                style={{ transform: 'scaleX(5.5)' }} // Simple scaling to fill width
                            />
                            {/* The Line Path */}
                            <path
                                d="M0 20 Q 25 150, 50 160 T 100 80 T 150 180 T 200 120"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                style={{ transform: 'scaleX(5.5)' }}
                            />
                        </svg>
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
                        colorClass="bg-blue-50 text-blue-600"
                    />
                    <QuickActionCard
                        title="Create Quiz"
                        description="Test your students' understanding quickly"
                        buttonText="Create Quiz"
                        icon={BookOpen}
                        colorClass="bg-purple-50 text-purple-600"
                    />
                    <QuickActionCard
                        title="Message Parents"
                        description="Communicate with parents in real time"
                        buttonText="Message"
                        icon={MessageCircle}
                        colorClass="bg-green-50 text-green-600"
                    />
                </div>
            </div>
        </div>
    );
};

const BottomSection = () => {
    const alerts = [
        {
            title: 'Low-Performing Students',
            description: '3 students are performing below expected level this week',
            cta: 'View Student Details',
            type: 'critical',
            icon: AlertTriangle,
            bgColor: 'bg-red-50',
            textColor: 'text-red-700',
            iconColor: 'text-red-500',
        },
        {
            title: 'Parent Escalations',
            description: 'You have 1 urgent message from a parent',
            cta: 'Open Message',
            type: 'warning',
            icon: MessageSquare,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-700',
            iconColor: 'text-amber-500',
        },
        {
            title: 'Students Needing Attention',
            description: '2 students need attention due to consistent missed assignments',
            cta: "Message Parents",
            type: 'info',
            icon: AlertCircle,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            iconColor: 'text-purple-500',
        },
    ];

    const classes = [
        { name: 'Primary 1', count: 8, max: 25 },
        { name: 'Primary 2', count: 12, max: 25 },
        { name: 'Primary 3', count: 20, max: 25 },
        { name: 'Primary 4', count: 24, max: 25 },
        { name: 'Primary 5', count: 24, max: 25 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* 1. Important Alerts Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Important Alerts</h2>
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
                                    {alert.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-0.5">{alert.description}</p>
                            </div>
                            <button className={`text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity ${alert.textColor}`}>
                                {alert.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Class Overview Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Class Overview</h2>
                <p className="text-gray-400 text-sm mb-6">Number of students in each class</p>

                <div className="space-y-6">
                    {classes.map((cls, idx) => (
                        <div key={idx} className="group cursor-default">
                            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {cls.name}
                </span>
                                <span className="text-sm font-bold text-gray-900">{cls.count}</span>
                            </div>
                            {/* Enhancement: Progress bar for visual capacity */}
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

                <button className="w-full mt-8 py-3 text-sm font-bold text-gray-500 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                    View All Classes <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};