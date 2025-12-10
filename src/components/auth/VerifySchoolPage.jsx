import { Button } from "../ui/button.jsx"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp.jsx"
import React, {useEffect, useState} from "react";
import { ArrowLeft } from 'lucide-react';
import {Images} from "../images.jsx";
import {NavLink} from "react-router-dom";

export function VerifySchoolPage({ onNavigate }) {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerify = () => {
        console.log('Verification code:', verificationCode);
        onNavigate('success');
    };

    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let timer;

        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [cooldown]);

    const handleResend = () => {
        if (cooldown > 0) return;

        // 👉 Call your resend function here
        console.log("Code resent!");

        setCooldown(59); // Start cooldown
    };
    return (
        <div className="min-h-screen flex bg-[#f1fbf7] items-center justify-center p-4">
            {/*<img*/}
            {/*    alt={``}*/}
            {/*    src={`${Images.verify_bg}`}*/}
            {/*    className={`fixed inset-0 h-full w-full object-cover z-0`} // <-- Updated Classes*/}
            {/*/>*/}
            <div className="max-w-md w-full z-30">
                {/* Back button */}
                <NavLink to={`/register/admin`}>
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

                    {/* Verification Code Input */}
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

    const handleSubmit = () => {
        console.log("Submitted PIN:", pin)
    }



    return (
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto w-auto items-center content-center justify-center">
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
                <Button type="submit" className={`w-2/5  mx-auto items-center content-center justify-center`}>Submit</Button>
            </div>
        </form>
    )
}