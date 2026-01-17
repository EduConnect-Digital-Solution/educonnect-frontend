import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
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
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);


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
            <section id="about" className="py-20 md:py-32 bg-white max-w-7xl mx-auto overflow-hidden">
                <div className="px-6 lg:px-8">
                    <div className="flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left Column: Visual Asset with Structured Frame */}
                        <div className="relative group">
                            {/* Technical "L-Frame" Accent */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-tl-3xl transition-all group-hover:-top-2 group-hover:-left-2" />

                            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 bg-slate-50 p-3 shadow-xl shadow-slate-200/40">
                                <img
                                    src={`${Images.about_us}`}
                                    alt="Academic Collaboration"
                                    className="w-full aspect-4/5 object-cover rounded-4xl transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Right Column: Narrative Content */}
                        <div className="flex flex-col">
                            {/* Registry Label */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-6 bg-[#104889]" />
                                <h2 className="text-[11px] font-bold text-[#104889] uppercase tracking-[0.4em]">
                                    Overview
                                </h2>
                            </div>

                            {/* Main Heading */}
                            <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                                The Essential Infrastructure for <span className="text-[#ffc21c]">Modern Education</span>
                            </h3>

                            {/* Body Content */}
                            <div className="space-y-6 mb-10">
                                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                    EduConnect is a specialized School Information System (SIS) architected to resolve the unique administrative complexities of schools in Northern Nigeria.
                                </p>

                                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                    Our focus remains on building high-reliability tools that perform in low-resource environments, ensuring that limited internet stability does not compromise institutional growth..
                                </p>

                                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                    By digitizing legacy manual tasks, we empower educators to shift their focus from paperwork to pupil performance, creating a transparent and data-driven learning environment.
                                </p>
                            </div>

                            {/* Technical CTA */}
                            <div>
                                <button
                                    onClick={() => handleNavClick('services')}
                                    className="group flex items-center gap-4 text-slate-900 text-[11px] font-bold uppercase tracking-[0.3em] hover:text-[#104889] transition-all"
                                >
                                    <span>Explore Capabilities</span>
                                    <div className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full group-hover:border-[#104889] group-hover:bg-slate-50 transition-all">
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*Info on EduConnect*/}
            <section className="py-24 px-6 bg-white relative overflow-hidden">
                {/* Subtle Background Grid - Optional for that technical look */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                <div className="max-w-7xl mx-auto relative">
                    {/* Header Section */}
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1.5 mb-6 border border-slate-200 rounded-full bg-slate-50">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                                Institutional Ecosystem
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            Empower Your <span className="text-[#104889]">Community</span>
                            <span className="block md:mt-2 text-slate-900/40">Through Digital Integration</span>
                        </h2>

                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                            EduConnect centralizes management, engagement, and academic tracking into a single, high-fidelity registry for modern institutions.
                        </p>
                    </div>

                    {/* Stakeholder Cards */}
                    <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stakeholders.map((stakeholder, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white border border-slate-200 rounded-4xl p-8 transition-all duration-500 hover:shadow-md hover:shadow-slate-200 hover:-translate-y-1"
                                >
                                    {/* Top Technical ID Accent */}
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`h-1.5 w-12 rounded-full bg-linear-to-r from-[#0a61a4] to-[#ffc21c] opacity-40`} />
                                    </div>

                                    <div className={`flex flex-row items-center justify-between mb-4`}>

                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                            {stakeholder.title}
                                        </h3>
                                        <span className={`text-xs font-bold tracking-tight text-slate-500 ml-3`}>{stakeholder.label}</span>
                                    </div>

                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed tracking-wide">
                                        {stakeholder.description}
                                    </p>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/*CTA Section*/}
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-7xl bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 rounded-3xl overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-16">
                        {/* Abstract Shape Section */}


                        {/* Text Content Section */}
                        <div className="w-full mx-auto text-center md:w-1/2 text-white space-y-6 md:pl-8">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Connect every action to impact
                            </h1>

                            <p className="text-gray-300 text-lg md:text-xl">
                                From classroom updates to progress tracking, EduConnect keeps everyone connected and informed with zero effort.
                            </p>

                            <div className="flex flex-col mx-auto justify-center sm:flex-row gap-4 pt-4">

                                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors">
                                    Get a demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*TODO: add the relevant icons to the services*/}
            {/*Our Services*/}
            <section id="services" className="py-12 md:py-32 bg-white relative overflow-hidden">
                {/* Background Detail: Institutional Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-40" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                    {/* Header Section */}
                    <div className="md:text-center mb-20">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-slate-300" />
                            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                                Service Catalog
                            </p>
                            <div className="h-px w-8 bg-slate-300" />
                        </div>

                        <h2 className="text-4xl md:text-6xl  font-bold text-slate-900 mb-8 tracking-tight">
                            Institutional <span className="text-[#ffc21c]">Capabilities</span>
                        </h2>

                        <div className="max-w-3xl mx-auto mb-6">
                            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                                We are building the benchmark for digital academic infrastructure in Nigeria, centralizing the learning experience into a single, high-fidelity ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Desktop Features Grid (No Icons/Numbers) */}
                    <div className="hidden md:block">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-10 hover:bg-slate-50 transition-colors duration-500 flex flex-col group"
                                >

                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                                        {feature.title}
                                    </h3>

                                    <p className="text-[16px] text-slate-500 leading-relaxed font-medium mb-8">
                                        {feature.description}
                                    </p>

                                    {/* Bottom Technical Accent */}
                                    <div className="mt-auto flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-[#104889]" />
                                        <div className="h-[1px] w-0 group-hover:w-12 bg-slate-200 transition-all duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile View: Clean Registry Style */}
                    <div className="md:hidden space-y-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 bg-slate-50 border border-slate-200 rounded-3xl"
                            >
                                <p className="text-[9px] font-bold text-[#104889] uppercase tracking-widest mb-3">
                                    Feature Registry {index + 1}
                                </p>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
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
                                        <h4 className="font-semibold mb-1">EduConnect Digital Solutions</h4>
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