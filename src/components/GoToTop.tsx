'use client';
import { ArrowUp } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled 1.5 screen heights
            const shouldShow = window.scrollY > screen.height * 1.5;
            setIsVisible(shouldShow);
        };

        // Initial check
        toggleVisibility();
        
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-foreground text-background rounded-full shadow-custom hover:opacity-80 transition-opacity z-50"
                    aria-label="Go to top"
                >
                    <ArrowUp size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    );
} 