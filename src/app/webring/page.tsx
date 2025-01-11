'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import GoToTop from '../../components/GoToTop';

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

export default function Webring() {
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
                command="cat webring.md"
                responses={[
                    "Connecting to the network...",
                    "Fetching webring data...",
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
                <motion.div
                    className="border-2 border-[var(--golden)] p-8 shadow-[5px_5px_0px_-2px_var(--background),_5px_5px_0px_0px_var(--golden)] bg-background"
                    variants={item}
                >
                    <motion.h1
                        className="text-4xl font-bold mb-8 font-mono text-[var(--golden)]"
                        variants={item}
                    >
                        <span className="inline-block"># cat</span>{' '}
                        <span className="inline-block">webring.md</span>
                    </motion.h1>

                    <motion.div 
                        variants={item}
                        className="space-y-4 text-[0.9375rem] text-[var(--golden)]"
                    >
                        <p>
                            Welcome to the webring page! This page will soon be part of a webring connecting like-minded developers 
                            and creators. Stay tuned as we build this network of personal websites, portfolios, and digital gardens.
                        </p>
                        <p>
                            Coming soon...
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
} 