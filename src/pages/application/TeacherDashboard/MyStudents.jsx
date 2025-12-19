import React, {Fragment, useState} from 'react';
import { Search, Filter, ArrowDownUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {Header, Sidebar} from "./TeacherDashboard.jsx";
import { Dialog, Transition } from '@headlessui/react';
import {getInitials, getStatusStyles, students} from "../../../utils/imports.jsx";
import StudentAnalytics from './StudentAnalytics.jsx';


const CircularProgress = ({ value, label, colorClass }) => {
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

const StudentList = () => {
    const [selectedStudentForSummary, setSelectedStudentForSummary] = useState(null);
    const [selectedStudentForDetails, setSelectedStudentForDetails] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Items per page - adjust this based on your screen height preference
    const itemsPerPage = 8;

    // Filter students based on search
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.class.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);

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

    const closePopup = () => setSelectedStudentForSummary(null);

    const handleViewDetails = (student) => {
        setSelectedStudentForDetails(student);
    };

    const handleBackFromDetails = () => {
        setSelectedStudentForDetails(null);
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

    // If viewing student details, show analytics page
    if (selectedStudentForDetails) {
        return <StudentAnalytics student={selectedStudentForDetails} onBack={handleBackFromDetails} />;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed */}
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header - Fixed */}
                <Header />

                {/* Main Content - Fixed height, no scroll */}
                <main className="flex-1 p-6 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                        {/* Header Section - Fixed */}
                        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Student List</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                {/* Search Bar */}
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search students..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* Actions */}
                                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Filter size={20} />
                                </button>
                                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowDownUp size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Table Section - Takes remaining space, no scroll */}
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 sticky top-0">
                                <tr>
                                    {['S/N', 'Student Name', 'Class', 'Email', 'Performance Status', 'Actions'].map((header) => (
                                        <th key={header} className="p-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {currentStudents.length > 0 ? (
                                    currentStudents.map((student, index) => (
                                        <tr key={student.sn} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600">{startIndex + index + 1}.</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                        <span className="text-xs font-medium text-gray-600">{getInitials(student.name)}</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{student.class}</td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{student.email}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(student.status)} whitespace-nowrap`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedStudentForSummary(student)}
                                                        className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        Summary
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewDetails(student)}
                                                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">
                                            No students found matching your search.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section - Fixed at bottom */}
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
                    </div>
                </main>
            </div>

            {/* Student Summary Popup */}
            <Transition appear show={selectedStudentForSummary !== null} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closePopup}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                                    <button
                                        onClick={closePopup}
                                        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                                    >
                                        <X size={20} />
                                    </button>

                                    {selectedStudentForSummary && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-sm mb-4">
                                                {selectedStudentForSummary.avatarUrl ? (
                                                    <img src={selectedStudentForSummary.avatarUrl} alt={selectedStudentForSummary.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-2xl font-medium text-gray-600">{getInitials(selectedStudentForSummary.name)}</span>
                                                )}
                                            </div>

                                            <Dialog.Title as="h3" className="text-xl font-bold text-gray-800 text-center">
                                                {selectedStudentForSummary.name}
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500 font-medium mb-6">{selectedStudentForSummary.class}</p>

                                            <div className="w-full border-t border-gray-100 pt-4 mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-semibold text-gray-600">Email:</span>
                                                    <span className="text-sm text-gray-800">{selectedStudentForSummary.email}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-semibold text-gray-600">Parent Contact:</span>
                                                    <span className="text-sm text-gray-800">{selectedStudentForSummary.contact}</span>
                                                </div>
                                            </div>

                                            <div className="w-full border-t border-gray-100 pt-6 grid grid-cols-3 gap-4">
                                                <CircularProgress value={selectedStudentForSummary.attendance} label="Attendance Rate" colorClass="text-green-500" />
                                                <CircularProgress value={selectedStudentForSummary.behavioral} label="Behavioral Rate" colorClass="text-green-500" />
                                                <CircularProgress value={selectedStudentForSummary.participation} label="Class Participation" colorClass="text-green-500" />
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default StudentList;