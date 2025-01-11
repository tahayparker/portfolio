'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import { GitHub, ExternalLink } from 'react-feather';
import Link from 'next/link';
import GoToTop from '../../components/GoToTop';

interface Project {
    slug: string;
    title: string;
    description: string;
    github?: string;
    link?: string;
    technologies: string[];
}

const personalProjects: Project[] = [
    {
        slug: 'vacansee',
        title: 'vacan.see',
        description: 'The only website you need to find empty rooms in your university',
        github: 'https://github.com/tahayparker/vacan.see',
        link: 'https://vacansee.vercel.app',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'PostgreSQL']
    },
    {
        slug: 'findmyprof',
        title: 'FindMyProf',
        description: 'Because consultation hours are severely limited',
        github: 'https://github.com/tahayparker/findmyprof',
        link: 'https://findmyprof-uowd.vercel.app',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'PostgreSQL']
    },
    {
        slug: 'yapmap',
        title: 'YapMap',
        description: 'Find out what\'s being yapped the most in your chats',
        github: 'https://github.com/tahayparker/yapmap',
        link: 'https://yapmap.vercel.app',
        technologies: ['Next.js', 'Python', 'TypeScript', 'Tailwind CSS']
    },
    {
        slug: 'portfolio',
        title: 'Portfolio',
        description: 'This website. Need I say more?',
        github: 'https://github.com/tahayparker/portfolio',
        link: 'https://tahayparker.vercel.app',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    }
];

const universityProjects: Project[] = [
    {
        slug: 'csci291',
        title: 'Webots Simulation',
        description: 'A Webots simulation of a robot that can navigate a maze to find the brightest spot in the maze',
        github: 'https://github.com/Aymn-Mohd/CSCI291_Project_A24_GRP1',
        technologies: ['C', 'Webots']
    },
    {
        slug: 'ecte233',
        title: 'Custom 4-bit ALU',
        description: 'Desgining a custom 4-bit ALU using basic logic gates only',
        technologies: ['MultiSim']
    },
    {
        slug: 'engg100',
        title: 'Projectile Simulator',
        description: 'A projectile simulator with various parameters and real-time animation using MATLAB',
        github: 'https://github.com/tahayparker/ProjectileSimulator',
        technologies: ['MATLAB']
    }
];

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

const ProjectCard: React.FC<Project> = ({ slug, title, description, github, link, technologies }) => (
    <motion.div variants={item} className="border-2 border-foreground p-6 shadow-custom bg-background">
        <div className="flex justify-between items-start mb-4">
            <Link href={`/projects/${slug}`} className="hover:opacity-80 transition-opacity">
                <h3 className="text-xl font-bold">{title}</h3>
            </Link>
            <div className="flex gap-3">
                {github && (
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <GitHub size={20} />
                    </a>
                )}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <ExternalLink size={20} />
                    </a>
                )}
            </div>
        </div>
        <p className="text-[0.9375rem] opacity-80 mb-4">{description}</p>
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
                command="ls -la projects/"
                responses={[
                    "Scanning project directory...",
                    "Compiling project list...",
                    "Ready."
                ]}
                onComplete={handleComplete}
            />

            <motion.div
                className="max-w-4xl mx-auto px-4 pt-8"
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
                        {personalProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                        ))}
                    </div>
                </motion.section>

                <motion.section variants={item}>
                    <h2 className="text-2xl font-bold mb-6">University Projects</h2>
                    <div className="space-y-6">
                        {universityProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                        ))}
                    </div>
                </motion.section>
            </motion.div>
        </main>
    );
} 