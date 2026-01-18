import React, {useEffect} from "react";
import {loadNeetoCalEmbed} from "../utils/functions.js";
import Footer from "../components/Footer.jsx";
import {Header} from "../components/Header.jsx";
import ContactPage from "./ContactForm.jsx";
import {Mail, MapPin, Phone} from "lucide-react";
import {ScrollToTop} from "./PricingPage.jsx";

export default function Contact() {
    useEffect(() => {
        loadNeetoCalEmbed();
    }, []);

    return (
        <>
            <Header/>
            <ScrollToTop />

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

                <section
                    id="schedule-meet"
                    className=" p-5 overflow-hidden lg:flex-row w-[90%] lg:w-[70%] mx-auto my-10 bg-[#f9f9f9] rounded-lg">
                    <h2 className="text-3xl text-center my-7 lg:text-3xl font-bold">
                        Schedule a meeting with us
                    </h2>
                    <div style={{ height: "717px", width: "100%" }} id="inline-embed-container"></div>
                </section>
            <Footer/>
        </>
    );
}