import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import {Header} from "../dashboardUtilities.jsx";
import {Sidebar} from "./adminUtils/a_utils.jsx";

const AdminProfile = () => {
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
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-6">
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
                    </main>
                </div>
            </div>

        </>
    );
};



export default AdminProfile;