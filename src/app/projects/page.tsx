'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import { GitHub, ExternalLink } from 'react-feather';
import Link from 'next/link';
import GoToTop from '../../components/GoToTop';

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    github_url?: string;
    live_url?: string;
    project_type: 'personal' | 'university';
    technologies: string[];
    featured: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}

interface ProjectsResponse {
    personal: Project[];
    university: Project[];
}

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

const ProjectCard: React.FC<Project> = ({ slug, title, description, github_url, live_url, technologies }) => (
    <motion.div variants={item} className="border-2 border-foreground p-6 shadow-custom bg-background">
        <div className="flex justify-between items-start mb-4">
            <Link href={`/projects/${slug}`} className="hover:opacity-80 transition-opacity">
                <h3 className="text-xl font-bold">{title}</h3>
            </Link>
            <div className="flex gap-3">
                {github_url && (
                    <a
                        href={github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <GitHub size={20} />
                    </a>
                )}
                {live_url && (
                    <a
                        href={live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <ExternalLink size={20} />
                    </a>
                )}
            </div>
        </div>
        <p className="text-[0.9375rem] opacity-80 mb-4 text-justify">{description}</p>
        <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
                <span
                    key={tech}
                    className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full"
                >
                    {tech}
                </span>
            ))}
        </div>
    </motion.div>
);

export default function Projects() {
    const [showContent, setShowContent] = useState(false);
    const [projects, setProjects] = useState<ProjectsResponse>({ personal: [], university: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data: Project[] = await response.json();

                // Separate projects by type
                const personal = data.filter(p => p.project_type === 'personal');
                const university = data.filter(p => p.project_type === 'university');

                setProjects({ personal, university });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleComplete = () => {
        setTimeout(() => {
            setShowContent(true);
        }, 200);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
                <Header />
                <GoToTop />
                <PageLoader
                    command="ls -la projects/"
                    responses={[
                        "Scanning project directory...",
                        "Compiling project list...",
                        "Ready."
                    ]}
                    onComplete={handleComplete}
                />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
                <Header />
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    <div className="border-2 border-red-500 p-6 shadow-custom bg-background">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Projects</h1>
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                            Retry
                        </button>
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
                command="ls -la projects/"
                responses={[
                    "Scanning project directory...",
                    "Compiling project list...",
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
                <motion.h1
                    className="text-4xl font-bold mb-8 font-mono"
                    variants={item}
                >
                    <span className="inline-block"># ls -la</span>{' '}
                    <span className="inline-block">projects/</span>
                </motion.h1>

                <motion.section variants={item} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Personal Projects</h2>
                    <div className="space-y-6">
                        {projects.personal.length > 0 ? (
                            projects.personal.map((project) => (
                                <ProjectCard key={project.id} {...project} />
                            ))
                        ) : (
                            <p className="text-foreground/60">No personal projects found.</p>
                        )}
                    </div>
                </motion.section>

                <motion.section variants={item}>
                    <h2 className="text-2xl font-bold mb-6">University Projects</h2>
                    <div className="space-y-6">
                        {projects.university.length > 0 ? (
                            projects.university.map((project) => (
                                <ProjectCard key={project.id} {...project} />
                            ))
                        ) : (
                            <p className="text-foreground/60">No university projects found.</p>
                        )}
                    </div>
                </motion.section>
            </motion.div>
        </main>
    );
}