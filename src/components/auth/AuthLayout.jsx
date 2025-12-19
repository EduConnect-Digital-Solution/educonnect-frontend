// src/components/auth/AuthLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Images } from '../images.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AuthLayout() {
    AOS.init(); // Initialize Animate on Scroll library
    return (
        <>
            <div className="hidden z-50 md:flex items-center absolute space-x-2">
                <NavLink to={`/`}>
                    <img
                        src={`${Images.main_logo}`}
                        alt="EduConnect Logo Icon"
                        className="w-[120px] md:w-[170px] md:ml-24 my-6"
                    />
                </NavLink>
            </div>
            <div className="min-h-screen w-full z-50 flex bg-white">
                {/*LEFT SIDE IMAGE*/}
                <div className={`hidden xl:flex bg-gray-100 w-1/2`}>
                    <div className="flex h-full relative p-25">
                        <img
                            src={`${Images.auth}`}
                            alt="school children"
                            className="rounded-2xl object-cover"
                        />
                        {/* dark overlay */}
                        <div className="absolute inset-0 rounded-2xl m-25 bg-black/40" />

                        {/* text */}
                        <div data-aos={`fade-up`} className="absolute bottom-10 left-10 m-25 text-white max-w-lg">
                            <h1 className="text-3xl font-bold mb-3">
                                Streamlining administration and management processes for schools
                            </h1>
                            <p className="text-gray-200">
                                Empowering schools with efficient school management and administrative solutions that ensure
                                efficiency, accuracy, and compliance across every level.
                            </p>
                        </div>
                    </div>
                </div>
                {/* RIGHT SIDE FORM */}
                <div className="lg:max-w-3xl w-full mx-auto p-8 md:p-20 flex flex-col justify-center">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
