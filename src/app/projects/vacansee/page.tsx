'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import PageLoader from '../../../components/PageLoader';
import { ExternalLink, GitHub } from 'react-feather';
import Image from 'next/image';
import Link from 'next/link';
import GoToTop from '../../../components/GoToTop';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

interface RelatedProject {
    slug: string;
    title: string;
    image: string;
}

const relatedProjects: RelatedProject[] = [
    {
        slug: 'findmyprof',
        title: 'FindMyProf',
        image: '/projects/findmyprof.png'
    }
];

const sections = [
    { id: 'background', title: 'Background' },
    { id: 'overview', title: 'Overview' },
    { id: 'key-features', title: 'Key Features' },
    { id: 'technical-details', title: 'Technical Details' },
    { id: 'related-projects', title: 'Related Projects' }
];

export default function VacanseeProject() {
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleComplete = () => {
        setTimeout(() => {
            setShowContent(true);
        }, 200);
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
            <Header />
            <GoToTop />

            <PageLoader
                command="cat projects/vacansee.md"
                responses={[
                    "Loading project details...",
                    "Compiling documentation...",
                    "Ready."
                ]}
                onComplete={handleComplete}
            />

            <motion.div
                className="max-w-[100rem] mx-auto px-4 pt-8"
                initial="hidden"
                animate={showContent ? "show" : "hidden"}
                variants={container}
            >
                <div className="flex flex-col md:flex-row gap-8 justify-center relative">
                    {/* Sidebar */}
                    <motion.aside
                        variants={item}
                        className="hidden sidebar:block w-64 fixed left-8 h-fit"
                        style={{ top: 'calc(64px + 2rem + 4rem + 2rem + 2rem)' }}
                    >
                        <nav className="space-y-2">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className={`sidebar-link ${activeSection === section.id ? 'text-foreground' : 'text-foreground/60'}`}
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.div className="flex-1 max-w-4xl space-y-8" variants={item}>
                        <motion.h1
                            className="text-4xl font-bold mb-8 font-mono"
                            variants={item}
                        >
                            <span className="inline-block">vacan.see</span>
                        </motion.h1>

                        <div className="space-y-8">
                            <motion.div variants={item} className="relative w-full [aspect-ratio:16/10] border-2 border-foreground shadow-custom">
                                <Image
                                    src="/projects/vacansee.png"
                                    alt="vacan.see"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div variants={item} className="flex gap-3">
                                <a
                                    href="https://github.com/tahayparker/vacan.see"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    <div className="flex items-center gap-4">
                                        <GitHub size={20} />
                                        <span className="opacity-80 hover:opacity-100 transition-opacity">GitHub</span>
                                    </div>
                                </a>
                                <p> | </p>
                                <a
                                    href="https://vacansee.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    <div className="flex items-center gap-4">
                                        <ExternalLink size={20} />
                                        <span className="opacity-80 hover:opacity-100 transition-opacity">Live site</span>
                                    </div>
                                </a>
                            </motion.div>

                            <motion.div variants={item} className="space-y-4">

                                <h2 id="background" className="text-2xl font-bold mt-8">Background</h2>
                                <p className="text-[0.9375rem] opacity-80 mb-8">
                                    You&apos;re in uni, and you need an emergency team meeting for your project - like, right now. All the proper meeting rooms are booked solid. Great.<br /><br />
                                    While wandering the halls in desperation, you spot a classroom. The lights are off, projector dark. Your sleep-deprived brain does some questionable math: Dark room + no projector = empty room, right? RIGHT? <br /><br />
                                    You approach the door, heart racing. The handle turns with an ominous squeak. You take one tentative step inside, then another. Your eyes haven&apos;t adjusted yet, but something feels... off. There&apos;s this weird energy in the air, like when you walk into a room where people have been talking. <br /><br />
                                    Then you hear it. A voice mid-lecture: &quot;...and that&apos;s why the quantum entanglement principle...&quot; <br /><br />
                                    Your eyes adjust to reveal your worst nightmare: forty pairs of eyes swiveling towards you like synchronized swimmers. And there, illuminated by a single shaft of light from the hallway, stands the professor. Not just any professor – it&apos;s the Dean. The same Dean who, three years ago, still remembers the time you called her &quot;mom&quot; during freshman orientation. <br /><br />
                                    You freeze. Your brain screams &quot;ABORT!&quot; but your feet are cement blocks. The silence stretches like warm cheese. Someone coughs. Someone else stifles a giggle. <br /><br />
                                    The dean&apos;s eyebrow arches so high it could qualify for its own degree. <br /><br />
                                    You manage a strangled &quot;sorry&quot; before executing the fastest backward shuffle known to mankind. The door clicks shut behind you with the finality of a coffin nail. <br /><br />
                                    Later, during your online meeting, as your teammate freezes mid-presentation for the fifth time, their face stuck in an unflattering double-chin position, you can still feel the phantom burn of embarrassment. Someone&apos;s kid screams in the background. Another teammate can&apos;t unmute. The project you&apos;ve worked on for months spirals down the drain, all because you couldn&apos;t find a proper room. <br /><br />
                                    The next morning, you swear the Dean smirks when they pass you in the hallway. That Dean&apos;s memory really is remarkable. Too remarkable. <br /><br />
                                    If only there was a way to see which rooms were available…<br />
                                </p>

                                <h2 id="overview" className="text-2xl font-bold">Overview</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    The only website you need to find empty rooms in university. Built with Next.js, TypeScript, Tailwind CSS, PostgreSQL & Prisma, vacan.see is a web application designed to help students find available rooms on campus, providing real-time availability information and interactive visualizations of room schedules.
                                </p>

                                <h2 id="key-features" className="text-2xl font-bold mt-8">Key Features</h2>
                                <ul className="list-disc pl-6 space-y-2 text-[0.9375rem] opacity-80">
                                    <li>Real-time room availability</li>
                                    <li>Search for specific rooms and their availability at specific times</li>
                                    <li>Interactive graph for all rooms</li>
                                    <li>Create custom graphs for the rooms, days and timings you care about</li>
                                    <li>Automatic updates every night to ensure the latest data</li>
                                    <li>Mobile responsive for the same great experience, no matter which device you are on</li>
                                </ul>

                                <h2 id="technical-details" className="text-2xl font-bold mt-8">Technical Details</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    The application is built using Next.js for both frontend and backend, with TypeScript providing type safety and Prisma ORM managing database operations with PostgreSQL hosted on Neon. The frontend utilizes TailwindCSS for styling, with custom animations and a responsive design that works across different devices, while the backend implements API routes for handling room availability checks, schedule data retrieval, and database operations through the Prisma client.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    The project implements an automated update system using GitHub Actions that runs daily to keep the room availability data current. This automation pipeline includes a Python-based scraper that collects timetable data, updates the PostgreSQL database through Prisma, and generates a new schedule JSON file that&apos;s used for the interactive visualizations. The application also implements caching strategies for API responses to optimize performance and reduce database load, while maintaining data consistency through scheduled updates.
                                </p>
                            </motion.div>

                            <motion.div id="technologies" variants={item} className="flex flex-wrap gap-2">
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Next.js
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    TypeScript
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Tailwind CSS
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    PostgreSQL
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Prisma
                                </span>
                            </motion.div>

                            <motion.div id="related-projects" variants={item} className="pt-8">
                                <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedProjects.map((project) => (
                                        <Link
                                            key={project.slug}
                                            href={`/projects/${project.slug}`}
                                            className="group"
                                        >
                                            <div className="relative h-48 [aspect-ratio:16/10] border-2 border-foreground shadow-custom overflow-hidden">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <h3 className="mt-3 text-lg font-bold group-hover:opacity-80 transition-opacity">
                                                {project.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
} 