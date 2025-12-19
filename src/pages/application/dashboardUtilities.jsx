import React from "react";
import {Bell, User, } from "lucide-react";


export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex h-16 px-4 sm:px-6 lg:px-8">
                {/* Right Side: Notifications, Theme Toggle, and Profile */}
                <div className="flex items-center space-x-3 ml-auto">
                    {/* Notifications Icon */}
                    <button
                        className="p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Notifications"
                    >
                        <Bell className="w-6 h-6" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center px-3 py-2 space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 transition duration-150">
                        <span className="text-sm font-medium text-gray-800 hidden sm:block">
                            Musharof
                        </span>

                        <User className="w-6 h-6 ring-2 rounded-full ring-black" />
                    </div>
                </div>
            </div>
        </header>

    );
};

