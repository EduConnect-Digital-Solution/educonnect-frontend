
// Success Page
import {CheckCircle2, School} from "lucide-react";

import React from "react";

export function SuccessPage({ onNavigate }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Success animation */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-2xl mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome Back!
                    </h2>
                    <p className="text-xl text-gray-600 mb-2">
                        Your account is all set up
                    </p>
                    <p className="text-gray-500">
                        Digitize your school operations with ease
                    </p>
                </div>

                {/* Illustration placeholder */}
                <div className="bg-white rounded-3xl p-12 shadow-xl mb-8">
                    <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                        <School className="w-24 h-24 text-green-600 opacity-50" />
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => console.log('Navigate to dashboard')}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 text-lg mb-4"
                >
                    Go to Dashboard
                </button>

                <button
                    onClick={() => onNavigate('welcome')}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
}