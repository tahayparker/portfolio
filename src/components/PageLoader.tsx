'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
    command: string;
    responses: string[];
    onComplete: () => void;
}

export default function PageLoader({ command, responses, onComplete }: PageLoaderProps) {
    const [typedText, setTypedText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [finalText, setFinalText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isResponseComplete, setIsResponseComplete] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [maxWidth, setMaxWidth] = useState(0);

    useEffect(() => {
        // Calculate max width from all text
        const allTexts = ['# ' + command, ...responses];
        const maxLength = Math.max(...allTexts.map(text => text.length));
        // Approximate width based on character count (adjust multiplier as needed)
        setMaxWidth(maxLength * 12); // 12px per character approximate
    }, [command, responses]);

    useEffect(() => {
        let currentIndex = 0;
        const fullCommand = '# ' + command;
        
        const typingInterval = setInterval(() => {
            if (currentIndex < fullCommand.length) {
                setTypedText(fullCommand.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setFinalText(fullCommand);
                setIsTypingComplete(true);
                
                const showResponses = async () => {
                    for (let i = 0; i < responses.length; i++) {
                        await new Promise(resolve => setTimeout(resolve, 400));
                        setResponseText(prev => prev + (prev ? '\n' : '') + responses[i]);
                    }
                    setIsResponseComplete(true);
                    setTimeout(() => {
                        if (onComplete) {
                            onComplete();
                            setTimeout(() => {
                                setIsComplete(true);
                            }, 800);
                        }
                    }, 800);
                };
                
                setTimeout(showResponses, 300);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [command, responses, onComplete]);

    return (
        <AnimatePresence mode="wait">
            <>
                <motion.div
                    key="backdrop"
                    className="fixed inset-0 bg-background"
                    style={{ zIndex: isComplete ? -1 : 50 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isComplete ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    key="command"
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: isComplete ? -1 : 50 }}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ 
                        opacity: isComplete ? 0 : 1,
                        y: isComplete ? -20 : 0
                    }}
                    transition={{ 
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                >
                    <div 
                        className="font-mono text-xl text-foreground flex flex-col"
                        style={{ 
                            width: Math.max(maxWidth, 300), // minimum width of 300px
                            minWidth: Math.max(maxWidth, 300)
                        }}
                    >
                        <div className="text-left">
                            {isTypingComplete ? finalText : typedText}
                            {!isTypingComplete && (
                                <motion.span
                                    className="inline-block w-3 h-5 bg-foreground ml-1"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            )}
                        </div>
                        {isTypingComplete && (
                            <div className="mt-4 text-sm opacity-80 whitespace-pre-line text-left">
                                {responseText}
                                {!isResponseComplete && (
                                    <motion.span
                                        className="inline-block w-2 h-4 bg-foreground ml-1"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </>
        </AnimatePresence>
    );
}