'use client';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../components/Header';
import PageLoader from '../../../components/PageLoader';
import Image from 'next/image';
import Link from 'next/link';
import GoToTop from '../../../components/GoToTop';
import { ChevronLeft, ChevronRight, ExternalLink, GitHub } from 'react-feather';

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
        slug: 'csci291',
        title: 'Webots Simulation',
        image: '/projects/csci291.png'
    },
    {
        slug: 'ecte233',
        title: 'Custom 4-bit ALU',
        image: '/projects/ecte233.png'
    }
];

const sections = [
    { id: 'objective', title: 'Objective' },
    { id: 'overview', title: 'Overview' },
    { id: 'key-features', title: 'Key Features' },
    { id: 'technical-details', title: 'Technical Details' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'report', title: 'Report' },
    { id: 'related-projects', title: 'Related Projects' }
];

const images = [
    {
        type: 'image',
        src: '/projects/engg100/rtss.png',
        alt: 'Simulation Tab',
        caption: 'The simulation tab of the app'
    },
    {
        type: 'image',
        src: '/projects/engg100/graphs.png',
        alt: 'Graphs',
        caption: 'Acceleration, velocity, and displacement graphs'
    },
    {
        type: 'image',
        src: '/projects/engg100/history.png',
        alt: 'History Tab',
        caption: 'History tab for saving and comparing simulation runs'
    },
];

