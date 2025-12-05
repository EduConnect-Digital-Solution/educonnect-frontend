import {BookOpen, GraduationCap, UserCheck, Users} from "lucide-react";
import {Icons} from "../components/icons.jsx";
import {useState} from "react";
import { CheckCircle2, MapPin, Smartphone, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

export const stakeholders = [
    {
        icon: Users,
        title: "School Administrators",
        description: "Enable school leaders with a comprehensive platform that simplifies managing the entire school ecosystem. Access real-time analytics, streamline operations, and make data-driven decisions that drive institutional excellence and continuous improvement.",
        gradient: "from-blue-600 to-blue-700",
        accentColor: "bg-blue-50",
        borderColor: "border-blue-100"
    },
    {
        icon: BookOpen,
        title: "Teachers",
        description: "Help educators reclaim valuable time and energy with intuitive tools that optimize daily tasks. From lesson planning to assessment, our platform enables teachers to focus on what truly matters, educating students and fostering academic success.",
        gradient: "from-indigo-600 to-indigo-700",
        accentColor: "bg-indigo-50",
        borderColor: "border-indigo-100"
    },
    {
        icon: GraduationCap,
        title: "Students",
        description: "Engage learners with interactive experiences that transform education into an exciting journey. Our platform makes studying effective and enjoyable, promoting active participation and accelerating academic growth through personalized learning pathways.",
        gradient: "from-purple-600 to-purple-700",
        accentColor: "bg-purple-50",
        borderColor: "border-purple-100"
    },
    {
        icon: UserCheck,
        title: "Parents & Guardians",
        description: "Strengthen the vital school-home connection with unprecedented transparency and engagement. Stay informed about your child's academic progress, attendance, behavior, and school activities, all in one comprehensive, easy-to-use platform.",
        gradient: "from-violet-600 to-violet-700",
        accentColor: "bg-violet-50",
        borderColor: "border-violet-100"
    }
];

export const features = [
    {
        icon: Icons.sch_management, // Placeholder for phone icon
        title: 'School Management System',
        description: 'Digital tools for managing attendance, student\n' +
            'records, classes, and reporting, all in one place.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.result, // Placeholder for hand tap icon
        title: 'Results & Assessment Automation',
        description: 'Easily process assessments, calculate results,\n' +
            'and generate digital report cards without\n' +
            'manual work.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.dashboard, // Placeholder for desktop icon
        title: 'Teacher & Student Portals',
        description: 'Simple dashboards for teachers to manage\n' +
            'classes and students to access learning\n' +
            'resources.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.communication, // Placeholder for desktop icon
        title: 'Parent Communication System',
        description: 'Instant updates for parents on attendance,\n' +
            'performance, and school activities, improving\n' +
            'engagement and trust.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.digital, // Placeholder for desktop icon
        title: 'Digital Learning Tools',
        description: 'Upload lessons, assignments, and learning\n' +
            'materials so students can learn anytime even\n' +
            'with low-data access.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.performance, // Placeholder for desktop icon
        title: 'Student Performance Analytics',
        description: 'Track academic growth and identify students\n' +
            'who need support early, preventing learning\n' +
            'gaps.',
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Icons.support, // Placeholder for desktop icon
        title: 'Onboarding & Support',
        description: 'We provide training, guidance, and continuous\n' +
            'support to ensure schools adopt technology\n' +
            'smoothly and confidently.',
        color: "from-blue-500 to-blue-600"
    },

];

export const why_choose_us_reasons = [
    {
        number: 1,
        title: 'Built for Northern Nigerian Schools',
        description: 'We understand the challenges, culture, and learning environment, and we design with that in mind.',
        spacing: "200px",
    },
    {
        number: 2,
        title: 'Simple & Easy To Use',
        description: 'No tech experience needed; our intuitive platform is designed for everyone, not tech experts.',
        spacing: "80px",
    },
    {
        number: 3,
        title: 'Affordable & Accessible',
        description: 'Flexible plans, moderate-data usage, and simple design to fit every school size, budget and expertise.',
        spacing: "",
    },
    {
        number: 4,
        title: 'Real Classroom Impact',
        description: 'Less paperwork. More teaching. Better results. Happier parents. Supported students.',
        spacing: "",
    },
    {
        number: 5,
        title: 'Local Support & Training',
        description: 'We don\'t just give you software, we accompany your school every step of the way.',
        spacing: "80px",
    },
    {
        number: 6,
        title: 'Future-Ready Education',
        description: 'We help schools prepare students for a digital world without overwhelming them with complicated tools.',
        spacing: "200px",
    },
];

export const reasons = [
    {
        icon: MapPin,
        title: "Built for Northern Nigerian Schools",
        description: "We understand the challenges, culture, and learning environment, and we design with that in mind.",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Smartphone,
        title: "Simple & Easy To Use",
        description: "No tech experience needed; our platform is designed for teachers first, not tech experts.",
        color: "from-indigo-500 to-indigo-600"
    },
    {
        icon: DollarSign,
        title: "Affordable & Accessible",
        description: "Flexible plans, low-data usage, and mobile-first design to fit every school size and budget.",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: TrendingUp,
        title: "Real Classroom Impact",
        description: "Less paperwork. More teaching. Better results. Happier parents. Supported students.",
        color: "from-violet-500 to-violet-600"
    },
    {
        icon: Users,
        title: "Local Support & Training",
        description: "We don't just give you software, we accompany your school every step of the way.",
        color: "from-fuchsia-500 to-fuchsia-600"
    },
    {
        icon: Sparkles,
        title: "Future-Ready Education",
        description: "We help schools prepare students for a digital world without overwhelming them with complicated tools.",
        color: "from-pink-500 to-pink-600"
    }
];

export const faqs = [
    // TODO: Get more questions from GradeLink SIS
    {
        question: "What is EduConnect and who can use it?",
        answer:
            "An accounting company ensures accurate bookkeeping, financial reporting, and compliance with tax regulations.",
    },
    {
        question: "Is EduConnect free to use?",
        answer:
            "You can place the 1C Base customer within your secured accounting infrastructure.",
    },
    {
        question: "How does EduConnect ensure data privacy and security?",
        answer:
            "Payments can typically be made via bank transfer, card, or an online payment portal.",
    },
    {
        question: "How long does it take to set up EduConnect?",
        answer:
            "We continually evaluate service quality through audits and customer feedback.",
    },
    {
        question: "Can you Import our existing Student Data",
        answer:
            "We continually evaluate service quality through audits and customer feedback.",
    },
];

export const tutorials = [
    {
        id: 1,
        title: "What Edtech Needs To Succeed",
        thumbnail: "https://img.youtube.com/vi/MchbESmnh6w/maxresdefault.jpg",
        videoUrl: " https://www.youtube.com/watch?v=MchbESmnh6w&pp=ygURZWR0ZWNoIGluIG5pZ2VyaWE%3D",
        duration: "5:30"
    },
    {
        id: 2,
        title: "Managing Your Child's Learning Journey",
        thumbnail: "https://img.youtube.com/vi/XTdwC6XFx2w/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=XTdwC6XFx2w&pp=ygURZWR0ZWNoIGluIG5pZ2VyaWE%3D",
        duration: "8:45"
    },
    {
        id: 3,
        title: "DAY BREAK SHOW: Education Technology",
        thumbnail: "https://img.youtube.com/vi/39CuaITruZU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=39CuaITruZU&pp=ygURZWR0ZWNoIGluIG5pZ2VyaWE%3D",
        duration: "6:15"
    },

];

export const navItems = [
    { key: 'home',  label: 'Home', hasDropdown: false },
    { key: 'about',  label: 'About Us', hasDropdown: false },
    { key: 'services', label: 'Services', hasDropdown: false },
    { key: 'resources',  label: 'Resources', hasDropdown: false },
    { key: 'faqs',  label: 'FAQs', hasDropdown: false },
];