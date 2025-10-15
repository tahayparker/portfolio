'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import { ExternalLink } from 'react-feather';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import GoToTop from '../../components/GoToTop';
import type { Experience } from './experiences';

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

export default function Experience() {
    const [showContent, setShowContent] = useState(false);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [volunteer, setVolunteer] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch experiences and volunteering data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [expRes, volRes] = await Promise.all([
                    fetch('/api/experiences'),
                    fetch('/api/volunteering'),
                ]);

                if (!expRes.ok || !volRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const expData = await expRes.json();
                const volData = await volRes.json();

                setExperience(expData);
                setVolunteer(volData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleComplete = () => {
        setTimeout(() => {
            setShowContent(true);
        }, 200);
    };

    const ExperienceCard = ({ exp }: { exp: Experience }) => {
        const { theme } = useTheme();

        return (
            <motion.div
                variants={item}
                className="space-y-2"
            >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex items-start gap-4 w-full md:w-auto">
                        <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-background overflow-hidden relative">
                            {exp.logo ? (
                                <Image
                                    src={theme === 'light' ? exp.logo.light : exp.logo.dark}
                                    alt={`${exp.company} logo`}
                                    width={128}
                                    height={128}
                                    className="object-contain max-w-full max-h-full"
                                    quality={100}
                                />
                            ) : (
                                <span className="text-xs opacity-50">Logo</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-0.5 flex-1">
                            <h2 className="text-2xl font-bold font-uni leading-tight">{exp.company}</h2>
                            <p className="text-lg text-foreground/80 leading-tight">{exp.position}</p>
                            <div className="text-[0.9375rem] opacity-80 leading-tight">
                                <span className="md:inline">{exp.duration}</span>
                                <span className="hidden md:inline text-foreground/50"> | </span>
                                <span className="block md:inline">{exp.location}</span>
                            </div>
                            {exp.link && (
                                <a
                                    href={exp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[0.9375rem] underline opacity-80 hover:opacity-100 inline-flex items-center gap-1 mt-0.5 md:hidden"
                                >
                                    Visit
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                    {exp.link && (
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.9375rem] underline opacity-80 hover:opacity-100 hidden md:inline-flex items-center gap-1"
                        >
                            Visit
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>
                <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 mt-8">
                    {exp.description.map((desc, i) => (
                        <li key={i} className="text-[0.9375rem] text-justify">
                            {desc}
                        </li>
                    ))}
                </ul>
                {exp.technologies && (
                    <div className="flex flex-wrap gap-2 mt-6">
                        {exp.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="text-[0.9375rem] px-3 py-1 border border-foreground bg-background rounded-full hover:bg-foreground hover:text-background transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        );
    };

    // Show loader if still fetching data
    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
                <Header />
                <GoToTop />
                <PageLoader
                    command="cat experience.md"
                    responses={[
                        "Loading work history...",
                        "Looking at volunteer work...",
                        "Ready."
                    ]}
                    onComplete={handleComplete}
                />
            </main>
        );
    }

    // Show error if data fetch failed
    if (error) {
        return (
            <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
                <Header />
                <GoToTop />
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    <div className="border-2 border-red-500 p-6 shadow-custom bg-background">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Data</h1>
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
            <Header />
            <GoToTop />

            <PageLoader
                command="cat experience.md"
                responses={[
                    "Loading work history...",
                    "Looking at volunteer work...",
                    "Ready."
                ]}
                onComplete={handleComplete}
            />

            <motion.div
                className="max-w-7xl mx-auto px-4 pt-8"
                initial="hidden"
                animate={showContent ? "show" : "hidden"}
                variants={container}
            >
                {/* Resume Download Section */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom bg-background mb-16"
                    variants={item}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold font-uni mb-2">Download Resume</h2>
                            <p className="text-[0.9375rem] opacity-80">Get a copy of my detailed resume in PDF format</p>
                        </div>
                        <a
                            href="/TahaParker.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-2 font-uni w-full md:w-auto justify-center"
                        >
                            Download PDF
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </motion.div>

                {/* Work Experience Section */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom bg-background"
                    variants={item}
                >
                    <motion.h1
                        className="text-4xl font-bold mb-8 font-mono"
                        variants={item}
                    >
                        <span className="inline-block"># cat</span>{' '}
                        <span className="inline-block">experience.md</span>
                    </motion.h1>

                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <ExperienceCard key={index} exp={exp} />
                        ))}
                    </div>
                </motion.div>

                {/* Volunteer Experience Section */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom bg-background mt-16"
                    variants={item}
                >
                    <motion.h1
                        className="text-4xl font-bold mb-8 font-mono"
                        variants={item}
                    >
                        <span className="inline-block"># cat</span>{' '}
                        <span className="inline-block">volunteer.md</span>
                    </motion.h1>

                    <div className="space-y-12">
                        {volunteer.map((exp, index) => (
                            <ExperienceCard key={index} exp={exp} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}