export default function Engg100Project() {
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const [currentImage, setCurrentImage] = useState(0);
    const constraintsRef = useRef(null);

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

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            prevImage();
        } else if (info.offset.x < -100) {
            nextImage();
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
            <Header />
            <GoToTop />

            <PageLoader
                command="cat projects/engg100.m"
                responses={[
                    "function [x,y,v,a] = projectile_motion(d,h,g,v0,theta0)",
                    "    % This function calculates the projectile motion",
                    "end",
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
                            <span className="inline-block">Projectile Simulator</span>
                        </motion.h1>

                        <div className="space-y-8">
                            <motion.div variants={item} className="relative w-full [aspect-ratio:15/10] border-2 border-foreground shadow-custom">
                                <Image
                                    src="/projects/projsim.png"
                                    alt="ENGG100"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div variants={item} className="flex gap-3">
                                <a
                                    href="https://github.com/tahayparker/ProjectileSimulator"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    <div className="flex items-center gap-4">
                                        <GitHub size={20} />
                                        <span className="opacity-80 hover:opacity-100 transition-opacity">GitHub</span>
                                    </div>
                                </a>
                            </motion.div>

                            <motion.div variants={item} className="space-y-4">

                                <h2 id="objective" className="text-2xl font-bold mt-8">Objective</h2>
                                <p className="text-[0.9375rem] opacity-80 mb-8">
                                    To analyze and simulate the dynamics of a projectile motion scenario using MATLAB. The simulation includes determining the required initial velocity and launch angle for an object to successfully reach a basketball ring located behind a building, based on user-defined input parameters.
                                </p>
                                <h2 id="overview" className="text-2xl font-bold">Overview</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    This project investigates projectile motion dynamics by modeling and solving equations using MATLAB. The problem involves launching an object from the origin with specific velocity and angle to land in a basketball ring positioned at a certain height and distance from the building. The work includes a MATLAB application that dynamically calculates and visualizes projectile paths, maximum heights, and required conditions for successful landing.
                                </p>

                                <h2 id="key-features" className="text-2xl font-bold mt-8">Key Features</h2>
                                <ul className="list-disc pl-6 space-y-2 text-[0.9375rem] opacity-80">
                                    <li>Analyze object movement using dynamic equations for projectile motion.</li>
                                    <li>Interactive MATLAB program to compute launch velocity and angle based on user-defined inputs</li>
                                    <li>Capability to visualize trajectories with a GUI</li>
                                    <li>Real-time calculations for position and maximum height at any time</li>
                                    <li>Inclusion of graphical outputs and detailed reports of operating conditions</li>
                                </ul>

                                <h2 id="technical-details" className="text-2xl font-bold mt-8">Technical Details</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    The technological implementation comprises of several main components that work together to build a complete projectile simulation system. The basic functionality is based on a strong mathematical model that includes classical mechanics equations for projectile motion. These fundamental physics principles are used using MATLAB&apos;s optimization toolbox, notably the fsolve function, to discover optimal launch parameters. The system handles the nonlinear equations using advanced algorithms such as trust-region-dogleg and Levenberg-Marquardt approaches, with maximum function evaluations and iterations set to 1050 to assure solution convergence.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    The application&apos;s layout is divided into three primary modules: Simulation, which provides basic functionality and real-time display, Graphs, which represents analytical data, and History, which allows for data durability and comparison. The Simulation Tab contains three panels: an input panel for distance, height, and gravity values, an output panel for derived metrics, and a Real Time Simulator System (RTSS) for dynamic trajectory visualization. This modular design enables users to seamlessly move between different features of the simulation while ensuring data consistency across all components.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    To get realistic and physically meaningful outputs, the system operates under well established restrictions. These include a minimum distance threshold of 0.01 meters to prevent unrealistic launch circumstances, as well as angle constraints to maintain the projectile&apos;s trajectory within a reasonable range. The Graphs Tab creates detailed visualizations of displacement, velocity, and acceleration over time, whilst the History Tab allows users to save, compare, and evaluate many simulation runs. The combination of rigorous physical constraints and versatile user interface features results in a stable and user-friendly simulation environment.
                                </p>
                            </motion.div>

                            <motion.div id="technologies" variants={item} className="flex flex-wrap gap-2">
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    MATLAB
                                </span>
                            </motion.div>

                            {/* Gallery Section */}
                            <motion.div id="gallery" variants={item} className="pt-8">
                                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                                <div className="border-2 border-foreground bg-background shadow-custom relative">
                                    <div className="relative pb-[calc(66.67%+3rem)]" ref={constraintsRef}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentImage}
                                                className="absolute inset-0 touch-pan-y"
                                                initial={{ opacity: 0, x: 300 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -300 }}
                                                transition={{ duration: 0.3 }}
                                                drag="x"
                                                dragConstraints={constraintsRef}
                                                dragElastic={0.2}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <div className="absolute inset-0 bottom-12">
                                                    {images[currentImage].type === 'video' ? (
                                                        <iframe
                                                            src={images[currentImage].src}
                                                            className="w-full h-full"
                                                            title={images[currentImage].alt}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            frameBorder="0"
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={images[currentImage].src}
                                                            alt={images[currentImage].alt}
                                                            width={1200}
                                                            height={1000}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                        <div className="absolute bottom-0 left-0 right-0 h-12 border-t-2 border-foreground bg-background text-foreground flex items-center px-2">
                                            {images[currentImage].caption}
                                        </div>

                                        {/* Navigation Buttons - Only visible on PC */}
                                        <button
                                            onClick={prevImage}
                                            className="hidden md:flex absolute -left-12 top-[calc(50%-1.5rem)] -translate-y-1/2 text-foreground hover:opacity-80 transition-opacity"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="hidden md:flex absolute -right-12 top-[calc(50%-1.5rem)] -translate-y-1/2 text-foreground hover:opacity-80 transition-opacity"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={32} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Report Section */}
                            <motion.div id="report" variants={item} className="pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Report</h2>
                                    <a
                                        href="/projects/engg100/report.pdf#view=FitH"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[0.9375rem] underline opacity-80 hover:opacity-100 inline-flex items-center gap-1"
                                    >
                                        Open Report
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div className="w-full h-[700px] border-2 border-foreground shadow-custom">
                                    <iframe
                                        src="/projects/engg100/report.pdf#toolbar=0&view=FitH&page=2"
                                        className="w-full h-full"
                                        title="Prjoectile Simulator Report"
                                    />
                                </div>
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
                                            <div className="relative w-full [aspect-ratio:16/10] border-2 border-foreground shadow-custom overflow-hidden">
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