import React from 'react';
import { Menu, Search, Bell, Sun } from 'lucide-react';
import {
    LayoutDashboard,
    Bot,
    ShoppingCart,
    Calendar,
    User,
    Zap,
} from 'lucide-react';

import { Users, BookOpen, UserCheck, GraduationCap } from 'lucide-react';
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
                        <AnalyticsAndActions />
                        {/* ... other content goes here */}
                    </main>
                </div>
            </div>
        </>
    )
}

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
        </div>
    );
};

const Header = () => {
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

const Sidebar = () => {
    // Define navigation items
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, current: true, hasDropdown: false },
        { name: 'My Students', icon: GraduationCap, current: false, hasDropdown: true, label: '' },
        { name: 'User Profile', icon: User, current: false, hasDropdown: false },
    ];

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
                            href="#" // Placeholder link
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
    // Dummy data for the graph (just for labeling the X-axis)
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    // --- Quick Action Item Component ---
    const QuickActionItem = ({ title, description, buttonText }) => (
        <div className="mb-4 last:mb-0">
            <h3 className="text-gray-900 font-semibold mb-1">
                • {title}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{description}</p>
            <button className="px-4 py-2 text-sm font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition duration-150">
                {buttonText}
            </button>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* 1. Analytics Box (Graph Placeholder) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Analytics Box</h2>
                    <select className="text-sm border border-gray-300 rounded-lg py-1.5 px-3 focus:ring-blue-500 focus:border-blue-500">
                        <option>Last Month</option>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                    </select>
                </div>

                {/* --- Graph Visual Placeholder (Simulating Area Chart) --- */}
                <div className="relative h-72 w-full">
                    {/* Y-axis Labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                    </div>

                    {/* Chart Area: Simulates the curve using a complex background image or a clipped element.
              Here we use a simpler, common technique: a semi-transparent curved shape. */}
                    <div className="absolute left-8 right-0 bottom-6 top-0">
                        {/* This div represents the actual chart visualization from a library like Recharts.
               For this demo, we use a basic background pattern to suggest a curved area graph. */}
                        <div
                            className="w-full h-full"
                            style={{
                                // A complex gradient/clip-path would be needed for perfect fidelity,
                                // but this placeholder gives the space and axis context.
                                background: 'linear-gradient(to top, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 100%)',
                                clipPath: 'polygon(0 100%, 0 0%, 25% 60%, 50% 70%, 75% 40%, 100% 75%, 100% 100%)',
                                opacity: 0.8
                            }}
                        ></div>
                    </div>

                    {/* X-axis Labels */}
                    <div className="absolute left-8 right-0 bottom-0 h-4 flex justify-around text-xs text-gray-600 pt-1">
                        {weeks.map((week, index) => (
                            <span key={index} className="w-1/4 text-center">{week}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Quick Actions Box */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>

                <div className="space-y-6">
                    <QuickActionItem
                        title="Upload Lessons"
                        description="Upload notes, slides and resources"
                        buttonText="Upload Now"
                    />
                    <QuickActionItem
                        title="Create Quiz"
                        description="Test your students' understanding quickly"
                        buttonText="Create Quiz"
                    />
                    <QuickActionItem
                        title="Message Parents"
                        description="Communicate with parents in real time"
                        buttonText="Message"
                    />
                </div>
            </div>
        </div>
    );
};