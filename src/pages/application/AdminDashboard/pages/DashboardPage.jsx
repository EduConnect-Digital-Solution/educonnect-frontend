import React, {useState} from 'react';
import { Mail, BookOpen, Users, UserCheck, GraduationCap, Clock, UserPlus, ChevronRight, RefreshCw, XCircle, X} from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import AdminLayout from '../components/layout/AdminLayout';
import AnalyticsComponent from '../AnalyticsComponent';
import {formatDate} from "../utils/formatters";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import QuickActions from '../components/dashboard/QuickActions';
import {resendInvitation, terminateInvitation} from "../../../auth/authAPIs.js";

const EducationMetricCard = ({ title, value, icon: Icon, colorClass }) => {
    return (
        <div className={`p-6 rounded-xl shadow-md flex items-center justify-between min-w-[200px] ${colorClass}`}>
            <div className="flex flex-col space-y-2">
                <Icon className="w-8 h-8 opacity-70" />
                <p className="text-base font-medium opacity-80 whitespace-nowrap">{title}</p>
            </div>
            <h2 className="text-5xl font-bold">{value}</h2>
        </div>
    );
};

const AdminOverviewDashboard = ({ overview }) => {
    const metrics = [
        { title: 'Total Users', value: overview.totalUsers, icon: UserCheck, colorClass: 'bg-blue-100/50 text-gray-800' },
        { title: 'Total Active Users', value: overview.totalActiveUsers, icon: Users, colorClass: 'bg-yellow-100/50 text-gray-800' },
        { title: 'Total Students', value: overview.totalStudents, icon: BookOpen, colorClass: 'bg-green-100/50 text-gray-800' },
        { title: 'Total Invitations', value: overview.totalInvitations, icon: GraduationCap, colorClass: 'bg-purple-100/50 text-gray-800' },
        { title: 'Pending Invites', value: overview.pendingInvitations, icon: GraduationCap, colorClass: 'bg-purple-100/50 text-gray-800' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Overview</h1>
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

const RecentActivity = ({ activities }) => {
    const data = activities;
    // Combine and sort by date
    const activity = [
        ...data.users.map(u => ({ ...u, type: 'USER_REG' })),
        ...data.students.map(u => ({ ...u, type: 'STUD' })),
        ...data.invitations.map(i => ({ ...i, type: 'INVITE' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const getActionText = (item) => {
        if (item.type === 'STUD') return ' was added to the system as a student';
        if (item.type === 'USER_REG' && item.isActive) return ' joined as a ';
        return ' was invited as a ';
    };

    return (
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
                {activity.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${item.type === 'USER_REG' ? 'bg-green-50' : 'bg-blue-50'}`}>
                                {item.type === 'USER_REG' && item.isActive || item.type === 'STUD' ? <UserPlus size={18} className="text-green-600"/> : <Mail size={18} className="text-blue-600"/>}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900 leading-tight">
                                    <span className="font-semibold">{item.name || item.email}</span>
                                    {getActionText(item)}
                                    <span className="capitalize text-gray-600">{item.role}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase ${item.isActive || item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : item.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {item.status || (item.isActive ? 'Active' : 'Inactive')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const PendingInvitations = (invitations) => {
    const [showAllInvites, setShowAllInvites] = useState(false);
    if (!invitations.invitations || invitations.invitations.length === 0) return null;

    const displayInvites = invitations.invitations.slice(0, 3);
    const hasMore = invitations.invitations.length > 3;

    return (
        <>

            {/* Invitation Management Section */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Pending Invitations</h2>
                        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
                            Manage access invitations
                        </p>
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    {displayInvites.map((inv) => (
                        <InvitationItem key={inv.id} inv={inv} /> // Extracted to a sub-component for reuse
                    ))}
                </div>

                {/* See More Button - Only shows if more than 3 */}
                {hasMore && (
                    <button
                        onClick={() => setShowAllInvites(true)}
                        className="mt-6 w-full py-3 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all group flex items-center justify-center gap-2"
                    >
                        View all {invitations.invitations.length} invitations
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>


            {showAllInvites && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/40"
                        onClick={() => setShowAllInvites(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">All Invitations</h2>
                                <p className="text-sm font-medium text-gray-400">Showing {invitations.invitations.length} total sent invites</p>
                            </div>
                            <button
                                onClick={() => setShowAllInvites(false)}
                                className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable List */}
                        <div className="p-8 overflow-y-auto space-y-4">
                            {invitations.invitations.map((inv) => (
                                <InvitationItem key={inv.id} inv={inv} isFullWidth={true} />
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-50 text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                End of list
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const InvitationItem = ({inv}) => {
    // Basic date formatter for "invitedAt"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const resendCount = inv.resendCount || 0;

    const statusStyles = {
        pending: 'bg-amber-50 text-amber-600',
        accepted: 'bg-green-50 text-green-600',
        expired: 'bg-red-50 text-red-600',
        cancelled: 'bg-gray-50 text-gray-600'
    };

    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
    const [cancelInvitation, setCancelInvitation] = useState(false);

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const auth = useAuth();
    const schoolID = auth.user?.schoolId;

    const [deleteReason, setDeleteReason] = useState('');

    const resendPayload = {
        invitationId: inv.id,
        schoolId: schoolID
    }

    const cancelPayload = {
        invitationId: inv.id,
        reason: deleteReason,
        schoolId: schoolID
    }

    function handleResend() {
        resendInvitation(resendPayload).then(() => {
            showToast('Invitation resent successfully', 'success');
        })
    }

    function handleCancel() {
        terminateInvitation(cancelPayload).then(() => {
            showToast('Invite has been cancelled', 'success');
        })
    }




    return (
        <div
            className="group p-4 rounded-2xl border border-gray-50 bg-white hover:border-blue-100 hover:shadow-sm transition-all flex items-center gap-4">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            {/* Status Icon */}
            <div className={`p-3 rounded-xl bg-blue-50 text-blue-500 shrink-0`}>
                <Mail size={20}/>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-sm truncate">
                        {inv.email}
                    </h3>
                    <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${statusStyles[inv.status] || statusStyles.pending}`}>
                        {inv.status}
                    </span>
                    {/* Subtle resend count indicator next to status */}
                    {resendCount > 0 && (
                        <span className="text-[9px] font-bold text-gray-400 italic">
                            ({resendCount} {resendCount === 1 ? 'retry' : 'retries'})
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-tight">
                        {inv.role}
                    </span>
                    <span className="text-gray-200 text-xs">•</span>
                    <span className="text-[10px] font-bold text-gray-500">
                        {formatDate(inv.invitedAt)}
                    </span>
                    <span className="text-gray-200 text-xs">•</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-medium">By</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50/50 px-1.5 rounded">
                            {inv.invitedBy.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <div className="relative">
                    <button
                        onClick={handleResend}
                        title="Resend Invitation"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <RefreshCw size={14}/>
                    </button>

                    {/* Floating Badge on the Button */}
                    {resendCount > 0 && (
                        <div
                            className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white ring-2 ring-white">
                            {resendCount}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setCancelInvitation(true)}
                    title="Cancel" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <XCircle size={14}/>
                </button>
            </div>


            {cancelInvitation && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/30" onClick={() => setCancelInvitation(null)} />
                        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <button
                                onClick={() => setCancelInvitation(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div>
                                <h3 className="text-xl text-center font-bold mb-3 text-gray-900">Cancel Invitation</h3>
                                <div className="flex items-center gap-3 mb-4">

                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        {inv.email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{inv.email}</p>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-center gap-1 text-gray-600 ">
                                    <p className="text-sm ">Current Status:</p>
                                    <span className={`text-[15px] font-medium`}>
                                        {inv.status}
                                    </span>
                                </div>

                                <div className="w-full text-left mb-6">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        Reason for cancellation
                                    </label>
                                    <textarea
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                        rows="3"
                                        placeholder="Please provide a reason for cancelling this invitation..."
                                        value={deleteReason}
                                        onChange={(e) => setDeleteReason(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setCancelInvitation(null)}
                                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={!deleteReason.trim()}
                                        onClick={() => {
                                            handleCancel();
                                            setCancelInvitation(null);
                                            setDeleteReason('');
                                        }}
                                        className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardPage = () => {
    const { loading, userStats, overview, invitationList, userActivities, error } = useAnalytics();
    const { logout } = useAuth();

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Failed to load dashboard data.</div>;
    }

    return (
        <AdminLayout>
            <AdminOverviewDashboard overview={overview} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 p-2">
                <AnalyticsComponent userStatsAnalytics={userStats} />
                <QuickActions />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-2">
                <RecentActivity activities={userActivities} />
                <PendingInvitations invitations={invitationList} />
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
