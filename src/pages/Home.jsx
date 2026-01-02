import React, {useCallback, useRef, useState} from 'react';
import {Images} from "../components/images.jsx";
import {features, reasons, stakeholders, why_choose_us_reasons, faqs, tutorials} from "../utils/imports.jsx";
import {ArrowRight, ChevronLeft, ChevronRight, Play, Send} from 'lucide-react';
import {Icons} from "../components/icons.jsx";
import { MapPin, Mail, Phone} from 'lucide-react';
import ContactPage from "./ContactForm.jsx";
import {Header} from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {NavLink} from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {SEO} from "../SEO.jsx";
// TODO: change home page services section wording about the student services
export const Home = () => {
    const [activeReason, setActiveReason] = useState(0);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [openIndex, setOpenIndex] = useState(0);


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            setTimeout(() => {
                checkScrollButtons();
            }, 300);
        }
    };

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    const handleVideoClick = (videoUrl) => {
        window.open(videoUrl, '_blank');
    };

    const mapNavKeytoID = useCallback((key) => {
        switch (key) {
            case 'home': return 'home';
            case 'about': return 'about';
            case 'services': return 'services';
            case 'resources': return 'resources';
            case 'faqs': return 'faqs';
            case 'contact': return 'contact';
        }
    }, []);

    const smoothScrollTo = useCallback((targetId) => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    const handleNavClick = useCallback((itemKey) => {
        const id = mapNavKeytoID(itemKey);
        smoothScrollTo(id);
        // Close mobile if open
    }, [mapNavKeytoID, smoothScrollTo]);
    AOS.init();
    return (
        <>
            <SEO
                title="EduConnect - Transform Your School Operations"
                description="Digital learning and school management platform built for Nigerian schools. Streamline administration, engage parents, track student progress."
                url="educonnect.com.ng"
            />

            <Header />
            {/* Hero Section */}
            <section id={"home"} className="relative mb-10 md:mb-16 w-full h-[700px] flex items-center justify-center text-center overflow-hidden">
                {/* Background Image Placeholder */}
                <img
                    src={`${Images.six}`} // Placeholder for the father and son image
                    alt="Father and son looking at a phone"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Overlay to darken the image and improve text readability */}
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

                <div className="relative z-20 p-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Bridging Schools, Teachers, and Parents for Smarter Student Growth.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 mb-10">
                        EduConnect brings everyone in a child's learning journey together on one digital platform,
                        simplifying communication, progress tracking, and nurturing success.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="px-8 py-3 bg-[#104889] text-white font-medium rounded-md hover:bg-[#FEC11B] hover:text-black transition duration-150 shadow-lg">
                            Get Connected
                        </button>
                    </div>
                </div>
            </section>

            {/*Who/What is EduConnect*/}
            <section id={"about"} className="py-10 md:py-24 lg:py-16 rounded-4xl md:my-10 bg-[#FAFAFA] max-w-7xl mx-auto">
                <div className="mx-auto px-6 lg:px-8">
                    <div className="flex flex-col-reverse md:grid grid-cols-1 gap-12 md:gap-8 md:grid-cols-2 items-center">

                        <div className="lg:mb-0">
                            <img
                                src={`${Images.about_us}`}
                                alt="Two students smiling while working on a laptop"
                                className="w-full h-full object-cover rounded-xl shadow-2xl"
                            />
                        </div>

                        {/* Right Column: Text Content */}
                        <div className="flex flex-col justify-center">

                            {/* Minor Title Cleanup */}
                            <h2 className="text-[15px] mb-4 font-bold text-[#104889]">
                                What is EduConnect
                            </h2>

                            {/* Main Title */}
                            <h3 className="text-3xl font-[590] text-gray-800 mb-6">
                                School Management System Software- A Need For All Educational Institutes
                            </h3>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                EduConnect is a robust digital platform designed to empower schools in Northern Nigeria. Our primary goals are to simplify administrative duties, significantly improve learning outcomes, and solidify communication channels between teachers, parents, and students, through the digitization of manual tasks.
                            </p>

                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                We are committed to building technology that understands the realities of our regional schools. This means developing tools that are simple, reliable, and easy to adopt even where resources are limited and internet access may not always be stable. We equip educators with the essentials they need to succeed.
                            </p>

                            {/* CTA/Link */}
                            <button
                                onClick={() => handleNavClick('services')}
                                className="text-[#104889] font-semibold tracking-wider hover:text-blue-800 transition duration-150 inline-flex items-center group"
                            >
                                Explore Our Services
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/*Info on EduConnect*/}
            <section className="py-20 px-4 bg-gradient-to-b">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="md:text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-[590] text-gray-900 mb-4">
                            Empower Everyone in Your School <span className={`text-[#104889] md:text-gray-900`}>Community</span>
                            <span className="hidden md:block mt-2">
                              with <span className="bg-clip-text text-[#104889]">EduConnect</span> Digital Learning Platform
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Discover how EduConnect is transforming the way you manage your school, engage students, and connect everyone in your educational community
                        </p>
                    </div>

                    {/* Stakeholder Cards */}
                    <div data-aos={`fade-up`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stakeholders.map((stakeholder, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`group relative border border-[#cfcfcf] bg-white rounded-2xl overflow-hidden`}
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r `}></div>

                                    <div className="p-6">
                                        <h3 className="text-2xl text-gray-900 mb-4">
                                            {stakeholder.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-[15px]">
                                            {stakeholder.description}
                                        </p>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stakeholder.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA Section */}
                    {/*<div className="mt-16 text-center">*/}
                    {/*    <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-xl">*/}
                    {/*        <div className="text-white text-left">*/}
                    {/*            <h3 className="text-2xl font-bold mb-2">Ready to Transform Your School?</h3>*/}
                    {/*            <p className="text-blue-100">Join hundreds of institutions already using EduConnect</p>*/}
                    {/*        </div>*/}
                    {/*        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg whitespace-nowrap">*/}
                    {/*            Schedule a Demo*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </section>

            {/*Our Services*/}
            <section id={"services"} className="py-20 md:py-24 lg:py-32 bg-gray-50"> {/* Light gray background for separation */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8  md:text-center">

                    {/* Main Title */}
                    <p className="text-lg text-[#104889] font-semibold ">Our Services</p>
                    <h2 className="text-4xl md:text-5xl font-[610] md:font-bold text-gray-900 mb-4">
                        What Can EduConnect Offer You?
                    </h2>
                    {/* Underline/Separator */}
                    <div className="w-24 h-1.5 bg-[#FFC21C] md:mx-auto mb-8 rounded-full"></div> {/* Professional divider */}

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
                        We aspire to become the #1 all-in-one web and mobile platform for easier and more effective learning experience in Nigeria.
                    </p>

                    {/* Supporting Text */}
                    <p className="hidden md:block text-lg text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
                        Driven by our desire to create value for educators and learners, we build trusted education solutions to help schools embrace technology and hence make learning more engaging.
                    </p>

                    {/* Features Grid */}
                    <div className={`hidden md:block`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                                >
                                    {/* Icon Placeholder */}
                                    <div className="w-20 h-20 bg-[#FFC21C] rounded-full flex items-center justify-center mb-6">
                                        <img
                                            src={feature.icon}
                                            alt={`${feature.title} icon`}
                                            className="w-10 h-10" // Adjust size of the placeholder icon itself
                                        />
                                    </div>

                                    <h3 className="text-2xl font-[590] text-gray-800 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/*Projected Mobile View*/}
                    <div className="md:hidden">
                        {/* Active Card Display */}
                        <div className="mb-8">
                            <div className="bg-white rounded-2xl p-5 shadow-2xl border-2 border-gray-100 relative overflow-hidden">
                                {/* Background gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-[#FFC21C] opacity-10 rounded-full blur-3xl`}></div>

                                <div className="relative z-10">
                                    {/* Icon and Number */}
                                    <div className="flex items-center justify-between">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center`}>
                                            <img
                                                src={features[activeReason].icon}
                                                alt={`${features[activeReason].title} icon`}
                                                className="w-10 h-10" // Adjust size of the placeholder icon itself
                                            />
                                        </div>

                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl md:text-2xl text-gray-900 mb-4">
                                        {features[activeReason].title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-[15px] md:text-lg">
                                        {features[activeReason].description}
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/*Navigation Dots*/}
                        <div className="flex justify-center gap-3 mb-6">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveReason(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        activeReason === index
                                            ? `w-12 h-3 bg-[#FFC21C]`
                                            : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`View reason ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        {/*Navigation Buttons*/}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={() => setActiveReason(Math.max(0, activeReason - 1))}
                                disabled={activeReason === 0}
                                className="p-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setActiveReason(Math.min(features.length - 1, activeReason + 1))}
                                disabled={activeReason === features.length - 1}
                                className={`px-3 bg-[#0A61A4] text-white rounded-xl font-extrabold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm`}
                            >
                                 →
                            </button>
                        </div>
                    </div>
                </div>

            </section>

            {/*CTA Section*/}
            <section className="py-20 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Content Wrapper */}
                    <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">

                        {/* Left Column: Image Placeholder */}
                        <div className="lg:w-3/5 mb-8 lg:mb-0">
                            <img
                                src={`${Images.CTA_image}`}
                                alt="Teacher meeting with parents and students"
                                className="w-full h-full object-cover rounded-xl shadow-xl"
                            />
                        </div>

                        {/* Right Column: Text Content and Button */}
                        <div className="lg:w-3/5 text-center lg:text-right">

                            {/* Main Headline */}
                            <h2 className="text-4xl md:text-4xl font-[610] text-gray-900 leading-tight mb-6">
                                One platform for parents, teachers, and students to stay in sync.
                            </h2>

                            {/* Subtext */}
                            <p  className="text-xl text-gray-700 mb-10 max-w-2xl lg:max-w-full mx-auto">
                                From classroom updates to progress tracking, EduConnect keeps everyone connected and informed with zero effort.
                            </p>

                            {/* Action Button */}
                            <NavLink to={`/register/school`}>
                                <button
                                    className="px-10 py-3 bg-[#0A61A4] text-white font-semibold rounded-lg hover:bg-[#FEC11B] hover:text-black transition duration-150 shadow-md">
                                    Get Started Today
                                </button>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </section>

            {/*Why Choose Us Section*/}
            <section className="md:py-20 py-12 md:px-4 why_choose_us_bg ">
                <div className={`max-w-7xl mx-auto `}>
                    {/* Desktop View - Circular Layout */}
                    <div className="hidden min-w-[1260px] xl:block relative bg-[#104889]/40 py-18 md:rounded-3xl">
                        <div className="mx-auto px-6 lg:px-8">
                            <h2 className="text-4xl text-center md:text-5xl font-bold text-white mb-4">
                                Why Choose us
                            </h2>
                            {/* Main Content Wrapper - Relative for absolute children */}
                            <div className="relative grid grid-cols-2 justify-center items-center min-h-[600px] lg:min-h-[700px] place-items-center mx-auto">
                                {/* 1. Circular Graphic - Absolutely Positioned */}

                                <div className={`m-auto`}>
                                    <div className="absolute left-20 top-1/2 transform -translate-y-1/2 hidden md:block">
                                        <div className="w-[460px] h-[460px] rounded-full relative">
                                            <div className="absolute overflow-y-hidden inset-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl font-semibold text-gray-700">
                                                        {/*Why Choose Us*/}
                                                        <div className="overflow-hidden">
                                                            <img
                                                                src={`${Images.why_choose_us}`}
                                                                alt="Two students smiling while working on a laptop"
                                                                className="relative"
                                                            />
                                                        </div>
                                                    </span>
                                            </div>
                                            {/* Outer Ring Effect */}
                                            <div className="absolute inset-0 rounded-full border-[20px] border-gray-100 border-opacity-30"></div>
                                        </div>
                                    </div>
                                </div>


                                {/* 2. Features List - Positioned to the right */}
                                <div className="relative right-7">
                                    {why_choose_us_reasons.map((feature) => (
                                        <div key={feature.number}
                                             className="text-left pl-10 md:pl-0  relative"
                                             style={{ right: feature.spacing }}>
                                                <span className="text-3xl font-[590] text-gray-100 opacity-75 hidden md:block" >
                                                    {feature.number}
                                                </span>
                                            <p className="text-xl font-[590] text-gray-200 mb-1">
                                                {feature.title}
                                            </p>
                                            <p className="text-base text-gray-100 mb-8">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Mobile/Tablet View - Interactive Card Carousel */}
                    <div className="xl:hidden py-12 px-6 md:px-12 md:rounded-4xl bg-gray-900 text-white"> {/* Dark blue/Black background for drama */}
                        <div className="max-w-7xl mx-auto">

                            {/* Title Section */}
                            <h2 className="text-4xl md:text-5xl font-[610] md:text-center mb-4">
                                Why Choose <span className={`text-blue-500`}>EduConnect</span>? {/* Use a bright blue highlight */}
                            </h2>
                            <div className="w-16 h-1 bg-blue-500 md:mx-auto mb-10 rounded-full"></div> {/* Professional separator */}


                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed md:text-center mb-10">
                                EduConnect delivers best-in-class school management software, complete with a customized mobile application,
                                making it the ultimate solution to monitor all school-related administrative and learning processes.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {reasons.map((reason, index) => (
                                    <div key={index} >
                                        <h3 className="flex flex-row text-lg md:text-2xl text-gray-100 mb-3">
                                            <div className={`w-[18px] h-[18px] mr-2 mt-1`}>
                                                <img
                                                    src={`${Icons.asterisk_1}`} // Placeholder for the book icon
                                                    alt="EduConnect Logo Icon"
                                                    className=""
                                                />
                                            </div>
                                            {reason.title}
                                        </h3>
                                        <p className="text-base text-gray-100 leading-relaxed">
                                            {reason.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*Tutorials Section*/}
            <section id={"resources"} className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl md:text-4xl font-[590] text-gray-900">
                            Resources
                        </h2>
                    </div>

                    {/* Scrollable Container */}
                    <div className="relative group">
                        {/* Left Scroll Button */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll('left')}
                                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-gray-50 transition-all duration-200 -ml-6 opacity-0 group-hover:opacity-100"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        )}

                        {/* Tutorials Container */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={checkScrollButtons}
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {tutorials.map((tutorial) => (
                                <div
                                    key={tutorial.id}
                                    className="flex-shrink-0 w-[320px] md:w-[380px] group/card cursor-pointer"
                                    onClick={() => handleVideoClick(tutorial.videoUrl)}
                                >
                                    {/* Video Thumbnail */}
                                    <div className="relative bg-gray-200 rounded-2xl overflow-hidden mb-4 shadow-lg hover:shadow-2xl transition-all duration-300 aspect-video">
                                        {/* Placeholder Image */}
                                        <img
                                            src={tutorial.thumbnail}
                                            alt={tutorial.title}
                                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300"></div>

                                        {/* Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover/card:scale-110 group-hover/card:bg-blue-600 transition-all duration-300">
                                                <Play className="w-8 h-8 text-gray-800 group-hover/card:text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>

                                        {/* Duration Badge */}
                                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                                            <span className="text-white text-sm font-semibold">{tutorial.duration}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover/card:text-blue-600 transition-colors duration-200">
                                        {tutorial.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        {canScrollRight && (
                            <button
                                onClick={() => scroll('right')}
                                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-gray-50 transition-all duration-200 -mr-6 opacity-0 group-hover:opacity-100"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        )}
                    </div>

                    {/* Mobile Scroll Indicator */}
                    <div className="md:hidden flex justify-center gap-2 mt-6">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <ChevronLeft className="w-4 h-4" />
                            <span>Swipe to see more</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Hide scrollbar styles */}
                <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            </section>

            {/*FAQs Section*/}
            <section id={"faqs"} className="max-w-7xl mx-auto px-6 py-16 md:px-16 lg:px-28 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Section */}
                <div>
                    <p className="text-sm text-[#104889] font-semibold tracking-widest mb-3">FAQ</p>
                    <h2 className="text-4xl font-[590] mb-4 leading-tight">
                        Frequently Asked Questions from Our Community
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        We cut through today's complexity and use whatever technology it takes to get you where want to be.
                    </p>
                </div>

                {/* Right Section */}
                <div className={`items-center`}>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3
                                    className={`text-lg font-medium transition-colors duration-200 ${
                                        openIndex === index ? "text-[#FEC11B]" : "text-gray-800"
                                    }`}
                                >
                                    {faq.question}
                                </h3>
                                <span className="text-2xl font-light text-gray-500">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            {openIndex === index && (
                                <p className="mt-3 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/*Contact Form*/}
            <section id={"contact"} className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2">

                        {/* Left Side - Contact Form */}
                        <div className="bg-white rounded-l-3xl p-8 md:p-12 shadow-xl">
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Do you have a specific inquiry?
                                </h2>
                                <p className="text-2xl font-bold text-[#104889]">Reach out!</p>
                            </div>

                            <div className="space-y-5">
                                <ContactPage/>
                            </div>
                        </div>

                        {/* Right Side - Company Info */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-r-3xl p-8 md:p-12 shadow-xl text-white items-center content-center">
                            <div className="mb-12">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    Turning big ideas into real solutions.
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    We're a passionate startup focused on delivering high-impact digital products that matter. Let's build something great together.
                                </p>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-6 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">EduConnect</h4>
                                        <p className="text-gray-300 text-sm">Abuja, Nigeria</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <a href="mailto:info@educonnect.com.ng" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            info@educonnect.com.ng
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <a href="tel:+2348012345678" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            +234 801 234 5678
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <Footer />

         </>


    )
}