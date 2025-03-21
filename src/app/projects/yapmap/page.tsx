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
        slug: 'vacansee',
        title: 'vacan.see',
        image: '/projects/vacansee.png'
    },
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

export default function YapMapProject() {
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
                command="cat projects/YapMap.md"
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
                            <span className="inline-block">YapMap</span>
                        </motion.h1>

                        <div className="space-y-8">
                            <motion.div variants={item} className="relative w-full [aspect-ratio:16/10] border-2 border-foreground shadow-custom">
                                <Image
                                    src="/projects/yapmap.png"
                                    alt="YapMap"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div variants={item} className="flex gap-3">
                                <a
                                    href="https://github.com/tahayparker/yapmap"
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
                                    href="https://yapmap.vercel.app"
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
                                <h2 id="overview" className="text-2xl font-bold">Overview</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    YapMap is a web service that creating a word cloud visualization using a web-based interface. The project is bootstrapped with Next.js, which is a React framework for building server-side rendered and static web applications.
                                </p>

                                <h2 id="key-features" className="text-2xl font-bold mt-8">Key Features</h2>
                                <ul className="list-disc pl-6 space-y-2 text-[0.9375rem] opacity-80">
                                    <li>Near-instant wordcloud generation</li>
                                    <li>Built with Next.js, TypeScript, and Tailwind CSS for performance</li>
                                    <li>Python backend hosted on Render, enabling smooth frontend-backend communication.</li>
                                </ul>

                                <h2 id="technical-details" className="text-2xl font-bold mt-8">Technical Details</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    The project utilizes Next.js for server-side rendering and static site generation. The application is built with TypeScript, ensuring type safety and improved developer experience. Tailwind CSS is used for styling, providing utility-first CSS classes for rapid development and customization.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    The backend is run by a Python script which is able to create wordclouds from a given text. The script is run on Render, which is triggered by an HTTP request from the frontend. The wordcloud is then returned to the frontend and displayed to the user.
                                </p>
                            </motion.div>

                            <motion.div id="technologies" variants={item} className="flex flex-wrap gap-2">
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Next.js
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Python
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    TypeScript
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Tailwind CSS
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