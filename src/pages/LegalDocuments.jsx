import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

// Import your markdown files
import termsOfService from '../Mds/terms_of_service.md?raw';
import infoSecurity from '../Mds/information_security_policy.md?raw';
import privacyPolicy from '../Mds/privacy_policy.md?raw';
import {Header} from "../components/Header.jsx";
import {Images} from "../components/images.jsx";
import Footer from "../components/Footer.jsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {ScrollToTop} from "./PricingPage.jsx";

const documents = {
    'privacy-policy': {
        title: 'Privacy Policy',
        subtitle: 'OUR PRIVACY POLICY',
        content: privacyPolicy,
        path: '/legal-documents/privacy-policy'
    },
    'terms-of-service': {
        title: 'Terms of Service',
        subtitle: 'OUR TERMS OF SERVICE',
        content: termsOfService,
        path: '/legal-documents/terms-of-service'
    },
    'information-security': {
        title: 'Information Security Policy',
        subtitle: 'OUR INFORMATION SECURITY POLICY',
        content: infoSecurity,
        path: '/legal-documents/information-security'
    }
};

// Function to create URL-friendly slug from text
const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// Function to extract headings from markdown
const extractHeadings = (markdown) => {
    const headingRegex = /^#{1,3}\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[0].split(' ')[0].length;
        const text = match[1];
        headings.push({ level, text, slug: slugify(text) });
    }

    return headings;
};

export default function LegalDocuments() {
    const { docId } = useParams();
    const navigate = useNavigate();
    const [activeDoc, setActiveDoc] = useState(docId || 'privacy-policy');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const currentDoc = documents[activeDoc];
    const tableOfContents = extractHeadings(currentDoc.content);

    const handleDocChange = (key) => {
        navigate(`/legal-documents/${key}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleTOCClick = (e, slug) => {
        e.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100; // Offset for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <Header />
            <ScrollToTop />

            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="lg:mx-30 px-6 lg:px-12 pt-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <NavLink to={`/`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </NavLink>

                        <span>›</span>
                        <span>{currentDoc.title}</span>
                    </div>
                </div>

                {/* Mobile Document Selector */}
                <div className="lg:hidden max-w-7xl mx-auto px-6 mt-6">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                        <span className="font-medium text-gray-900">{currentDoc.title}</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {mobileMenuOpen && (
                        <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg">
                            {Object.entries(documents).map(([key, doc]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveDoc(key);
                                        setMobileMenuOpen(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                                        activeDoc === key
                                            ? 'bg-gray-50 text-gray-900 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {doc.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Layout */}
                <div className="lg:mx-30 px-6 lg:px-12 py-12">
                    <div className="flex gap-12">
                        {/* Sidebar - Desktop Only */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
                                {/* Document Selector */}
                                <div className="mb-8">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-1">
                                        Documentation
                                    </p>
                                    <div className="space-y-1">
                                        {Object.entries(documents).map(([key, doc]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setActiveDoc(key);
                                                    handleDocChange(key)
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                                    activeDoc === key
                                                        ? 'bg-[#0A61A4] text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {doc.title}

                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Table of Contents */}
                                <div className="border-l-2 border-gray-200 pl-4">
                                    <nav className="space-y-2">
                                        {tableOfContents.slice(0, 15).map((heading, idx) => (
                                            <a
                                                key={idx}
                                                href={`#${heading.slug}`}
                                                onClick={(e) => handleTOCClick(e, heading.slug)}
                                                className={`block text-sm hover:text-[#0A61A4] transition-colors cursor-pointer ${
                                                    heading.level === 1 ? 'font-medium text-gray-900' : 'text-gray-500'
                                                }`}
                                                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                                            >
                                                {heading.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            <article>
                                {/* Header */}
                                <div className="mb-12">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        {currentDoc.subtitle}
                                    </p>
                                    <h1 className="text-5xl font-bold text-gray-900">
                                        {currentDoc.title}
                                        <span className="text-[#0A61A4]">.</span>
                                    </h1>
                                </div>

                                {/* Content */}
                                {/* Main Content wrapper in LegalDocuments.jsx */}
                                <div className="prose
                                     prose-lg max-w-none
                                     prose-headings:font-semibold
                                     prose-h2:text-lg
                                     prose-p:text-[15px]
                                     prose-p:text-gray-800
                                     prose-li:text-[15px]
                                     prose-li:text-gray-800
                                     prose-a:text-[#0A61A4]
                                     prose-headings:scroll-mt-28">
                                    <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                                        {currentDoc.content}
                                    </ReactMarkdown>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>

                {/*CTA Section*/}
                <section className="py-10 md:py-14 mt-10 lg:py-22 bg-gradient-to-r from-gray-50 to-gray-100">
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
                                    <h2 className="text-3xl md:text-4xl font-[610] text-gray-900 leading-tight mb-6">
                                        One platform for parents, teachers, and students to stay in sync.
                                    </h2>

                                    {/* Subtext */}
                                    <p  className="text-lg text-gray-700 mb-10 max-w-2xl lg:max-w-full mx-auto">
                                        From classroom updates to progress tracking, EduConnect keeps everyone connected and informed with zero effort.
                                    </p>

                                    {/* Action Button */}
                                    <NavLink to={`/`}>
                                        <button
                                            className="px-10 py-3 bg-[#0A61A4] text-white font-semibold rounded-lg hover:bg-[#FEC11B] hover:text-black transition duration-150 shadow-md">
                                            Schedule a Call
                                        </button>
                                    </NavLink>

                                </div>
                            </div>
                        </div>
                    </section>
            </div>
            <Footer/>
        </>
    );
}