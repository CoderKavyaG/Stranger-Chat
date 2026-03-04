import { useEffect, useRef } from "react"
import { VideoOff, UserCircle2, AlertTriangle, Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useVoiceActivity } from "@/hooks/useVoiceActivity"
import { cn } from "@/lib/utils"

function VideoBox({ videoRef, stream, label, muted = false, isCamOff = false, placeholder, isSpeaking = false }) {
    return (
        <div className={cn(
            "relative flex-1 min-h-[300px] md:min-h-[400px] rounded-[32px] overflow-hidden bg-white/[0.02] border transition-all duration-500",
            isSpeaking
                ? "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                : "border-white/5"
        )}>
            {stream && !isCamOff ? (
                <video
                    ref={videoRef}
                    autoPlay
                    muted={muted}
                    playsInline
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                        isSpeaking && "scale-[1.02]"
                    )}
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/40 backdrop-blur-xl">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        {placeholder.icon}
                    </div>
                    <span className="text-white/40 font-medium tracking-wide uppercase text-xs">{placeholder.text}</span>
                </div>
            )}

            {/* Overlays */}
            <div className="absolute top-6 left-6 z-10">
                <Badge className="glass-dark border-white/10 text-white/50 px-4 py-2 rounded-full flex gap-2 items-center">
                    <div className={cn("w-1.5 h-1.5 rounded-full", stream && !isCamOff ? "bg-green-500" : "bg-white/20")} />
                    {label}
                </Badge>
            </div>

            {isSpeaking && (
                <div className="absolute bottom-6 left-6 z-10 flex items-center gap-1 px-4 py-2 rounded-full glass-dark border-green-500/30">
                    <div className="flex items-center gap-0.5">
                        <span className="w-1 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse [animation-delay:300ms]" />
                    </div>
                    <span className="text-[10px] font-bold text-green-500 uppercase ml-2 tracking-widest">Live Audio</span>
                </div>
            )}
        </div>
    )
}

export default function VideoPanel({ localStream, remoteStream, isConnected, isCamOff, isMuted, webrtcError }) {
    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)
    const isSpeaking = useVoiceActivity(localStream, isMuted)

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream
        }
    }, [localStream, isCamOff])

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
        }
    }, [remoteStream])

    const localPlaceholder = {
        icon: <VideoOff className="w-8 h-8 text-white/20" />,
        text: isCamOff ? "Camera Hidden" : "No Camera Source"
    }

    const remotePlaceholder = webrtcError ? {
        icon: <AlertTriangle className="w-8 h-8 text-amber-500/40" />,
        text: "Connection Error"
    } : {
        icon: <UserCircle2 className="w-8 h-8 text-white/20" />,
        text: isConnected ? "Loading Stream..." : "Searching for Stranger"
    }

    return (
        <div className="flex flex-col xl:flex-row gap-6 w-full h-full">
            <VideoBox
                videoRef={localVideoRef}
                stream={localStream}
                label="Your Camera"
                muted
                isCamOff={isCamOff}
                placeholder={localPlaceholder}
                isSpeaking={isSpeaking && !isMuted}
            />
            <VideoBox
                videoRef={remoteVideoRef}
                stream={remoteStream}
                label="Stranger"
                placeholder={remotePlaceholder}
            />
        </div>
    )
}

