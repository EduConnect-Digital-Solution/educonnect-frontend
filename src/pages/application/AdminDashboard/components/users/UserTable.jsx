import React from 'react';
import { getInitials } from '../../utils/formatters';
import { getRoleBadgeStyle, getStatusBadgeStyle } from '../../utils/styleHelpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UserTable = ({ users, startIndex, onEdit, onDelete, onStatusChange }) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0">
                    <tr>
                        {['S/N', 'Name', 'Email', 'Role', 'Status', 'Invited By', 'Actions'].map((header) => (
                            <th key={header} className="p-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 text-sm text-gray-600">{startIndex + index + 1}.</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                            <span className="text-xs font-medium text-gray-600">{getInitials(user.name)}</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{user.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(user.role)} whitespace-nowrap`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(user.status)} whitespace-nowrap`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.inviteSentBy}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onStatusChange(user)}
                                            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            Change Status
                                        </button>
                                        <button
                                            onClick={() => onDelete(user)}
                                            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-8 text-center text-gray-500">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, goToPage }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
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

    return (
        <div className="p-4 flex justify-center items-center gap-4 border-t border-gray-100 flex-shrink-0">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
            >
                <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};


const UserTableLayout = ({
    users,
    startIndex,
    onEdit,
    onDelete,
    onStatusChange,
    currentPage,
    totalPages,
    goToPage,
    children
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            {children}
            <UserTable
                users={users}
                startIndex={startIndex}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        </div>
    );
};

export default UserTableLayout;
