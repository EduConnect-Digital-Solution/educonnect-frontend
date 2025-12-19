import React from 'react';
import { ShieldCheck, GraduationCap, Users, ArrowRight } from 'lucide-react';
import {NavLink} from "react-router-dom";
import {Images} from "../../components/images.jsx";

const RoleCard = ({ title, description }) => (
    <button className="group relative w-full p-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 active:scale-[0.98]">
        <div className="flex items-center gap-5">
            <div className="text-left">
                <h3 className="font-bold text-gray-900 group-hover:text-[#0A61A4] transition-colors">{title}</h3>
                <p className="text-xs text-gray-500 font-medium">{description}</p>
            </div>
        </div>
        <ArrowRight size={18} className="text-gray-300 group-hover:text-[#0A61A4] group-hover:translate-x-1 transition-all" />
    </button>
);

export default function AuthWelcome() {
    return (
        <>
            <div className="relative w-full flex items-center justify-center overflow-hidden ">

                {/* --- MAIN CONTENT --- */}
                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                            EduConnect
                        </h2>
                        <p className="text-gray-500 font-medium">
                            Welcome back! Please select your portal to continue.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <NavLink to={`/login?role=admin`}>
                            <RoleCard
                                title="School Administrator"
                                description="Manage staff, students, and finances"
                                colorClass="bg-blue-50 text-blue-600"
                            />
                        </NavLink>

                        <NavLink to={`/login?role=teacher`}>
                            <RoleCard
                                title="Teacher"
                                description="Access classrooms, grades, and lessons"
                                colorClass="bg-green-50 text-green-600"
                            />
                        </NavLink>

                        <NavLink to={`/login?role=parent`}>
                            <RoleCard
                                title="Parent"
                                description="Monitor your child's progress and fees"
                                colorClass="bg-purple-50 text-purple-600"
                            />
                        </NavLink>

                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                            Secure Access Portal
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
}