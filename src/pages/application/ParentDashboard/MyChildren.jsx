import React from 'react';
import { Search, Filter, ArrowDownUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {Header, Sidebar} from "../TeacherDashboard/TeacherDashboard.jsx";
import {
    Users, BookOpen, GraduationCap,
     ArrowUpRight, LayoutDashboard
} from 'lucide-react';
import {MoreHorizontal, Mail, Phone} from 'lucide-react';
import {ParentSidebar} from "./ParentDashboard.jsx";
import {Images} from "../../../components/images.jsx";

const ChildSelectionPage = () => {
    // Mock Data for the 3 Children
    const children = [
        {
            id: 1, name: "Ganiu Abbas Quadri", class: "Primary 1",
            email: "abbasquadri@x.com", contact: "08034572891",
            attendance: 98, behavior: 86, participation: 74,
            image: Images.childPortrait
        },
        {
            id: 2, name: "Daniel Gift Ayomide", class: "Primary 1",
            email: "danielgift@x.com", contact: "09082936472",
            attendance: 85, behavior: 80, participation: 88,
            image: Images.childPortrait
        },
        {
            id: 3, name: "Ilori Mosope Victory", class: "Primary 1",
            email: "ilorivictory@x.com", contact: "09017286735",
            attendance: 92, behavior: 90, participation: 82,
            image: Images.childPortrait
        }
    ];

    // Component for the Overview Cards at the top
    const SummaryCard = ({ title, value, icon: Icon, color }) => (
        <div className={`flex items-center justify-between p-6 rounded-2xl shadow-sm border border-gray-100 ${color}`}>
            <div>
                <Icon size={24} className="mb-2 opacity-80" />
                <p className="text-sm font-bold opacity-70">{title}</p>
            </div>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    );

    // Circular Progress Stat
    const StatRing = ({ percentage, label }) => {
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

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar is fixed on the left */}
            <ParentSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">
                    <div className="p-8 bg-gray-50 min-h-screen">
                        {/* --- Top Overview Section --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <SummaryCard title="Enrolled Children" value="3" icon={Users} color="bg-blue-50 text-blue-700" />
                            <SummaryCard title="Total Subjects" value="18" icon={BookOpen} color="bg-orange-50 text-orange-700" />
                            <SummaryCard title="Average Performance" value="84%" icon={GraduationCap} color="bg-purple-50 text-purple-700" />
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Child Profiles</h2>
                            <p className="text-gray-500 text-sm font-medium">Select a child to view detailed reports and subject performance.</p>
                        </div>

                        {/* --- Main Gallery: Side-by-Side Child Detail Cards --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {children.map((child) => (
                                <div key={child.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow relative group">

                                    {/* Profile Header */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 rounded-full scale-110 border-dashed group-hover:animate-spin-slow" />
                                        <img src={child.image} alt={child.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md relative z-10" />
                                        {/*<span className="w-24 p-5  h-24 rounded-full border-4  shadow-md relative z-10"> {child.name}</span>*/}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 text-center">{child.name}</h3>
                                    <p className="text-sm font-bold text-gray-400 mb-6">{child.class}</p>

                                    <div className="w-full border-t border-gray-50 pt-6 mb-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Mail size={16} className="text-gray-300" />
                                            <span className="text-xs font-bold text-gray-600">{child.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone size={16} className="text-gray-300" />
                                            <span className="text-xs font-bold text-gray-600">{child.contact}</span>
                                        </div>
                                    </div>

                                    {/* Performance Stats Rings */}
                                    <div className="grid grid-cols-3 gap-2 w-full mb-8">
                                        <StatRing percentage={child.attendance} label="Attendance" />
                                        <StatRing percentage={child.behavior} label="Overall" />
                                        <StatRing percentage={child.participation} label="Behaviour" />
                                    </div>

                                    {/* View More Button (Redirect Action) */}
                                    {/*<button className="w-full py-4 bg-gray-50 text-blue-600 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all group-hover:shadow-lg group-hover:shadow-blue-100">*/}
                                    {/*    View More Details <ArrowUpRight size={18} />*/}
                                    {/*</button>*/}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default ChildSelectionPage;