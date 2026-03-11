import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function GlowBackground() {
    const containerRef = useRef(null)

    // Generate floating particles
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const particleCount = 50
        const particles = []

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div")
            particle.classList.add("particle")
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.width = `${Math.random() * 2 + 1}px`
            particle.style.height = particle.style.width
            particle.style.animationDuration = `${Math.random() * 20 + 15}s`
            particle.style.animationDelay = `${Math.random() * 10}s`
            particle.style.opacity = `${Math.random() * 0.4 + 0.1}`
            container.appendChild(particle)
            particles.push(particle)
        }

        return () => {
            particles.forEach(p => p.remove())
        }
    }, [])

    return (
        <div ref={containerRef} className="glow-bg">
            {/* Primary Orb — gold/indigo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-full h-full orb opacity-30 blur-[100px]"
                    style={{
                        background: "conic-gradient(from 180deg at 50% 50%, rgba(99, 102, 241, 0.6) 0deg, rgba(168, 85, 247, 0.5) 90deg, rgba(217, 119, 6, 0.4) 180deg, rgba(56, 189, 248, 0.5) 270deg, rgba(99, 102, 241, 0.6) 360deg)"
                    }}
                />
            </div>

            {/* Secondary Orb — pink/blue accent */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 0.5 }}
                className="absolute top-[60%] left-[30%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] orb-reverse opacity-20 blur-[120px]"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)"
                }}
            />

            {/* Top-right ambient light */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />

            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30" />

            {/* Subtle noise grain */}
            <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')" }} />
        </div>
    )
}


