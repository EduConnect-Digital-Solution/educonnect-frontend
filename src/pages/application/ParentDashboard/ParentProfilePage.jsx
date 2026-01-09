import React from 'react';
import {
    User, MapPin,
    ShieldCheck, Key,
    Edit3, Smartphone
} from 'lucide-react';
import {ParentSidebar} from "./parentUtils/p_utils.jsx";
import {Header} from "../dashboardUtilities.jsx";

const ParentProfilePage = () => {
    // Mock CompleteRegistration Data based on your screenshots
    const parent = {
        name: "Okediji Racheal",
        email: "okedijiprincess@gmail.com",
        phone: "0903 000 0000",
        address: "Lagos State, Nigeria",
        occupation: "Civil Servant",
        emergencyContact: {
            name: "Mrs. Okediji",
            phone: "0903 111 2222"
        },
        status: "Active",
        lastLogin: "11 Dec 2025, 09:05 AM",
        accountID: "PRNT-8829-01"
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar is fixed on the left */}
            <ParentSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-8 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mx-auto">

                        {/* Page Header */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-2xl font-black text-gray-800">My Profile</h1>
                                <p className="text-sm font-medium text-gray-400">Manage your personal information and account security</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                                <Edit3 size={16} /> Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* LEFT COLUMN: Main Info & Account Status */}
                            <div className="md:col-span-2 space-y-6">

                                {/* 1. Personal Information Card */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                                        <User className="text-gray-300" size={20} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Occupation</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.occupation}</p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Residential Address</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                <MapPin size={14} className="text-blue-500" />
                                                {parent.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Emergency Contact Card */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">Emergency Contact</h3>
                                        <Smartphone className="text-gray-300" size={20} />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-8">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact Name</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.emergencyContact.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact Phone</p>
                                            <p className="text-sm font-bold text-gray-700">{parent.emergencyContact.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Account Activity & Security */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-6">Account Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck className="text-green-500" size={20} />
                                                <div>
                                                    <p className="text-xs font-bold text-gray-800">Account Status</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Your account is fully verified</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase rounded-full">
                                                {parent.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 border border-gray-100 rounded-2xl">
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Last Login</p>
                                                <p className="text-xs font-bold text-gray-700">{parent.lastLogin}</p>
                                            </div>
                                            <div className="p-4 border border-gray-100 rounded-2xl">
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Account ID</p>
                                                <p className="text-xs font-bold text-gray-700">{parent.accountID}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                                            <Key size={16} /> Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentProfilePage;