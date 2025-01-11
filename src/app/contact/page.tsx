'use client';
import Link from 'next/link'
import { useState } from 'react';
import { Mail, Phone, Linkedin, GitHub, Download } from 'react-feather'
import { motion } from 'framer-motion';
import Header from '@/components/Header'
import PageLoader from '@/components/PageLoader'
import GoToTop from '../../components/GoToTop'

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

export default function Contact() {
    const [showContent, setShowContent] = useState(false);

    const handleComplete = () => {
        setTimeout(() => {
            setShowContent(true);
        }, 200);
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8 md:mb-0">
            <motion.div
                initial="hidden"
                animate={showContent ? "show" : "hidden"}
                variants={container}
            >
                <motion.div variants={item}>
                    <Header />
                </motion.div>
                <GoToTop />
                <div className="max-w-4xl mx-auto px-4 pt-8">
                    <motion.div
                        className="border-2 border-foreground p-8 shadow-custom"
                        variants={item}
                    >
                        <motion.h1
                            className="h-[40px] text-4xl font-bold text-foreground mb-16 md:mb-8 font-mono"
                            variants={item}
                        >
                            <span className="inline-block"># cat contact.vcf</span>
                        </motion.h1>
                        <motion.p
                            className="text-md opacity-80 mb-8"
                            variants={item}
                        >
                            I&apos;m always open to new opportunities and collaborations. Feel free to reach out to me through any of the following methods.
                        </motion.p>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={container}
                        >
                            <motion.div variants={item}>
                                <Link
                                    href="mailto:tahayparker@gmail.com"
                                    className="border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors group block"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Mail className="w-5 h-5" />
                                        <h3 className="text-lg font-medium">Email</h3>
                                    </div>
                                    <p className="text-sm opacity-80 group-hover:opacity-100">tahayparker@gmail.com</p>
                                </Link>
                            </motion.div>

                            <motion.div variants={item}>
                                <Link
                                    href="tel:+971565883797"
                                    className="border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors group block"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Phone className="w-5 h-5" />
                                        <h3 className="text-lg font-medium">Phone</h3>
                                    </div>
                                    <p className="text-sm opacity-80 group-hover:opacity-100">+971 56 588 3797</p>
                                </Link>
                            </motion.div>

                            <motion.div variants={item}>
                                <Link
                                    href="https://linkedin.com/in/tahayparker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors group block"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Linkedin className="w-5 h-5" />
                                        <h3 className="text-lg font-medium">LinkedIn</h3>
                                    </div>
                                    <p className="text-sm opacity-80 group-hover:opacity-100">in/tahayparker</p>
                                </Link>
                            </motion.div>

                            <motion.div variants={item}>
                                <Link
                                    href="https://github.com/tahayparker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors group block"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <GitHub className="w-5 h-5" />
                                        <h3 className="text-lg font-medium">GitHub</h3>
                                    </div>
                                    <p className="text-sm opacity-80 group-hover:opacity-100">@tahayparker</p>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={item} className="mt-8 flex flex-col items-center gap-4 w-full">
                            <a
                                href="/TahaParker.vcf"
                                download
                                className="border-2 border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors group inline-flex items-center gap-2 w-full md:w-auto justify-center"
                            >
                                <Download className="w-5 h-5" />
                                <span>Add to Contacts</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
            <PageLoader
                command="cat contact.vcf"
                responses={[
                    "Reading contact information...",
                    "Found 4 contact methods",
                    "Ready to connect."
                ]}
                onComplete={handleComplete}
            />
        </main>
    )
} 