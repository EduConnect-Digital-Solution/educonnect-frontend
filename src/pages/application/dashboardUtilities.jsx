import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import {NavLink} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {getInitials} from "./AdminDashboard/utils/formatters.js";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "../../components/ui/alert-dialog.jsx";

export const Header = ({handleLogout}) => {
    const {user} = useAuth();
    const role = user?.role;
    const email = user?.email;
    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ''}`
        : (user?.fullName ?? 'User');

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex h-16 px-4 sm:px-6 lg:px-8 items-center justify-end">
                <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
                    <div className="h-6 w-px bg-gray-200 mx-1"></div>
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center px-2 py-1.5 space-x-2 cursor-pointer rounded-xl transition-all duration-150 ${
                            isProfileOpen ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-blue-50 ring-offset-1">
                            {getInitials(displayName)}
                        </div>
                        <div className="hidden sm:flex flex-col items-start leading-none">
                            <span className="text-sm font-bold text-gray-800">{displayName}</span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{role}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Details</p>
                                <p className="text-sm font-bold text-gray-700 truncate">{email}</p>
                            </div>

                            <NavLink to={`/dashboard/${role}/profile`} className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <UserCircle className="w-4 h-4 mr-3" />
                                Account Profile
                            </NavLink>

                            <div className="h-px bg-gray-50 my-1"></div>


                            {/*<div className="p-4 border-t border-gray-200 shrink-0 relative z-60">*/}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            className="flex items-center cursor-pointer w-full px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Logout
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to logout?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className={` bg-red-600`}
                                                onClick={() => {handleLogout()}}
                                            >Logout</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            {/*</div>*/}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};