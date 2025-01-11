'use client'
import Link from 'next/link'
import { Home, ArrowLeft } from 'react-feather'
import Header from '@/components/Header'
import { useEffect, useRef, useState } from 'react'

interface Bouncer {
    id: number;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
}

function BouncingLogo() {
    const [bouncers, setBouncers] = useState<Bouncer[]>([
        { id: 1, position: { x: 100, y: 100 }, velocity: { x: 4, y: 3 } },
        { id: 2, position: { x: 300, y: 200 }, velocity: { x: -3, y: 4 } },
        { id: 3, position: { x: 500, y: 150 }, velocity: { x: -4, y: -3 } },
        { id: 4, position: { x: 200, y: 300 }, velocity: { x: 3, y: -4 } },
    ])
    
    const containerRef = useRef<HTMLDivElement>(null)
    const logoRefs = useRef<(HTMLDivElement | null)[]>([])
    const buttonsRef = useRef<HTMLDivElement>(null)

    const setLogoRef = (index: number) => (el: HTMLDivElement | null) => {
        logoRefs.current[index] = el
    }

    useEffect(() => {
        let animationFrameId: number
        let lastTime = performance.now()

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 12 // Normalize to ~60fps
            lastTime = currentTime

            if (!containerRef.current || !buttonsRef.current) return

            const container = containerRef.current.getBoundingClientRect()
            const buttons = buttonsRef.current.getBoundingClientRect()
            const bottomBoundary = container.height - (buttons.height + 32)

            setBouncers(prevBouncers => prevBouncers.map((bouncer, index) => {
                const logo = logoRefs.current[index]?.getBoundingClientRect()
                if (!logo) return bouncer

                let newX = bouncer.position.x + bouncer.velocity.x * deltaTime
                let newY = bouncer.position.y + bouncer.velocity.y * deltaTime
                let newVelocityX = bouncer.velocity.x
                let newVelocityY = bouncer.velocity.y

                // Bounce off walls
                if (newX <= 0 || newX + logo.width >= container.width) {
                    newVelocityX = -bouncer.velocity.x
                }

                // Bounce off top and bottom
                if (newY <= 0 || newY + logo.height >= bottomBoundary) {
                    newVelocityY = -bouncer.velocity.y
                }

                // Keep within bounds
                newX = Math.max(0, Math.min(newX, container.width - logo.width))
                newY = Math.max(0, Math.min(newY, bottomBoundary - logo.height))

                return {
                    ...bouncer,
                    position: { x: newX, y: newY },
                    velocity: { x: newVelocityX, y: newVelocityY }
                }
            }))

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <>
            <div 
                ref={containerRef} 
                className="fixed inset-x-0 bottom-0 top-[calc(73px+3rem)] overflow-hidden"
            >
                {bouncers.map((bouncer, index) => (
                    <div
                        key={bouncer.id}
                        ref={setLogoRef(index)}
                        className="absolute font-uni text-6xl font-bold select-none opacity-80"
                        style={{
                            transform: `translate(${bouncer.position.x}px, ${bouncer.position.y}px)`,
                        }}
                    >
                        404
                    </div>
                ))}
            </div>
            <div 
                ref={buttonsRef} 
                className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4"
            >
                <Link 
                    href="/"
                    className="flex font-uni items-center gap-2 border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors bg-background"
                >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                </Link>
                <button 
                    onClick={() => window.history.back()}
                    className="flex font-uni items-center gap-2 border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors bg-background"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back</span>
                </button>
            </div>
        </>
    )
}

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background">
            <Header />
            <div className="h-[3rem] flex items-center justify-center">
                <h2 className="text-2xl font-xl tracking-wide font-uni">404 NOT FOUND</h2>
            </div>
            <BouncingLogo />
        </main>
    )
} 