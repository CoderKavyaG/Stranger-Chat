import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap, Video, MessageCircle, Lock, Users, ChevronDown, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import GlowBackground from "./GlowBackground"

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }
})

const floatingCard = (delay = 0) => ({
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }
})

function FloatingStatCard({ icon: Icon, label, value, className, delay }) {
    return (
        <motion.div {...floatingCard(delay)} className={className}>
            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3.5 hover:border-white/15 transition-all duration-500 group cursor-default animate-float" style={{ animationDelay: `${delay}s` }}>
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                    <p className="text-[13px] font-semibold text-white/90 tracking-tight">{value}</p>
                    <p className="text-[11px] text-white/35 font-medium">{label}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default function LandingPage({ onStart, onlineCount }) {
    const navLinks = ["How It Works", "Features", "Safety", "FAQ"]

    const features = [
        { icon: Shield, label: "Anonymous", desc: "Zero identity, zero trace. We never ask who you are." },
        { icon: Zap, label: "Instant Match", desc: "Connect with someone in under 3 seconds worldwide." },
        { icon: Video, label: "HD Video", desc: "Crystal clear P2P WebRTC video streaming." },
        { icon: MessageCircle, label: "Live Chat", desc: "Rich text messaging alongside video calls." },
    ]

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden text-white">
            <GlowBackground />

            {/* ─── Navbar ─────────────────────────────────────────────── */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full z-30 relative"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
                    {/* Logo — text-only wordmark */}
                    <span className="text-[20px] font-extrabold tracking-[-0.04em] bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent select-none">
                        drift<span className="text-indigo-400">.</span>
                    </span>

                    {/* Center Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 text-[13px] font-medium text-white/40 hover:text-white/90 rounded-lg hover:bg-white/[0.04] transition-all duration-300"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* Right CTA */}
                    <div className="flex items-center gap-3">
                        <a href="https://github.com/CoderKavyaG/Stranger-Chat" target="_blank" rel="noreferrer" className="text-white/25 hover:text-white/60 transition-colors p-2">
                            <Github className="w-[18px] h-[18px]" />
                        </a>
                        <Button
                            onClick={onStart}
                            className="bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 rounded-full px-5 h-9 text-[13px] font-semibold backdrop-blur-sm transition-all"
                        >
                            Enter Chat
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* ─── Hero ────────────────────────────────────────────────── */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 z-10 relative">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Status Badge */}
                    <motion.div {...fadeUp(0.1)} className="mb-8">
                        <Badge variant="outline" className="glass-card px-4 py-1.5 border-white/8 rounded-full text-white/70 font-medium text-[12px] gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            {onlineCount > 0 ? `${onlineCount.toLocaleString()} people drifting now` : "Users connecting now"}
                        </Badge>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        {...fadeUp(0.2)}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold tracking-[-0.035em] leading-[0.92] mb-7"
                    >
                        Talk to Strangers.
                        <br />
                        <span className="bg-gradient-to-r from-white/50 via-white/25 to-white/50 bg-clip-text text-transparent">
                            Stay Anonymous.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        {...fadeUp(0.35)}
                        className="text-white/40 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Instantly connect with people around the world through text, voice, and video — no sign up required.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <Button
                            onClick={onStart}
                            size="lg"
                            className="bg-white text-[#0a0a0a] hover:bg-white/90 px-10 py-7 text-[15px] font-bold rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_60px_rgba(255,255,255,0.08)] hover:shadow-[0_0_80px_rgba(255,255,255,0.15)]"
                        >
                            Start Chatting Now
                            <ArrowRight className="ml-1 w-4.5 h-4.5" />
                        </Button>
                        <a
                            href="#how-it-works"
                            className="text-white/35 text-sm font-medium hover:text-white/60 transition-colors flex items-center gap-1.5 group"
                        >
                            How It Works
                            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div {...fadeUp(0.6)} className="flex items-center justify-center gap-5 text-[11px] text-white/20 font-mono uppercase tracking-[0.15em]">
                        <span className="flex items-center gap-1.5">
                            <Lock className="w-3 h-3" /> No Login
                        </span>
                        <Separator orientation="vertical" className="h-3 bg-white/10" />
                        <span>No Signup</span>
                        <Separator orientation="vertical" className="h-3 bg-white/10" />
                        <span>Secure P2P</span>
                    </motion.div>
                </div>

                {/* ─── Floating Glass Cards ──────────────────────────── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
                    <FloatingStatCard
                        icon={Users}
                        value={onlineCount > 0 ? `${onlineCount.toLocaleString()} Live` : "12,430 Live"}
                        label="Active Users"
                        className="absolute top-[22%] left-[6%] pointer-events-auto"
                        delay={0.9}
                    />
                    <FloatingStatCard
                        icon={Lock}
                        value="End-to-End"
                        label="Encrypted"
                        className="absolute top-[35%] right-[5%] pointer-events-auto"
                        delay={1.1}
                    />
                    <FloatingStatCard
                        icon={Zap}
                        value="< 3 Seconds"
                        label="Instant Match"
                        className="absolute bottom-[22%] left-[10%] pointer-events-auto"
                        delay={1.3}
                    />
                </div>
            </main>

            {/* ─── Features Section ────────────────────────────────── */}
            <section id="features" className="relative z-10 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map(({ icon: Icon, label, desc }, i) => (
                            <motion.div
                                key={label}
                                {...floatingCard(1.0 + i * 0.12)}
                            >
                                <Card className="glass-card p-6 rounded-2xl hover:border-white/15 transition-all duration-500 group h-full bg-transparent border-white/[0.06]">
                                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5 group-hover:bg-white/[0.08] transition-colors">
                                        <Icon className="w-5 h-5 text-white/70" />
                                    </div>
                                    <h3 className="font-bold text-white/90 mb-1.5 text-[15px]">{label}</h3>
                                    <p className="text-[13px] text-white/30 leading-relaxed font-medium">{desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Footer ──────────────────────────────────────────── */}
            <footer className="relative z-10 w-full border-t border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-white/20 text-[12px] font-medium">
                        © 2025 drift — Built for the curious
                    </div>
                    <div className="flex gap-8 text-white/20 text-[12px] font-medium">
                        <a href="#" className="hover:text-white/50 transition-colors">Safety</a>
                        <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
                        <a href="https://github.com/CoderKavyaG/Stranger-Chat" target="_blank" rel="noreferrer" className="hover:text-white/50 transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
