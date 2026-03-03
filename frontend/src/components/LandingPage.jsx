import { Video, Shield, Zap, MessageSquare, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const features = [
    { icon: Shield, label: "Anonymous", desc: "No account, no trace" },
    { icon: Zap, label: "Instant Match", desc: "Matched in seconds" },
    { icon: Video, label: "P2P Video", desc: "WebRTC peer-to-peer" },
    { icon: MessageSquare, label: "Text Chat", desc: "Real-time messaging" },
]

export default function LandingPage({ onStart, onlineCount }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#09090b]">
            <header className="flex items-center justify-between px-6 h-14 border-b border-[#18181b]">
                <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-white tracking-tight">StrangerChat</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        <span>{onlineCount} online</span>
                    </div>
                    <a
                        href="https://github.com/goelsahhab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                        title="@goelsahhab"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
                <div className="flex flex-col items-center text-center gap-8 max-w-xl w-full">
                    <div className="flex flex-col items-center gap-4">
                        <Badge variant="outline" className="text-[11px] px-3">
                            No account required
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
                            Talk to strangers,
                            <br />
                            <span className="text-blue-500">anonymously.</span>
                        </h1>
                        <p className="text-[#71717a] text-base leading-relaxed">
                            Random video and text chat. Press start and you get matched with someone, instantly.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 w-full max-w-[260px]">
                        <Button size="lg" onClick={onStart} className="w-full rounded-lg font-semibold">
                            Start Chatting
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <p className="text-[#52525b] text-xs">No plugins · Works in your browser</p>
                    </div>

                    <Separator className="bg-[#18181b] max-w-sm" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                        {features.map(({ icon: Icon, label, desc }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[#18181b] bg-[#09090b] hover:border-[#27272a] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-white">{label}</p>
                                    <p className="text-[11px] text-[#52525b] mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="flex items-center justify-center gap-2 py-4 border-t border-[#18181b]">
                <span className="text-xs text-[#52525b]">
                    Built with care by{" "}
                    <a
                        href="https://github.com/goelsahhab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#71717a] hover:text-white transition-colors font-medium"
                    >
                        @goelsahhab
                    </a>
                </span>
                <span className="text-[#3f3f46] text-xs">·</span>
                <span className="text-xs text-[#3f3f46]">WebRTC · Socket.IO · React</span>
            </footer>
        </div>
    )
}
