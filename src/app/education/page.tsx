'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import { ExternalLink } from 'react-feather';
import GoToTop from '../../components/GoToTop';
import type { Education } from './education';
import type { Certification } from './certificates';

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

export default function Education() {
    const [showContent, setShowContent] = useState(false);
    const [educationHistory, setEducationHistory] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch education and certifications data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eduRes, certRes] = await Promise.all([
                    fetch('/api/education'),
                    fetch('/api/certifications'),
                ]);

                if (!eduRes.ok || !certRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const eduData = await eduRes.json();
                const certData = await certRes.json();

                setEducationHistory(eduData as Education[]);
                setCertifications(certData as Certification[]);
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

    // Show loader if still fetching data
    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
                <Header />
                <GoToTop />
                <PageLoader
                    command="cat education.edu"
                    responses={[
                        "Loading academic history...",
                        "Verifying credentials...",
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
                command="cat education.edu"
                responses={[
                    "Loading academic history...",
                    "Verifying credentials...",
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
                {/* Education Section */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom bg-background"
                    variants={item}
                >
                    <motion.h1
                        className="text-4xl font-bold mb-8 font-mono"
                        variants={item}
                    >
                        <span className="inline-block"># cat</span>{' '}
                        <span className="inline-block">education.edu</span>
                    </motion.h1>

                    <div className="space-y-8">
                        {educationHistory.map((edu) => (
                            <motion.div
                                key={edu.school}
                                variants={item}
                                className="space-y-2"
                            >
                                <h2 className="text-2xl font-bold font-uni">{edu.school}</h2>
                                <p className="text-lg text-foreground/80">
                                    {edu.degree} • {edu.field}
                                </p>
                                <p className="text-[0.9375rem] opacity-80">
                                    {edu.duration} | {edu.location}
                                </p>
                                <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 mt-4">
                                    {edu.description.map((desc, i) => (
                                        <li key={i} className="text-[0.9375rem] text-justify">
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Certifications Section */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom bg-background mt-16"
                    variants={item}
                >
                    <motion.h2
                        className="text-4xl mb-8 font-mono"
                        variants={item}
                    >
                        <span className="inline-block font-bold"># cat</span>{' '}
                        <span className="inline-block font-bold">certs.cer</span>
                    </motion.h2>

                    <div className="space-y-8">
                        {certifications.map((cert) => (
                            <motion.div
                                key={cert.name}
                                variants={item}
                                className="space-y-2"
                            >
                                <h3 className="text-2xl font-bold font-uni">{cert.name}</h3>
                                <p className="text-lg text-foreground/80">
                                    {cert.issuer}
                                </p>
                                <div className="text-[0.9375rem] opacity-80 flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span>Issued: {cert.date}</span>
                                        <span className="text-foreground/50">|</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:opacity-100 inline-flex items-center gap-1 whitespace-nowrap"
                                        >
                                            Verify Credential
                                            <ExternalLink size={14} />
                                        </a>

                                        {cert.credentialUrl2 && (
                                            <>
                                                <span className="text-foreground/50">|</span>
                                                <a
                                                    href={cert.credentialUrl2}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline hover:opacity-100 inline-flex items-center gap-1 whitespace-nowrap"
                                                >
                                                    Verify Credential
                                                    <ExternalLink size={14} />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[0.9375rem] text-justify">
                                    {cert.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}