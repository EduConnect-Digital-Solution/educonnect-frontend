// src/components/auth/AuthLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Images } from '../images.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AuthLayout() {
    AOS.init(); // Initialize Animate on Scroll library
    return (
        <div>
            <div className="absolute top-0 z-50 p-5 overflow-hidden items-center w-full ">
                <NavLink to={`/`}>
                    <img
                        src={`${Images.main_logo}`}
                        alt="EduConnect Logo Icon"
                        className="w-[120px] md:w-[170px] md:ml-24"
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
                    <div className={`overflow-hidden`}>
                        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
}
