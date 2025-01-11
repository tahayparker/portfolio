'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import PageLoader from '../../../components/PageLoader';
import Image from 'next/image';
import Link from 'next/link';
import GoToTop from '../../../components/GoToTop';
import { ExternalLink } from 'react-feather';

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
    { id: 'report', title: 'Report' },
    { id: 'related-projects', title: 'Related Projects' }
];

export default function Ecte233Project() {
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

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

    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background mb-8">
            <Header />
            <GoToTop />

            <PageLoader
                command="cat projects/ecte233.ms12"
                responses={[
                    "Connecting to Multisim...",
                    "Ready.",
                    "11111010110100100"
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
                            <span className="inline-block">Custom 4-bit Arithmetic Logic Unit (ALU)</span>
                        </motion.h1>

                        <div className="space-y-8">
                            <motion.div variants={item} className="relative w-full [aspect-ratio:16/10] border-2 border-foreground shadow-custom">
                                <Image
                                    src="/projects/ecte233.png"
                                    alt="ECTE233"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div variants={item} className="space-y-4">

                                <h2 id="objective" className="text-2xl font-bold mt-8">Objective</h2>
                                <p className="text-[0.9375rem] opacity-80 mb-8">
                                    To design a custom-made 4-bit arithmetic logic unit (ALU) and test the design using a simulation such as Simulink or Multisim. All logic must be computed using basic gates (AND, OR, NOT, XOR, NAND, NOR and XNOR only). No advanced blocks available in a simulation environment may be used, except for the creation and analysis of inputs/outputs.
                                </p>
                                <h2 id="overview" className="text-2xl font-bold">Overview</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    The ALU has 10 inputs and 5 outputs. Two input bits are used to define the operation that will be applied (OP1:0). Two lots of four input bits are used to create nibbles A3:0 and B3:0. Four output bits are used to create the nibble S3:0, which is the main output of the operation. One output bit (Overflow) is used to indicate if an overflow has occurred during an operation.
                                </p>

                                <h2 id="key-features" className="text-2xl font-bold mt-8">Key Features</h2>
                                <ul className="list-disc pl-6 space-y-2 text-[0.9375rem] opacity-80">
                                    <li>Performs four distinct operations controlled by two selection bits</li>
                                    <li>Implements logic using basic gates like AND, OR, NOT, and XOR</li>
                                    <li>Includes an overflow detection bit for any operations with overflows</li>
                                    <li>Utilizes SPDT switches to prevent ambiguous states</li>
                                    <li>Features a modular multiplexer for efficient signal routing</li>
                                </ul>

                                <h2 id="technical-details" className="text-2xl font-bold mt-8">Technical Details</h2>
                                <p className="text-[0.9375rem] opacity-80">
                                    Using basic digital logic principles, the 4-bit ALU is a small but powerful processing unit that can perform a variety of logical operations using two 4-bit inputs (A3:0 and B3:0) and two operation selection bits (OP1:0). The results are shown on a 4-bit output (S3:0), and an overflow detection bit (OF) is included for operations with potential overflow. This layout guarantees that the system can process binary computations with accuracy and dependability.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    SPDT switches are used in the ALU&apos;s input mechanism to avoid ambiguous states and to control operations and enter binary data. To ensure reliable binary state representation, each switch is connected to either ground or a voltage source. In addition to clearly distinguishing between logical high and low states, this tactile interface enables interactive manipulation of computing parameters by users. The ALU&apos;s versatility is demonstrated by the separate switches for operation control, which provide smooth transitions between different logical functions.
                                </p>
                                <p className="text-[0.9375rem] opacity-80 mt-4">
                                    The multiplexer (MUX) plays a crucial role in signal selection, utilizing a configuration of four AND gates, two NOT gates, and one OR gate. The MUX routes the appropriate signal to the output based on the operation selection bits, ensuring precise data processing. By complementing control signals using NOT gates and applying these alongside original inputs to AND gates, the circuit establishes a highly flexible logic network. The modular design not only enhances the ALU’s operational efficiency but also simplifies potential expansions, allowing additional operations to be integrated seamlessly.
                                </p>
                            </motion.div>

                            <motion.div id="technologies" variants={item} className="flex flex-wrap gap-2">
                                <span className="text-[0.9375rem] px-3 py-1 border border-foreground bg-foreground/5 rounded-full">
                                    MultiSim
                                </span>
                            </motion.div>

                            {/* Report Section */}
                            <motion.div id="report" variants={item} className="pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Report</h2>
                                    <a
                                        href="/projects/ecte233/report.pdf#view=FitH"
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
                                        src="/projects/ecte233/report.pdf#toolbar=0&view=FitH&page=2" 
                                        className="w-full h-full"
                                        title="ALU Report"
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