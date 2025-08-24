'use client';
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { navigationLinks } from '@/config/navigation'
import type { ThemeType } from '@/context/ThemeContext'

const LinkAnimation = ({ children, href, className, onClick }: { children: string, href: string, className?: string, onClick?: () => void }) => {
    return (
        <Link
            href={href}
            className={`group relative ${className || ''}`}
            onClick={onClick}
        >
            <motion.span
                className={`glitch-neon inline-block`}
                data-text={children}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            >
                {children}
            </motion.span>
        </Link>
    )
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <motion.div
            className="w-full px-4 py-8 bg-background relative z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="w-full border-2 border-foreground p-4 shadow-custom bg-background">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-lg uppercase font-uni tracking-wider pl-4">
                        <LinkAnimation href="/">Taha Parker</LinkAnimation>
                    </h1>

                    <div className="flex items-center">
                        {/* Desktop Navigation */}
                        <nav className="hidden min-[1000px]:flex gap-8">
                            {navigationLinks.map((link) => (
                                <LinkAnimation
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm"
                                >
                                    {link.label}
                                </LinkAnimation>
                            ))}
                        </nav>

                        {/* Separator */}
                        <div className="hidden min-[1000px]:block w-px h-5 bg-foreground/30 mx-8" />

                        {/* Theme Toggle */}
                        <div className="relative">
                        <button
                                onClick={() => setIsMenuOpen(false)}
                                onMouseEnter={() => setIsThemeMenuOpen(true)}
                                className="text-sm hover:opacity-80 transition-opacity pr-4 flex items-center gap-2"
                        >
                                {theme.toUpperCase()}
                        </button>

                            <AnimatePresence>
                                {isThemeMenuOpen && (
                                    <>
                                        <motion.div
                                            className="fixed inset-0 z-40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsThemeMenuOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 top-8 w-40 border-2 border-foreground bg-background shadow-custom z-50"
                                            onMouseLeave={() => setIsThemeMenuOpen(false)}
                                        >
                                            {['dark', 'mono', 'light'].map((themeOption) => (
                                                <button
                                                    key={themeOption}
                                                    onClick={() => {
                                                        setTheme(themeOption as ThemeType);
                                                        setIsThemeMenuOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-foreground hover:text-background transition-colors ${
                                                        theme === themeOption ? 'bg-foreground text-background' : ''
                                                    }`}
                                                >
                                                    {themeOption.toUpperCase()}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="min-[1000px]:hidden flex flex-col gap-2.5 p-2 group mr-4"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="w-6 h-px bg-foreground block"
                                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="w-6 h-px bg-foreground block"
                                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 top-[calc(2rem+73px)] bg-background/80 backdrop-blur-sm min-[1000px]:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="min-[1000px]:hidden fixed inset-x-4 top-[calc(2rem+73px+2rem)] bg-background border-2 border-foreground shadow-custom"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="p-4 flex flex-col gap-4">
                            {navigationLinks.map((link) => (
                                <LinkAnimation
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </LinkAnimation>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}