// Verify School ID Page
import {useState} from "react";
import { ArrowLeft, School, User, Mail, Lock, Phone, Building2, MapPin, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export function VerifySchoolPage({ onNavigate }) {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerify = () => {
        console.log('Verification code:', verificationCode);
        onNavigate('success');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back button */}
                <button
                    onClick={() => onNavigate('createAdmin')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </button>

                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Verify Your School ID
                        </h2>
                        <p className="text-gray-600">
                            We sent a 6-digit verification code to your email/phone. Please enter the code below.
                        </p>
                    </div>

                    {/* Verification Code Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="000000"
                            maxLength="6"
                            className="w-full px-4 py-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                        Verify
                    </button>

                    {/* Resend link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Didn't receive the code?{' '}
                        <button className="text-purple-600 font-semibold hover:underline">
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}