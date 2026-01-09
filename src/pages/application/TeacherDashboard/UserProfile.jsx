import React, { useState } from 'react';
import {
    PencilLine,
    User,
    Mail,
    Briefcase,
    Phone,
    GraduationCap,
    Award, Users, BarChart3,
} from 'lucide-react';
import {AccountInfo} from "./teacherUtils/teacherComponents.jsx";
import {Images} from "../../../components/images.jsx";
import SubjectSelectionModal from "./SubjectSelectionModal.jsx";
import TeacherLayout from "./components/layout/TeacherLayout.jsx";
import {useData} from "./hooks/useData.jsx";



const TeacherProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading } = useData();

    const [selectedClass, setSelectedClass] = useState('');

    const openModal = (className) => {
        setSelectedClass(className);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClass('');
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

    if (loading) {
        return (
            <TeacherLayout>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Teacher Profile...</p>
                </div>
            </TeacherLayout>
        );
    }

    const assignedClasses = [
        {
            className: "Primary 1",
            students: 48,
            performance: 78,
        },
        {
            className: "Primary 2",
            students: 56,
            performance: 81,
        },
        {
            className: "Primary 3",
            students: 50,
            performance: 76,
        }
    ];

    return (
        <>
            <TeacherLayout>
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
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Qualifications</p>
                                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                        <GraduationCap size={16} className="text-blue-500" /> {teacherData.qualifications}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- 2. Two-Column Grid Row (Classes Assigned, Subjects Overview) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* --- 1. Classes Assigned Card (NEW FLOW) --- */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Classes Assigned</h2>
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 font-bold rounded-lg text-sm">
                                    {assignedClasses.length}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {assignedClasses.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group p-4 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {item.className}
                                            </h3>
                                            <button
                                                onClick={() => openModal(item.className)}
                                                className="px-3 py-1.5 text-[10px] font-bold text-blue-600 border border-blue-200 rounded-lg bg-white hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                            >
                                                View Students
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Student Count */}
                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/50 border border-transparent group-hover:border-blue-100 transition-all">
                                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                                                    <Users size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-800">{item.students}</p>
                                                    <p className="text-[9px] text-gray-500 font-medium">Students</p>
                                                </div>
                                            </div>

                                            {/* Performance */}
                                            <div className="flex flex-col justify-center gap-1 p-2 rounded-lg bg-green-50/50 border border-transparent group-hover:border-green-100 transition-all">
                                                <div className="flex items-center gap-1">
                                                    <BarChart3 size={12} className="text-green-600" />
                                                    <p className="text-xs font-bold text-gray-800">{item.performance}%</p>
                                                </div>
                                                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
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

                        {/* --- 2. Subjects Overview Card --- */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Subjects Overview</h2>

                            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                                {teacherData.subjects.map((subject, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                                                {subject}
                                            </span>
                                        </div>
                                        <div className="px-3 py-1 bg-blue-50/50 text-blue-700 text-[10px] font-bold rounded-full">
                                            ACTIVE
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-4 text-xs text-gray-400 italic">
                                Select a class above to view students by subject
                            </p>
                        </div>

                    </div>

                    <AccountInfo />
                </div>

                {/* Updated Modal - Now for Subject Selection */}
                <SubjectSelectionModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    className={selectedClass}
                />
            </TeacherLayout>

        </>
    );
};

export default TeacherProfile;