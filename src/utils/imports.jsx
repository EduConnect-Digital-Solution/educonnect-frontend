import {BookOpen, GraduationCap, User, UserCheck, Users} from "lucide-react";
import {Icons} from "../components/icons.jsx";
import {MapPin, Smartphone, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

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

// TODO: change email to subject taught
export const students = [
    { sn: 1, name: 'Ganiyu Abbas Quadri', class: 'Primary 1', subject: 'Mathematics', email: 'abbasquadri@gmail.com', status: 'Excellent', contact: '08034572891', avatarUrl: User, attendance: 95, behavioral: 90, participation: 98 },
    { sn: 2, name: 'Daniel Gift Ayomide', class: 'Primary 2', subject: 'Mathematics', email: 'danielgift@gmail.com', status: 'Average', contact: '09082936472', avatarUrl: User, attendance: 85, behavioral: 80, participation: 88 },
    { sn: 3, name: 'Ilori Mosope Victory', class: 'Primary 3', subject: 'Mathematics', email: 'ilorivictory@gmail.com', status: 'Needs Support', contact: '09017286735', avatarUrl: User, attendance: 70, behavioral: 65, participation: 75 },
    { sn: 4, name: 'Adeyinka Oyinkan Favour', class: 'Primary 1', subject: 'Mathematics', email: 'adeyinkafavour@gmail.com', status: 'Excellent', contact: '07017261936', avatarUrl: User, attendance: 98, behavioral: 92, participation: 99 },
    { sn: 5, name: 'Hammed Kabirat Aima', class: 'Primary 1', subject: 'Basic Science', email: 'hammedaima@gmail.com', status: 'Excellent', contact: '08026789164', avatarUrl: User, attendance: 96, behavioral: 91, participation: 97 },
    { sn: 6, name: 'Aliyu Musa Bawa', class: 'Primary 3', subject: 'Basic Science', email: 'aliyumusa@gmail.com', status: 'Average', contact: '08046738356', avatarUrl: User, attendance: 88, behavioral: 82, participation: 90 },
    { sn: 7, name: 'Abdulahi Yusufu Danladi', class: 'Primary 1', subject: 'Quantitative Reasoning', email: 'yusufdanladi@gmail.com', status: 'Excellent', contact: '07026389175', avatarUrl: User, attendance: 99, behavioral: 94, participation: 100 },
    { sn: 8, name: 'Danjuma Ibrahim Jatau', class: 'Primary 2', subject: 'Quantitative Reasoning', email: 'ibrahimjatau@gmail.com', status: 'Excellent', contact: '09027468897', avatarUrl: User, attendance: 97, behavioral: 93, participation: 98 },
    { sn: 9, name: 'Aisha Bello', class: 'Primary 1', subject: 'Mathematics', email: 'aishabello@gmail.com', status: 'Average', contact: '08012345678', avatarUrl: User, attendance: 89, behavioral: 85, participation: 92 },
    { sn: 10, name: 'Emeka Okafor', class: 'Primary 2', subject: 'Mathematics', email: 'emekaokafor@gmail.com', status: 'Excellent', contact: '08023456789', avatarUrl: User, attendance: 96, behavioral: 90, participation: 97 },
    { sn: 11, name: 'Fatima Mohammed', class: 'Primary 3', subject: 'Mathematics', email: 'fatimamohammed@gmail.com', status: 'Needs Support', contact: '08034567890', avatarUrl: User, attendance: 75, behavioral: 70, participation: 80 },
    { sn: 12, name: 'Chinedu Eze', class: 'Primary 1', subject: 'Basic Science', email: 'chinedueze@gmail.com', status: 'Excellent', contact: '08045678901', avatarUrl: User, attendance: 97, behavioral: 92, participation: 98 },
    { sn: 13, name: 'Ngozi Okonkwo', class: 'Primary 2', subject: 'Basic Science', email: 'ngoziokonkwo@gmail.com', status: 'Average', contact: '08056789012', avatarUrl: User, attendance: 88, behavioral: 84, participation: 91 },
    { sn: 14, name: 'Aminu Sani', class: 'Primary 3', subject: 'Basic Science', email: 'aminusani@gmail.com', status: 'Excellent', contact: '08067890123', avatarUrl: User, attendance: 95, behavioral: 89, participation: 96 },
    { sn: 15, name: 'Binta Suleiman', class: 'Primary 1', subject: 'Quantitative Reasoning', email: 'bintasuleiman@gmail.com', status: 'Needs Support', contact: '08078901234', avatarUrl: User, attendance: 78, behavioral: 72, participation: 81 },
    { sn: 16, name: 'Tunde Adebayo', class: 'Primary 2', subject: 'Quantitative Reasoning', email: 'tundeadebayo@gmail.com', status: 'Excellent', contact: '08089012345', avatarUrl: User, attendance: 99, behavioral: 95, participation: 100 },
];

export const children = [
    { sn: 1, name: 'Ganiyu Abbas Quadri', class: 'Primary 1', subject: 'Mathematics', email: 'abbasquadri@gmail.com', status: 'Excellent', contact: '08034572891', avatarUrl: User, attendance: 95, behavioral: 90, participation: 98 },
    { sn: 2, name: 'Daniel Gift Ayomide', class: 'Primary 2', subject: 'Mathematics', email: 'danielgift@gmail.com', status: 'Average', contact: '09082936472', avatarUrl: User, attendance: 85, behavioral: 80, participation: 88 },
    { sn: 3, name: 'Ilori Mosope Victory', class: 'Primary 3', subject: 'Mathematics', email: 'ilorivictory@gmail.com', status: 'Needs Support', contact: '09017286735', avatarUrl: User, attendance: 70, behavioral: 65, participation: 75 }
];


export const getStatusStyles = (status) => {
    switch (status) {
        case 'Excellent': return 'bg-green-100/80 text-green-800';
        case 'Average': return 'bg-blue-100/80 text-blue-800';
        case 'Needs Support': return 'bg-red-100/80 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};


// Helper to get initials for avatar fallback
export const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

export const users = [
    { sn: 1, name: 'Ganiyu Abbas Quadri', class: 'Primary 1', subject: 'Mathematics', email: 'abbasquadri@gmail.com', status: 'Excellent', contact: '08034572891', avatarUrl: User, attendance: 95, behavioral: 90, participation: 98 },
    { sn: 2, name: 'Daniel Gift Ayomide', class: 'Primary 2', subject: 'Mathematics', email: 'danielgift@gmail.com', status: 'Average', contact: '09082936472', avatarUrl: User, attendance: 85, behavioral: 80, participation: 88 },
    { sn: 3, name: 'Ilori Mosope Victory', class: 'Primary 3', subject: 'Mathematics', email: 'ilorivictory@gmail.com', status: 'Needs Support', contact: '09017286735', avatarUrl: User, attendance: 70, behavioral: 65, participation: 75 },
    { sn: 4, name: 'Adeyinka Oyinkan Favour', class: 'Primary 1', subject: 'Mathematics', email: 'adeyinkafavour@gmail.com', status: 'Excellent', contact: '07017261936', avatarUrl: User, attendance: 98, behavioral: 92, participation: 99 },
    { sn: 5, name: 'Hammed Kabirat Aima', class: 'Primary 1', subject: 'Basic Science', email: 'hammedaima@gmail.com', status: 'Excellent', contact: '08026789164', avatarUrl: User, attendance: 96, behavioral: 91, participation: 97 },
    { sn: 6, name: 'Aliyu Musa Bawa', class: 'Primary 3', subject: 'Basic Science', email: 'aliyumusa@gmail.com', status: 'Average', contact: '08046738356', avatarUrl: User, attendance: 88, behavioral: 82, participation: 90 },
    { sn: 7, name: 'Abdulahi Yusufu Danladi', class: 'Primary 1', subject: 'Quantitative Reasoning', email: 'yusufdanladi@gmail.com', status: 'Excellent', contact: '07026389175', avatarUrl: User, attendance: 99, behavioral: 94, participation: 100 },
    { sn: 8, name: 'Danjuma Ibrahim Jatau', class: 'Primary 2', subject: 'Quantitative Reasoning', email: 'ibrahimjatau@gmail.com', status: 'Excellent', contact: '09027468897', avatarUrl: User, attendance: 97, behavioral: 93, participation: 98 },
    { sn: 9, name: 'Aisha Bello', class: 'Primary 1', subject: 'Mathematics', email: 'aishabello@gmail.com', status: 'Average', contact: '08012345678', avatarUrl: User, attendance: 89, behavioral: 85, participation: 92 },
    { sn: 10, name: 'Emeka Okafor', class: 'Primary 2', subject: 'Mathematics', email: 'emekaokafor@gmail.com', status: 'Excellent', contact: '08023456789', avatarUrl: User, attendance: 96, behavioral: 90, participation: 97 },
    { sn: 11, name: 'Fatima Mohammed', class: 'Primary 3', subject: 'Mathematics', email: 'fatimamohammed@gmail.com', status: 'Needs Support', contact: '08034567890', avatarUrl: User, attendance: 75, behavioral: 70, participation: 80 },
    { sn: 12, name: 'Chinedu Eze', class: 'Primary 1', subject: 'Basic Science', email: 'chinedueze@gmail.com', status: 'Excellent', contact: '08045678901', avatarUrl: User, attendance: 97, behavioral: 92, participation: 98 },
    { sn: 13, name: 'Ngozi Okonkwo', class: 'Primary 2', subject: 'Basic Science', email: 'ngoziokonkwo@gmail.com', status: 'Average', contact: '08056789012', avatarUrl: User, attendance: 88, behavioral: 84, participation: 91 },
    { sn: 14, name: 'Aminu Sani', class: 'Primary 3', subject: 'Basic Science', email: 'aminusani@gmail.com', status: 'Excellent', contact: '08067890123', avatarUrl: User, attendance: 95, behavioral: 89, participation: 96 },
    { sn: 15, name: 'Binta Suleiman', class: 'Primary 1', subject: 'Quantitative Reasoning', email: 'bintasuleiman@gmail.com', status: 'Needs Support', contact: '08078901234', avatarUrl: User, attendance: 78, behavioral: 72, participation: 81 },
    { sn: 16, name: 'Tunde Adebayo', class: 'Primary 2', subject: 'Quantitative Reasoning', email: 'tundeadebayo@gmail.com', status: 'Excellent', contact: '08089012345', avatarUrl: User, attendance: 99, behavioral: 95, participation: 100 },
];