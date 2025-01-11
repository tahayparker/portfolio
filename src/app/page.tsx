'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header'
import PageLoader from '@/components/PageLoader'
import GoToTop from '../components/GoToTop'
import Link from 'next/link'

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

export default function Home() {
    const [showContent, setShowContent] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    const handleComplete = () => {
        setTimeout(() => {
            setShowContent(true);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
            <motion.div 
                initial="hidden"
                animate={showContent ? "show" : "hidden"}
                variants={container}
                className="min-h-screen"
            >
                <motion.div variants={item}>
                    <Header />
                </motion.div>
                <div className="max-w-4xl mx-auto px-4 pt-8">
                    <motion.div 
                        ref={containerRef} 
                        className="border-2 border-foreground p-8 shadow-custom"
                        variants={item}
                    >
                        <motion.div ref={headingRef} className="min-h-[60px] sm:h-[40px] mb-4" variants={item}>
                            <h1 className="font-mono text-4xl font-bold break-words">
                                # sudo init portfolio
                            </h1>
                        </motion.div>
                        <motion.p className="text-sm opacity-80 mb-8" variants={item}>
                            Welcome to my portfolio. I&apos;m a computer engineer who turns caffeine into code.
                        </motion.p>

                        <motion.div variants={item} className="space-y-4">
                            <Link href="/projects" className="block border-2 border-foreground p-4 hover:bg-foreground hover:text-background transition-colors">
                                <h2 className="text-lg font-bold mb-2">Projects</h2>
                                <p className="text-sm opacity-80">Check out what I&apos;ve been building. From web apps to electrical circuits.</p>
                            </Link>

                            <Link href="/experience" className="block border-2 border-foreground p-4 hover:bg-foreground hover:text-background transition-colors">
                                <h2 className="text-lg font-bold mb-2">Experience</h2>
                                <p className="text-sm opacity-80">My journey so far. Leadership roles, technical positions, and volunteer work.</p>
                            </Link>

                            <Link href="/contact" className="block border-2 border-foreground p-4 hover:bg-foreground hover:text-background transition-colors">
                                <h2 className="text-lg font-bold mb-2">Contact</h2>
                                <p className="text-sm opacity-80">Let&apos;s connect! Find me on GitHub, LinkedIn, or send me an email.</p>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="border-2 border-[var(--golden)] p-8 shadow-[5px_5px_0px_-2px_var(--background),_5px_5px_0px_0px_var(--golden)] mt-8"
                        variants={item}
                    >
                        <motion.div className="space-y-4" variants={item}>
                            <h2 className="text-lg font-bold text-[var(--golden)]">The Webring</h2>
                            <p className="text-sm opacity-80 text-[var(--golden)]">
                                This site is part of a webring connecting like-minded developers and creators. 
                                Discover more amazing portfolios and digital gardens.
                            </p>
                            <Link 
                                href="/webring" 
                                className="inline-block mt-2 text-[var(--golden)] hover:opacity-80 transition-opacity"
                            >
                                → Explore the Webring
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
            <PageLoader 
                command="sudo init portfolio" 
                responses={[
                    "Initializing portfolio...",
                    "Loading components...",
                    "Done."
                ]}
                onComplete={handleComplete}
            />
            <GoToTop />
        </main>
    )
}
