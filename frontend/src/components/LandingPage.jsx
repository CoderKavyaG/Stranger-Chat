import { Video, ArrowRight, Activity, Users, Globe, Shield, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage({ onStart, onlineCount }) {
    return (
        <div className="min-h-screen bg-[#f5f5f7] text-[#141416] font-sans overflow-x-hidden selection:bg-purple-500/20 font-['Inter'] pb-32">

            {/* Navbar Container */}
            <div className="px-4 sm:px-8 pt-6">
                <nav className="max-w-[1400px] mx-auto w-full h-[60px] flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded bg-[#201f35] flex items-center justify-center shadow-sm">
                            <Video className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[#201f35] tracking-tight text-[17px]">StrangerChat</span>
                    </div>

                    {/* Middle Nav */}
                    <div className="hidden md:flex items-center gap-8 text-[13px] text-[#5e5e66] font-semibold tracking-wide">
                        <span className="hover:text-[#201f35] cursor-pointer transition-colors">Platform</span>
                        <span className="hover:text-[#201f35] cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-[#201f35] cursor-pointer transition-colors">Developers</span>
                        <a href="https://github.com/goelsahhab" target="_blank" rel="noopener noreferrer" className="hover:text-[#201f35] transition-colors">
                            @goelsahhab
                        </a>
                    </div>

                    {/* Right Action */}
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e5e66]">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {onlineCount} active users
                        </span>
                        <button
                            onClick={onStart}
                            className="rounded-full px-6 h-[38px] text-[13px] font-semibold bg-[#201f35] text-white hover:bg-[#1a192e] shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            Start Chatting
                        </button>
                    </div>

                </nav>
            </div>

            <main className="px-4 sm:px-8 mt-6">

                {/* HERO CARD */}
                <section className="max-w-[1400px] mx-auto relative rounded-[2.5rem] overflow-hidden min-h-[550px] flex flex-col items-center pt-24 px-6 text-center shadow-sm shadow-[#201f35]/5 bg-gradient-to-b from-[#f2f2fa] to-[#d6d9f0]">

                    {/* Decorative abstract elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60">
                        <div className="absolute bottom-[-100px] left-[-10%] w-[60%] h-[300px] bg-indigo-300/30 blur-[80px] rounded-full" />
                        <div className="absolute bottom-[-100px] right-[-10%] w-[60%] h-[300px] bg-purple-300/30 blur-[80px] rounded-full" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center max-w-2xl">
                        <Sparkles className="w-7 h-7 text-[#201f35] mb-5" />

                        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#1e1e2d] mb-5 leading-[1.05]">
                            Where Connections <br /> Happen
                        </h1>

                        <p className="text-[#5e5e66] text-[15px] max-w-md mx-auto font-medium mb-8 leading-relaxed">
                            A programmable, privacy-focused WebRTC platform designed for seamless
                            peer-to-peer video streaming and native chats.
                        </p>

                        <button
                            onClick={onStart}
                            className="rounded-full px-8 h-12 text-sm font-semibold bg-[#111116] text-white hover:bg-[#000] shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            Try it now
                        </button>
                    </div>

                    <div className="absolute bottom-[-15%] flex justify-center w-full gap-24 pointer-events-none opacity-80">
                        {/* Visual abstract coins / cameras replacing the money bags */}
                        <div className="w-[300px] h-[300px] rounded-full border-[10px] border-[#e1e2f6] bg-gradient-to-br from-[#c9cbea] to-[#a3a6d4] shadow-2xl skew-x-12 -rotate-12 translate-x-12" />
                        <div className="w-[250px] h-[250px] rounded-full border-[8px] border-[#e1e2f6] bg-gradient-to-bl from-[#b5b8e0] to-[#8d91c7] shadow-2xl -skew-x-12 rotate-12 -translate-x-12 mt-12" />
                    </div>
                </section>

                {/* DETAILS SECTION */}
                <section className="max-w-[1400px] mx-auto mt-28">
                    <div className="flex flex-col lg:flex-row items-baseline justify-between gap-10">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-[40px] font-medium tracking-tight text-[#1e1e2d] leading-none">
                                What is StrangerChat?
                            </h2>
                            <div>
                                <button className="rounded-full px-6 py-2.5 bg-[#201f35] text-white text-[13px] font-medium hover:bg-[#1a192e] transition-colors shadow-sm">
                                    Explore now
                                </button>
                            </div>
                        </div>

                        <div className="max-w-[440px]">
                            <p className="text-[#4e4e56] text-[17px] leading-[1.6] font-medium">
                                StrangerChat is a fast, server-free WebRTC platform that helps your social circle
                                grow while keeping your identity completely anonymous and separate from centralized hubs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CARDS SECTION */}
                <section className="max-w-[1400px] mx-auto mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        {/* Main Long Card */}
                        <div className="md:col-span-12 lg:col-span-6 rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#e1e3f8] to-[#ced0ed] p-10 flex flex-col relative h-[380px] shadow-sm">
                            <div className="relative z-10 w-full max-w-[280px]">
                                <h3 className="text-2xl font-medium text-[#1e1e2d] mb-8">Connections that grow</h3>
                                <p className="text-[#5e5e66] text-[13px] leading-relaxed mt-24">
                                    Earn passive social interaction as your connections are deployed
                                    into high-performing P2P protocols without a middleman.
                                </p>
                            </div>
                            <div className="absolute right-[-5%] bottom-[-10%] opacity-90 pointer-events-none">
                                <Shield className="w-64 h-64 text-indigo-400/30" />
                            </div>
                        </div>

                        {/* Small Card 1 */}
                        <div className="md:col-span-6 lg:col-span-3 rounded-[1.75rem] bg-[#222138] p-10 flex flex-col relative overflow-hidden h-[380px]">
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-[22px] font-medium text-white mb-2 leading-[1.2]">Always fast,<br />always stable</h3>
                                <p className="text-[#9898a6] text-[13px] leading-relaxed mt-auto">
                                    Stay fully connected with instant access to your peers —
                                    no wait times or relay delays.
                                </p>
                            </div>
                        </div>

                        {/* Small Card 2 */}
                        <div className="md:col-span-6 lg:col-span-3 rounded-[1.75rem] bg-[#222138] p-10 flex flex-col relative overflow-hidden h-[380px]">
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-[22px] font-medium text-white mb-2 leading-[1.2]">100%<br />hands-free</h3>
                                <p className="text-[#9898a6] text-[13px] leading-relaxed mt-auto">
                                    No need to manage camera states manually. WebRTC negotiation works
                                    in the background securely for you.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* LOGO SECTION */}
                <section className="max-w-[1400px] mx-auto mt-24">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <p className="text-[12px] text-[#8e8e98] leading-tight max-w-[160px]">
                            Backed by modern open-source web technologies.
                        </p>

                        <div className="flex flex-wrap items-center gap-12 text-[#9898a6]">
                            <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /><span className="text-[14px] font-bold">WebRTC</span></div>
                            <div className="flex items-center gap-1.5"><Zap className="w-4 h-4" /><span className="text-[14px] font-bold">Socket.IO</span></div>
                            <div className="flex items-center gap-1.5"><Activity className="w-4 h-4" /><span className="text-[14px] font-bold">Express</span></div>
                            <div className="flex items-center gap-1.5"><Video className="w-4 h-4" /><span className="text-[14px] font-bold">React</span></div>
                        </div>
                    </div>
                </section>

                {/* USE CASES SECTION */}
                <section className="max-w-[1400px] mx-auto mt-32 mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                        <div className="lg:col-span-5 flex flex-col pt-4">
                            <span className="text-[#8e8e98] text-[12px] font-semibold tracking-wide uppercase mb-3">StrangerChat in Action</span>
                            <h2 className="text-[40px] font-medium tracking-tight text-[#1e1e2d] mb-4 leading-none">
                                Use cases
                            </h2>
                            <p className="text-[#5e5e66] text-[15px] leading-[1.6] max-w-sm">
                                StrangerChat offers a variety of use cases for developers, businesses
                                and friends seeking secure and lag-free video integrations.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="rounded-[1.75rem] bg-white p-10 md:p-12 flex flex-col min-h-[460px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-[#e8e8ed] relative overflow-hidden">
                                <h3 className="text-2xl font-medium text-[#1e1e2d] mb-3">Entertainment</h3>
                                <p className="text-[#5e5e66] text-[14px] leading-relaxed max-w-md">
                                    Boost user engagement by offering direct anonymous pairing, allowing your
                                    users to chat effortlessly across the globe.
                                </p>

                                <button className="flex items-center gap-2 mt-6 text-[13px] font-semibold text-[#1e1e2d] hover:text-[#5e5e66] transition-colors w-fit">
                                    <ArrowRight className="w-4 h-4" /> Learn more
                                </button>

                                <div className="absolute bottom-[-10%] right-[-5%] w-[80%] h-[280px] bg-gradient-to-t from-[#f0f2fa] to-transparent rounded-t-[2rem] border-t border-l border-[#e8e8ed] flex items-center justify-center pointer-events-none">
                                    <div className="w-[60%] h-[70%] bg-white/60 blur-md rounded-[1rem] shadow-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

        </div>
    )
}
