'use client';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Header from '../../components/Header'
import PageLoader from '../../components/PageLoader'
import { ChevronLeft, ChevronRight } from 'react-feather';
import Image from 'next/image';
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

export default function About() {
    const [showContent, setShowContent] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const constraintsRef = useRef<HTMLDivElement>(null);

    const images = [
        {
            src: "/gallery/IMG_3098.jpg",
            alt: "The Capture Club Family",
            caption: "The Capture Club Family"
        },
    ];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 50) {
            prevImage();
        } else if (info.offset.x < -50) {
            nextImage();
        }
    };

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
                command="whoami /all"
                responses={[
                    "Reading ~/.profile",
                    "Parsing information...",
                    "Ready."
                ]}
                onComplete={handleComplete}
            />

            <motion.div
                ref={contentRef}
                className="max-w-4xl mx-auto px-4 pt-8"
                initial="hidden"
                animate={showContent ? "show" : "hidden"}
                variants={container}
            >
                {/* SVG Filters */}
                <svg className="hidden">
                    <defs>
                        <filter id="torn-edge">
                            <feTurbulence baseFrequency="0.03" numOctaves="5" type="fractalNoise" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
                        </filter>
                    </defs>
                </svg>

                {/* Top Box */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom relative bg-background overflow-visible"
                    variants={item}
                >
                    <motion.h1
                        className="text-4xl md:text-4xl text-4xl font-bold text-foreground mb-8 font-mono"
                        variants={item}
                    >
                        <span className="inline-block"># whoami</span>{' '}
                        <span className="inline-block">/all</span>
                    </motion.h1>

                    <div className="text-lg text-foreground/80 space-y-6">
                        <motion.div variants={item} className="space-y-4">
                            <p className="flex items-center gap-4 font-bold text-2xl">I am...</p>
                            <p className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span> A computer engineer
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Definitely <b>NOT</b>&nbsp;Spider-Man&nbsp;(stop&nbsp;asking)</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span> Living in dark mode
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span> Professional lasagna enthusiast (and eater)
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span> Currently turning caffeine into code
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span> Available on Mondays (and&nbsp;Fridays)
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span> Responsible for any burnt capacitors you might find
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span> Getting enough sleep
                            </p>
                        </motion.div>

                        <motion.section variants={item}>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">About Me</h2>
                            <p>
                                Hey there! 👋 I&apos;m the Parker that doesn&apos;t swing from buildings.
                                Like every developer, I have a special relationship with Stack Overflow and AI – it&apos;s not debugging, it&apos;s &quot;external consultation.&quot;
                                I turn caffeine into code with the same efficiency that Garfield turns lasagna into naps.
                            </p>
                        </motion.section>
                    </div>
                    <div className="absolute -bottom-4 -left-[4px] -right-[10px] h-6 bg-foreground" style={{ filter: 'url(#torn-edge)' }} />
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className="my-12 relative z-10"
                    variants={item}
                >
                    <div className="border-2 border-foreground bg-background shadow-custom relative max-w-3xl mx-auto">
                        <Image
                            src="/IMG_1067.jpg"
                            alt="Taha Parker"
                            width={1200}
                            height={675}
                            className="w-full h-full object-cover"
                        />
                        <div className="h-12 border-t-2 border-foreground bg-background text-foreground flex items-center px-2">
                            Taha Parker (Not Spider-Man)
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Box */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom relative bg-background overflow-visible"
                    variants={item}
                >
                    <div className="absolute -top-2 -left-[4px] -right-[10px] h-6 bg-foreground" style={{ filter: 'url(#torn-edge)' }} />
                    <div className="text-lg text-foreground/80 space-y-6">
                        <motion.section variants={item}>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What I Actually Do</h2>
                            <p>I specialize in making computers do things, or as I like to call it, &quot;advanced googling&quot;.
                                My current expertise is in the following:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Frontend: React, Next.js, and Tailwind CSS (because I enjoy spending 4 hours picking the perfect shade of blue that I&apos;ll change tomorrow anyway)</li>
                                <li>Languages: Python (Garfield&apos;s favorite), JavaScript (because who doesn&apos;t love undefined != undefined?), and C (for when I feel like not living)</li>
                                <li>Version Control: Git (where &apos;git push --force&apos; is totally a valid solution)</li>
                            </ul>
                        </motion.section>

                        <motion.section variants={item}>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">My &quot;It&apos;s Not a Bug, It&apos;s a Feature&quot; Journey</h2>
                            <p>Started coding quite late, probably around COVID, when I realized that &apos;;&apos; would become my arch-nemesis. Life <i>highlights</i> include:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Completing a CS50 course in two days (because sleep is for those who comment their code)</li>
                                <li>Creating an extensive collection of burnt capacitors and bulbs (my contribution to science)</li>
                                <li>Customizing my Windows and PowerShell setup to be as complex as explaining why I&apos;m not related to Peter Parker</li>
                                <li>Making my phone so &quot;optimized&quot; that it&apos;s basically a CAPTCHA test for anyone else</li>
                            </ul>
                        </motion.section>

                        <motion.section variants={item}>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">When I&apos;m Not Breaking Things</h2>
                            <p>You can find me:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Insisting that light mode is a crime against humanity</li>
                                <li>Reading <a href="https://gsmarena.com/" target="_blank" rel="noopener noreferrer" className="underline">GSMArena</a> while my <a href="https://xkcd.com/303" target="_blank" rel="noopener noreferrer" className="underline">code is compiling</a> (which is totally productive time)</li>
                                <li>Writing &quot;temporary&quot; solutions that somehow make it to prod</li>
                                <li>Starting new side projects (in my mind)</li>
                                <li>Leading various university clubs (because I needed more complexity in life)</li>
                                <li>Explaining to <a href="https://www.angrybirds.com/characters/red/" target="_blank" rel="noopener noreferrer">Red</a> why my code doesn&apos;t work</li>
                                <li>Collecting tech stickers (send some my way please 🥺🥺)</li>
                            </ul>
                        </motion.section>

                        <motion.section variants={item}>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Let&apos;s Connect!</h2>
                            <p>
                                If you&apos;re interested in collaborating on projects, discussing tech, or need someone to expertly demonstrate
                                how NOT to wire a circuit, feel free to reach out! Garfield and I are always happy to help
                                (except on Mondays, obviously).
                            </p>
                        </motion.section>
                        <div className="absolute -bottom-4 -left-[4px] -right-[10px] h-6 bg-foreground" style={{ filter: 'url(#torn-edge)' }} />
                    </div>

                </motion.div>
                {/* Gallery Stack */}
                <motion.div
                    className="my-16 relative z-10 max-w-3xl mx-auto"
                    variants={item}
                >
                    <h2 className="text-2xl font-bold text-foreground mb-4 relative z-10 ml-2">Gallery of Chaos</h2>
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
                                        <Image
                                            src={images[currentImage].src}
                                            alt={images[currentImage].alt}
                                            width={1200}
                                            height={675}
                                            className="object-cover w-full h-full"
                                        />
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

                {/* Warning Box */}
                <motion.div
                    className="border-2 border-foreground p-8 shadow-custom relative bg-background overflow-visible mt-8"
                    variants={item}
                >
                    <div className="absolute -top-2 -left-[4px] -right-[10px] h-6 bg-foreground" style={{ filter: 'url(#torn-edge)' }} />
                    <motion.section variants={item}>
                        <p className="text-sm italic">
                            Warning: Side effects of hanging out with me may include spontaneous technical rants, strong opinions about light vs. dark mode,
                            and an unhealthy attachment to caffiene, lasagna, Garfield and Red. No coding on Mondays -
                            this is non-negotiable, and yes, my git commits confirm this.
                        </p>
                    </motion.section>
                </motion.div>
            </motion.div>
        </main>
    );
} 
