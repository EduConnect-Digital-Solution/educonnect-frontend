import React, { useState } from 'react';
import {
    School,
    Phone,
    Globe,
    MapPin,
    FileText,
    PencilLine,
    Power,
    Info
} from 'lucide-react';
import {Sidebar} from "../adminUtils/a_utils.jsx";
import {Header} from "../../dashboardUtilities.jsx";

const Field = ({ label, value, icon: Icon, editable }) => (
    <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {label}
        </p>
        <div className="flex items-center gap-2">
            <Icon size={14} className="text-blue-500" />
            {editable ? (
                <input
                    defaultValue={value}
                    className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <p className="text-sm font-bold text-gray-800">{value}</p>
            )}
        </div>
    </div>
);


const SchoolProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [statusReason, setStatusReason] = useState('');
    const [showDeactivationRequest, setShowDeactivationRequest] = useState(false);


    const school = {
        schoolId: 'SCH-10293',
        schoolName: 'Greenfield Academy',
        phone: '08012345678',
        address: '23 Unity Road, Lagos',
        website: 'https://greenfieldacademy.edu',
        description:
            'Greenfield Academy is committed to providing quality education with strong moral values and academic excellence.'
    };

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

                            {/* --- School Overview --- */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">School Overview</h2>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    >
                                        <PencilLine size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Field label="School Name" value={school.schoolName} icon={School} editable={isEditing} />
                                    <Field label="School ID" value={school.schoolId} icon={Info} editable={false} />
                                    <Field label="Phone" value={school.phone} icon={Phone} editable={isEditing} />
                                    <Field label="Website" value={school.website} icon={Globe} editable={isEditing} />
                                    <Field label="Address" value={school.address} icon={MapPin} editable={isEditing} />
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                        Description
                                    </p>
                                    {isEditing ? (
                                        <textarea
                                            defaultValue={school.description}
                                            rows={4}
                                            className="w-full text-sm border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-700 leading-relaxed italic">
                                            "{school.description}"
                                        </p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* --- School Status --- */}
                            {/* --- School Status (Request Based) --- */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">School Status</h2>

                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                        <Power size={12} />
                                        Active
                                    </div>
                                </div>

                                {/* Status Toggle (Request Trigger) */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-700">
                                      Request School Deactivation
                                    </span>

                                    <div
                                        onClick={() => setShowDeactivationRequest(true)}
                                        className="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer bg-gray-300 hover:bg-red-200 transition-colors"
                                    >
                                        <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 italic">
                                    Deactivation requires approval and will not take effect immediately.
                                </p>

                                {/* Deactivation Request Form */}
                                {showDeactivationRequest && (
                                    <div className="mt-6 border-t border-gray-100 pt-4 space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                                Reason for Deactivation
                                            </p>
                                            <textarea
                                                rows={3}
                                                required
                                                value={statusReason}
                                                onChange={(e) => setStatusReason(e.target.value)}
                                                placeholder="Clearly state the reason for requesting deactivation..."
                                                className="w-full text-sm border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-red-500"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowDeactivationRequest(false);
                                                    setStatusReason('');
                                                }}
                                                className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                disabled={!statusReason.trim()}
                                                onClick={() => {
                                                    // submitDeactivationRequest(statusReason)
                                                }}
                                                className={`px-4 py-2 text-sm rounded-lg text-white transition-all ${
                                                    statusReason.trim()
                                                        ? 'bg-red-600 hover:bg-red-700'
                                                        : 'bg-red-300 cursor-not-allowed'
                                                }`}
                                            >
                                                Send Deactivation Request
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>

    );
};

export default SchoolProfile;
