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
        slug: 'ecte233',
        title: 'Custom 4-bit ALU',
        image: '/projects/ecte233.png'
    },
    {
        slug: 'engg100',
        title: 'Projectile Simulator',
        image: '/projects/projsim.png'
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
        src: '/projects/csci291/mapping.png',
        alt: 'Mapping',
        caption: 'Real-time mapping of the environment using sensor data'
    },
    {
        type: 'image',
        src: '/projects/csci291/finding.png',
        alt: 'Finding the brightest spot',
        caption: 'Robot finding the brightest light source using GPS coordinates'
    },
    {
        type: 'image',
        src: '/projects/csci291/bright.png',
        alt: 'Reaching the brightest spot',
        caption: 'Reaching the brightest spot and playing sound'
    },
    {
        type: 'video',
        src: 'https://www.youtube-nocookie.com/embed/FvJz4LkhChY?start=10',
        alt: 'Robot Demo',
        caption: 'Full demonstration of the robot navigating through the simulated environment in Webots'
    }
];

export default function Csci291Project() {
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
                command="cat projects/csci291.c"
                responses={[
                    "int main() {",
                    "    printf(\"Loading project details...\");",
                    "    return 0;",
                    "}",
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
                            <span className="inline-block">Webots Simulation</span>
                        </motion.h1>

                        <div className="space-y-8">
                            <motion.div variants={item} className="relative w-full [aspect-ratio:16/10] border-2 border-foreground shadow-custom">
                                <Image
                                    src="/projects/csci291.png"
                                    alt="CSCI291"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div variants={item} className="flex gap-3">
                                <a
                                    href="https://github.com/Aymn-Mohd/CSCI291_Project_A24_GRP1"
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
                                To develop a Webots robot application that autonomously navigates a maze to locate and stop at the brightest light source
                                </p>
                                <h2 id="overview" className="text-2xl font-bold">Overview</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                The robot uses sensors for navigation, light detection, and GPS-based positioning to explore the maze dynamically. It implements a modular C-based control system to handle junction decisions, path tracking, and target acquisition efficiently
                                </p>

                                <h2 id="key-features" className="text-2xl font-bold mt-8">Key Features</h2>
                                <ul className="list-disc pl-6 space-y-2 text-[0.9375rem] opacity-80">
                                    <li>Navigates dynamically through mazes without map-specific hardcoding</li>
                                    <li>Detects and targets the brightest light source using light sensors</li>
                                    <li>Tracks position and path using GPS and position sensors</li>
                                    <li>Integrates modular C-based functions for navigation and decision-making</li>
                                    <li>Uses a Braitenberg-inspired algorithm for responsive motor control</li>
                                    <li>Bonus: Plays a sound when it has reached the brightest spot</li>
                                </ul>

                                <h2 id="technical-details" className="text-2xl font-bold mt-8">Technical Details</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                In order to ensure effective navigation through the maze, the robot&apos;s navigation system uses distance sensors to identify obstacles and junctions. Junction detection uses normalized sensor values to calculate path availability in three directions: forward, left, and right. This information is then used in a decision hierarchy to determine movement direction. The robot can effectively analyze paths or backtrack thanks to dynamic handling of junction analysis and path memory updates.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    Light source detection is achieved through light sensors, which continuously monitor ambient light intensity. The robot calculates average light levels and tracks the brightest spot by storing its GPS coordinates. Once the brightest light source is identified, the robot navigates directly to that location. The use of GPS for both position tracking and light source identification ensures accurate navigation and target acquisition.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    The robot&apos;s control logic is modular, with specific functions handling initialization, sensor reading, path memory updates, and decision-making at junctions. This modularity allows for efficient operation and easy debugging. The main function orchestrates all operations, from initialization to final cleanup. A Braitenberg-inspired algorithm dynamically adjusts motor speeds based on sensor inputs, enabling smooth and responsive navigation. The entire system’s design emphasizes adaptability, ensuring functionality across diverse maze layouts and lighting conditions.
                                </p>
                            </motion.div>

                            <motion.div id="technologies" variants={item} className="flex flex-wrap gap-2">
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    C
                                </span>
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    Webots
                                </span>
                            </motion.div>

                            {/* Gallery Section */}
                            <motion.div id="gallery" variants={item} className="pt-8">
                                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                                <div className="border-2 border-foreground bg-background shadow-custom relative">
                                    <div className="relative pb-[calc(56.25%+3rem)]" ref={constraintsRef}>
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
                                                            height={675}
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
                                        href="/projects/csci291/report.pdf#view=FitH"
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
                                        src="/projects/csci291/report.pdf#toolbar=0&view=FitH&page=2" 
                                        className="w-full h-full"
                                        title="Robot Navigation Report"
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