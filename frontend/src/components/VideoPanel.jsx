import { useEffect, useRef } from "react"
import { VideoOff, UserRound, AlertTriangle, MicOff } from "lucide-react"
import { useVoiceActivity } from "@/hooks/useVoiceActivity"
import { cn } from "@/lib/utils"

function SpeakBars() {
    const heights = [10, 16, 12, 18, 10, 14, 10]
    return (
        <div className="flex items-end gap-[2px]" style={{ height: 16 }}>
            {heights.map((h, i) => (
                <span
                    key={i}
                    className="speak-bar"
                    style={{
                        height: h,
                        animationDelay: `${i * 70}ms`,
                        animationDuration: `${500 + i * 50}ms`,
                    }}
                />
            ))}
        </div>
    )
}

function VideoBox({ videoRef, stream, label, muted, isCamOff, isMuted, placeholderText, isSpeaking }) {
    return (
        <div className="relative flex-1 min-h-[200px] md:min-h-[250px] rounded-xl overflow-hidden border bg-[#09090b] transition-all duration-300"
            style={{
                borderColor: isSpeaking ? "rgb(34 197 94 / 0.5)" : "#27272a",
                boxShadow: isSpeaking ? "0 0 0 1px rgb(34 197 94 / 0.2)" : "none"
            }}>
            {stream && !isCamOff ? (
                <video ref={videoRef} autoPlay muted={muted} playsInline className="absolute inset-0 w-full h-full object-cover" />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                        {isCamOff ? <VideoOff className="w-5 h-5 text-[#52525b]" /> : <UserRound className="w-5 h-5 text-[#52525b]" />}
                    </div>
                    <p className="text-xs text-[#52525b]">{placeholderText}</p>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                        {label}
                    </span>
                    {isSpeaking && <SpeakBars />}
                </div>
                {isMuted && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-red-500/20">
                        <MicOff className="w-2.5 h-2.5" /> muted
                    </span>
                )}
            </div>
        </div>
    )
}

export default function VideoPanel({ localStream, remoteStream, isConnected, isCamOff, isMuted, webrtcError }) {
    const localRef = useRef(null)
    const remoteRef = useRef(null)
    const isSpeaking = useVoiceActivity(localStream, isMuted)

    useEffect(() => { if (localRef.current && localStream) localRef.current.srcObject = localStream }, [localStream])
    useEffect(() => { if (remoteRef.current && remoteStream) remoteRef.current.srcObject = remoteStream }, [remoteStream])

    const remotePlaceholder = webrtcError
        ? "Video unavailable — text chat still works"
        : isConnected ? "Connecting video…" : "Waiting for stranger…"

    return (
        <div className="flex flex-col md:flex-row gap-3 w-full h-full">
            <VideoBox videoRef={localRef} stream={localStream} label="You" muted isCamOff={isCamOff}
                isMuted={isMuted} placeholderText={isCamOff ? "Camera off" : "No camera"} isSpeaking={isSpeaking && !isMuted} />
            <VideoBox videoRef={remoteRef} stream={remoteStream} label="Stranger"
                placeholderText={remotePlaceholder} isSpeaking={false} />
        </div>
    )
}
