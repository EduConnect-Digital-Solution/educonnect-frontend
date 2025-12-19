import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import {Header, Sidebar} from "./AdminDashboard.jsx";


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

const AdminProfile = () => {

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar is fixed on the left */}
                <Sidebar />


                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                        <AdminInfo/>
                    </main>
                </div>
            </div>

        </>
    );
};

function AdminInfo() {
    const [formData, setFormData] = useState({
        schoolId: '',
        firstName: '',
        lastName: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // updateAdminProfile(formData)
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
                    <p className="text-sm text-gray-500">
                        Update your basic account information
                    </p>
                </div>
            </div>

            {/* Profile Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* School ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            School ID
                        </label>
                        <input
                            type="text"
                            name="schoolId"
                            value={formData.schoolId}
                            onChange={handleChange}
                            placeholder="School Identifier"
                            disabled={ true }
                            className="w-full rounded-xl py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder={`John`}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder={`Doe`}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+234 801 234 5678"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>



                {/* Actions */}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminProfile;