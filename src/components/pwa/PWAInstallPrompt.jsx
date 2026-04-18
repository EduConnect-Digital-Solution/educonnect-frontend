/**
 * PWAInstallPrompt
 *
 * Shown post-login only. Custom install UI that matches EduConnect's design.
 * - Desktop: elegant modal with feature highlights
 * - Mobile: bottom sheet style
 * - Safari: manual instructions fallback
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Wifi, Zap, Shield, ChevronRight, Share, MoreVertical } from 'lucide-react';
import { usePWAContext } from '../../contexts/PWAContext';

// Detect Safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

export function PWAInstallPrompt() {
    const { showInstallPrompt, canInstall, handleInstall, handleDismiss } = usePWAContext();
    const [visible, setVisible] = useState(false);
    const [showSafariGuide, setShowSafariGuide] = useState(false);
    const overlayRef = useRef(null);

    // Animate in
    useEffect(() => {
        if (showInstallPrompt) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [showInstallPrompt]);

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === overlayRef.current) handleDismiss();
    };

    if (!showInstallPrompt) return null;

    const features = [
        { icon: Zap,    text: 'Instant load times',       sub: 'No more waiting for pages' },
        { icon: Wifi,   text: 'Works offline',             sub: 'Access data even without internet' },
        { icon: Shield, text: 'Secure & private',          sub: 'Your data stays protected' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                ref={overlayRef}
                onClick={handleBackdropClick}
                className={`
          fixed inset-0 z-200 flex items-end md:items-center justify-center
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
                aria-modal="true"
                role="dialog"
                aria-label="Install EduConnect App"
            >
                {/* Card */}
                <div
                    className={`
            relative w-full max-w-md mx-4 mb-0 md:mb-4
            bg-white rounded-t-3xl md:rounded-3xl shadow-2xl
            overflow-hidden
            transition-all duration-500 ease-out
            ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
                >


                    {/* Mobile drag handle */}
                    <div className="flex justify-center pt-3 pb-1 md:hidden">
                        <div className="w-10 h-1 bg-gray-200 rounded-full" />
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Dismiss install prompt"
                    >
                        <X size={18} />
                    </button>

                    {/* Header */}
                    <div className="px-7 pt-5 pb-4 flex items-center gap-4">

                        <div>
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">Install EduConnect</h2>
                            <p className="text-sm text-gray-500 font-medium">Fast access, anywhere</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mx-7" />

                    {/* Body */}
                    {!showSafariGuide ? (
                        <>
                            <div className="px-7 py-5">
                                <p className="text-sm text-gray-600 font-medium mb-5 leading-relaxed">
                                    Add EduConnect to your home screen for instant access to your school dashboard,
                                    offline support, and a full-screen experience.
                                </p>

                                {/* Feature list */}
                                <div className="space-y-3 mb-6">
                                    {features.map(({ icon: Icon, text, sub }) => (
                                        <div key={text} className="flex items-center gap-3.5 p-3 bg-blue-50  rounded-xl border border-blue-100/50">
                                            <div className="w-8 h-8 rounded-lg bg-[#104889]/10 flex items-center justify-center shrink-0">
                                                <Icon size={15} className="text-[#104889]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{text}</p>
                                                <p className="text-xs text-gray-500">{sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                {canInstall ? (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleInstall}
                                            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-[#104889] text-white font-bold text-sm rounded-xl hover:bg-[#0d3a6e] active:scale-[0.98] transition-all shadow-md shadow-blue-200"
                                        >
                                            <Download size={16} />
                                            Install App
                                        </button>
                                        <button
                                            onClick={handleDismiss}
                                            className="flex-1 py-3.5 px-5 text-gray-600 font-semibold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
                                        >
                                            Not now
                                        </button>
                                    </div>
                                ) : (isSafari || isIOS) ? (
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => setShowSafariGuide(true)}
                                            className="flex items-center justify-between w-full py-3.5 px-5 bg-[#104889] text-white font-bold text-sm rounded-xl hover:bg-[#0d3a6e] transition-all"
                                        >
                      <span className="flex items-center gap-2">
                        <Download size={16} />
                        How to Install
                      </span>
                                            <ChevronRight size={16} />
                                        </button>
                                        <button onClick={handleDismiss} className="py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleDismiss}
                                        className="w-full py-3.5 px-5 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Got it
                                    </button>
                                )}
                            </div>

                            {/* Footer note */}
                            <div className="px-7 pb-6">
                                <p className="text-center text-[11px] text-gray-400">
                                    Free to install · No app store required
                                </p>
                            </div>
                        </>
                    ) : (
                        <SafariInstallGuide onClose={handleDismiss} />
                    )}
                </div>
            </div>
        </>
    );
}

/** Safari / iOS manual install instructions */
function SafariInstallGuide({ onClose }) {
    const steps = isIOS
        ? [
            { icon: <Share size={18} />, text: 'Tap the Share button at the bottom of your browser' },
            { icon: <span className="text-sm font-bold">+</span>, text: 'Scroll down and tap "Add to Home Screen"' },
            { icon: <span className="text-sm font-bold">✓</span>, text: 'Tap "Add" in the top-right corner' },
        ]
        : [
            { icon: <MoreVertical size={18} />, text: 'Click the menu (⋮) in the top-right of your browser' },
            { icon: <span className="text-sm font-bold">+</span>, text: 'Select "Install EduConnect" or "Add to Home Screen"' },
            { icon: <span className="text-sm font-bold">✓</span>, text: 'Click "Install" to confirm' },
        ];

    return (
        <div className="px-7 py-5">
            <h3 className="text-base font-bold text-gray-900 mb-1">Add to Home Screen</h3>
            <p className="text-sm text-gray-500 mb-5">
                Follow these steps to install EduConnect on your device:
            </p>

            <div className="space-y-4 mb-6">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#104889] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                            {i + 1}
                        </div>
                        <p className="text-sm text-gray-700 font-medium flex-1">{step.text}</p>
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                            {step.icon}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onClose}
                className="w-full py-3.5 px-5 bg-[#104889] text-white font-bold text-sm rounded-xl hover:bg-[#0d3a6e] transition-all"
            >
                Got it, thanks!
            </button>
        </div>
    );
}
