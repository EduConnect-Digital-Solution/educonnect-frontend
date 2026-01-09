import { Button } from "../../components/ui/button.jsx"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../../components/ui/input-otp.jsx"
import React, {useEffect, useState} from "react";
import { ArrowLeft } from 'lucide-react';
import {Images} from "../../components/images.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {RegSchool, verifyOTP} from "./authAPIs.js";
import {Toast} from "../application/AdminDashboard/components/ui/Toast.jsx";

export function VerifySchoolPage({ onNavigate }) {
    // State variable to hold the user-entered verification code.
    // setVerificationCode is the function used to update this state.
    const [verificationCode, setVerificationCode] = useState('');

    // State variable to manage the resend button cooldown timer (in seconds).
    // setCooldown is the function used to update the cooldown time.
    const [cooldown, setCooldown] = useState(0);

    // useEffect hook to manage the countdown timer logic.
    // It runs whenever the 'cooldown' state changes.
    useEffect(() => {
        let timer; // Variable to hold the interval ID

        // Check if the cooldown is currently active (greater than 0 seconds).
        if (cooldown > 0) {
            // Start a new interval (timer) that executes every 1000 milliseconds (1 second).
            timer = setInterval(() => {
                // Update the cooldown state: decrease it by 1 second.
                // Using the functional update form (prev => prev - 1) ensures
                // we're working with the most current state value.
                setCooldown((prev) => prev - 1);
            }, 1000);
        }

        // Cleanup function: This runs when the component unmounts OR
        // before the effect runs again (if 'cooldown' changes).
        // It clears the interval to stop the timer and prevent memory leaks.
        return () => clearInterval(timer);

// Dependency array: The effect re-runs when 'cooldown' changes.
// This is crucial for stopping the timer when 'cooldown' hits 0.
    }, [cooldown]);

    // Handler function for the "Resend Code" action.
    const handleResend = () => {
        // 1. Check if the cooldown is still active. If it is (cooldown > 0),
        //    do nothing and exit the function early to prevent resending.
        if (cooldown > 0) return;

        // 2. If not on cooldown, set the cooldown to a specific value (e.g., 59 seconds).
        //    This immediately starts the timer managed by the useEffect hook.
        //    *Note: A subsequent network request to actually resend the code would typically
        //    be placed here before or after setting the cooldown.*
        setCooldown(59); // Start cooldown for 59 seconds (to display "Resend in 0:59")
    };
    return (
        <div className="min-h-screen flex bg-[#f1fbf7] items-center justify-center p-4">
            <div className="max-w-md w-full z-30">
                {/* Back button */}
                <NavLink to={`/register/school`}>
                    <button
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                </NavLink>

                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-4 ">
                            <img alt={`EduConnect Logo`} src={`${Images.logo_1}`} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Verify Your School
                        </h2>
                        <p className="text-gray-600">
                            We sent a 6-digit verification code to your email. Please enter the code below.
                        </p>
                    </div>

                    {/* OTP boxes Component*/}
                    <div className="mb-6 ">
                        <OtpForm />
                    </div>


                    {/* Resend link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className={`font-semibold hover:underline ${
                                cooldown > 0
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#0A61A4] cursor-pointer"
                            }`}
                        >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

function OtpForm() {
    const [pin, setPin] = useState("")
    const userEmail = location.state?.email;
    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const handleSubmit = () => {
        console.log("Submitted PIN:", pin)
        try {
            verifyOTP({email: userEmail, code: pin})
                .then(() => {
                    showToast('School registered successfully', 'success');
                    navigate('/dashboard/admin');
                });

        } catch (err) {
            const message = err?.message || err?.error || 'Registration failed';
            showToast(message, 'error');
        }

    }




    return (
        <div className="space-y-6 mx-auto w-auto items-center content-center justify-center">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            <div className="space-y-2">
                <InputOTP
                    id="otp-input"
                    maxLength={6}
                    value={pin}
                    onChange={(value) => setPin(value)}
                >
                    <InputOTPGroup className={`mx-auto items-center content-center justify-center`}>
                        <InputOTPSlot className={`p-5`} index={0} />
                        <InputOTPSlot className={`p-5`} index={1} />
                        <InputOTPSlot className={`p-5`} index={2} />
                        <InputOTPSlot className={`p-5`} index={3} />
                        <InputOTPSlot className={`p-5`} index={4} />
                        <InputOTPSlot className={`p-5`} index={5} />
                    </InputOTPGroup>
                </InputOTP>

            </div>

            <div className={`flex justify-center`}>
                <Button onClick={() => {handleSubmit()}} className={`w-2/5 mx-auto items-center content-center justify-center`}>Submit</Button>
            </div>
        </div>
    )
}