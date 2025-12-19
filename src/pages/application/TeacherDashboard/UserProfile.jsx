import React, { useState } from 'react';
import {
    PencilLine,
    User,
    Mail,
    Briefcase,
    Hash,
    Phone,
    GraduationCap,
    Award,
    Search,
    Filter,
    ArrowDownUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import {Header, Sidebar} from "./TeacherDashboard.jsx";
import { Users, BarChart3, CheckCircle2, ShieldCheck, Clock, CalendarDays, UserCog } from 'lucide-react';
import {Images} from "../../../components/images.jsx";
import ClassSelectionModal from "./ClassSelectionModal.jsx";


const AccountAndClasses = () => {
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
const TeacherProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');

    const openModal = (subject) => {
        setSelectedSubject(subject);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSubject('');
    };

    // Mock Data
    const teacherData = {
        name: "Samuel Daniels",
        email: "samueldaniels@x.com",
        role: "Mathematics Teacher + 2 more",
        employeeId: "0123456789",
        contact: "09023457689",
        yearsExperience: "12 Years",
        qualifications: "B.Ed, M.Ed, Certificates",
        summary: "Mr. Samuel Daniels is a dedicated African primary school teacher who is passionate about helping young learners build confidence, curiosity, and strong academic foundations. He brings patience, creativity, and over 10 years of classroom experience to every lesson, inspiring his pupils to believe in themselves and reach their full potential.",
        subjects: [
            "Mathematics",
            "Basic Science",
            "Quantitative Reasoning"
        ]
    };

    // Reusable Section Header Component
    const SectionHeader = ({ title }) => (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group">
                <PencilLine size={18} className="group-hover:scale-110 transition-transform" />
            </button>
        </div>
    );


    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar is fixed on the left */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                        <div className="space-y-6 mt-8">

                            {/* --- 1. Personal Details Card (Full Width) --- */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <SectionHeader title="Personal Details" />
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-2">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md overflow-hidden ring-1 ring-gray-100">
                                            <img
                                                src={`${Images.profile_picture}`}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-gray-500 hover:text-blue-600">
                                            <PencilLine size={12} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 flex-1 w-full">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <User size={14} className="text-blue-500" /> {teacherData.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <Mail size={14} className="text-blue-500" /> {teacherData.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Role</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <Briefcase size={14} className="text-blue-500" /> {teacherData.role}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Employee ID</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2 hover:text-blue-600">
                                                {teacherData.employeeId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Contact Number</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <Phone size={14} className="text-blue-500" /> {teacherData.contact}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- 2. Three-Column Grid Row (Summary, Professional Details, Subjects) --- */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Teacher's Summary */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                                    <SectionHeader title="Teacher’s Summary" />
                                    <p className="text-sm leading-relaxed text-gray-600 font-medium italic mt-2">
                                        "{teacherData.summary}"
                                    </p>
                                </div>

                                {/* Professional Details */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                                    <SectionHeader title="Professional Details" />
                                    <div className="space-y-6 mt-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Years of Experience</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <Award size={16} className="text-orange-500" /> {teacherData.yearsExperience}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Qualifications</p>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                <GraduationCap size={16} className="text-blue-500" /> {teacherData.qualifications}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Subjects Taught */}
                                {/* --- 3. Subjects Taught Card --- */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                                    <h2 className="text-lg font-bold text-gray-800 mb-6">Subjects Taught</h2>

                                    <div className="space-y-3 overflow-y-auto max-h-[250px] pr-1">
                                        {teacherData.subjects.map((subject, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group"
                                            >
                                            <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                                                {subject}
                                            </span>
                                                <button
                                                    onClick={() => openModal(subject)} // <--- Trigggers the table view
                                                    className="px-3 py-1.5 text-[10px] font-bold text-blue-600 border border-blue-200 rounded-lg bg-white hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                                >
                                                    View Students
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <AccountAndClasses />
                        </div>
                    </main>
                </div>
            </div>

            <ClassSelectionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                subject={selectedSubject}
            />
        </>
    );
};

export default TeacherProfile;