/**
 * PWAContext
 *
 * Wraps the app to provide PWA state and actions globally.
 * Connects to AuthContext so install prompt is auth-aware.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const INSTALL_DISMISS_KEY = 'educonnect_pwa_dismissed_at';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const PWAContext = createContext(null);

export function PWAProvider({ children }) {
    const { isAuthenticated } = useAuth();

    const [swRegistration, setSwRegistration]     = useState(null);
    const [updateAvailable, setUpdateAvailable]   = useState(false);
    const [isInstalled, setIsInstalled]           = useState(false);
    const [isOnline, setIsOnline]                 = useState(navigator.onLine);
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt]   = useState(false);
    const [justInstalled, setJustInstalled]           = useState(false);
    const [swVersion, setSwVersion]               = useState(null);

    const promptTimerRef = useRef(null);

    // ── Detect if already installed ──────────────────────────────────────────
    useEffect(() => {
        // Standalone mode = installed
        const mq = window.matchMedia('(display-mode: standalone)');
        setIsInstalled(mq.matches || window.navigator.standalone === true);

        const handler = (e) => setIsInstalled(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // ── Online / Offline tracking ─────────────────────────────────────────────
    useEffect(() => {
        const goOnline  = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener('online',  goOnline);
        window.addEventListener('offline', goOffline);
        return () => {
            window.removeEventListener('online',  goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    // ── Register Service Worker ───────────────────────────────────────────────
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        let mounted = true;

        const registerSW = async () => {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                    updateViaCache: 'none', // Always check network for SW updates
                });

                if (!mounted) return;
                setSwRegistration(registration);
                console.log('[PWA] Service Worker registered:', registration.scope);

                // Detect update available (new SW waiting)
                if (registration.waiting) {
                    setUpdateAvailable(true);
                }

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            if (mounted) setUpdateAvailable(true);
                        }
                    });
                });

                // Periodic update check (every 60 seconds while active)
                const intervalId = setInterval(() => registration.update(), 60_000);

                // Get SW version
                const messageChannel = new MessageChannel();
                messageChannel.port1.onmessage = (e) => {
                    if (e.data?.version && mounted) setSwVersion(e.data.version);
                };
                navigator.serviceWorker.controller?.postMessage(
                    { type: 'GET_VERSION' },
                    [messageChannel.port2]
                );

                return () => clearInterval(intervalId);
            } catch (err) {
                console.error('[PWA] SW registration failed:', err);
            }
        };

        registerSW();

        // Listen for SW version updates via postMessage
        const handleSWMessage = (event) => {
            if (event.data?.type === 'SW_UPDATED') {
                if (mounted) setUpdateAvailable(true);
            }
        };
        navigator.serviceWorker.addEventListener('message', handleSWMessage);

        return () => {
            mounted = false;
            navigator.serviceWorker.removeEventListener('message', handleSWMessage);
        };
    }, []);

    // ── Capture beforeinstallprompt ────────────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            e.preventDefault(); // Prevent default browser mini-infobar
            setInstallPromptEvent(e);
            console.log('[PWA] Install prompt captured and deferred');
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    // ── Track app installed event ──────────────────────────────────────────────
    useEffect(() => {
        const handler = () => {
            setIsInstalled(true);
            setInstallPromptEvent(null);
            setShowInstallPrompt(false);
            setJustInstalled(true);
            setTimeout(() => setJustInstalled(false), 5000);
            console.log('[PWA] App installed!');
        };

        window.addEventListener('appinstalled', handler);
        return () => window.removeEventListener('appinstalled', handler);
    }, []);

    // ── Show install prompt logic (post-login only) ────────────────────────────
    useEffect(() => {
        if (!isAuthenticated) {
            setShowInstallPrompt(false);
            return;
        }
        if (isInstalled || !installPromptEvent) return;

        // Check dismiss cooldown
        const dismissedAt = localStorage.getItem(INSTALL_DISMISS_KEY);
        if (dismissedAt) {
            const elapsed = Date.now() - parseInt(dismissedAt, 10);
            if (elapsed < DISMISS_COOLDOWN_MS) return;
        }

        // Delay prompt slightly after login for better UX (3 seconds)
        promptTimerRef.current = setTimeout(() => {
            setShowInstallPrompt(true);
        }, 3000);

        return () => clearTimeout(promptTimerRef.current);
    }, [isAuthenticated, isInstalled, installPromptEvent]);

    // ── Actions ───────────────────────────────────────────────────────────────

    /** Trigger native install flow */
    const handleInstall = useCallback(async () => {
        if (!installPromptEvent) return;
        setShowInstallPrompt(false);
        await installPromptEvent.prompt();
        const { outcome } = await installPromptEvent.userChoice;
        console.log('[PWA] Install outcome:', outcome);
        setInstallPromptEvent(null);
    }, [installPromptEvent]);

    /** Dismiss install prompt and set cooldown */
    const handleDismiss = useCallback(() => {
        setShowInstallPrompt(false);
        localStorage.setItem(INSTALL_DISMISS_KEY, Date.now().toString());
        console.log('[PWA] Install prompt dismissed');
    }, []);

    /** Apply SW update – reload page after activation */
    const applyUpdate = useCallback(() => {
        if (!swRegistration?.waiting) {
            window.location.reload();
            return;
        }
        // Tell waiting SW to skip waiting and activate
        swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        // Reload once the new SW activates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        }, { once: true });
    }, [swRegistration]);

    /** Clear user-specific cached data on logout */
    const clearUserCache = useCallback(() => {
        if (!navigator.serviceWorker.controller) return;
        const channel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage(
            { type: 'CLEAR_USER_CACHE' },
            [channel.port2]
        );
    }, []);

    const pwa = {
        // State
        isOnline,
        isInstalled,
        updateAvailable,
        showInstallPrompt,
        justInstalled,
        swVersion,
        canInstall: !!installPromptEvent && !isInstalled,

        // Actions
        handleInstall,
        handleDismiss,
        applyUpdate,
        clearUserCache,
    };

    return (
        <PWAContext.Provider value={pwa}>
            {children}
        </PWAContext.Provider>
    );
}

export function usePWAContext() {
    const ctx = useContext(PWAContext);
    if (!ctx) throw new Error('usePWAContext must be used within <PWAProvider>');
    return ctx;
}
