import { useEffect, useRef } from "react"
import { VideoOff, User, MicOff } from "lucide-react"
import { useVoiceActivity } from "@/hooks/useVoiceActivity"
import { cn } from "@/lib/utils"

function SpeakBars() {
    const heights = [10, 16, 12, 18, 10, 14, 10]
    return (
        <div className="flex items-end gap-[2px]" style={{ height: 16 }}>
            {heights.map((h, i) => (
                <span
                    key={i}
                    className="speak-bar bg-green-500"
                    style={{ height: h, animationDelay: `${i * 70}ms`, animationDuration: `${500 + i * 50}ms` }}
                />
            ))}
        </div>
    )
}

function VideoBox({ videoRef, stream, label, muted, isCamOff, isMuted, placeholderText, isSpeaking }) {
    return (
        <div className={cn(
            "relative flex-1 min-h-[200px] md:min-h-[250px] rounded-[1.75rem] overflow-hidden bg-[#e6e8fa] transition-all duration-300 shadow-[0_4px_30px_rgba(32,31,53,0.04)]",
            isSpeaking ? "shadow-[0_0_0_2px_rgba(34,197,94,0.4),0_0_30px_rgba(34,197,94,0.12)] border border-transparent" : "border border-[#d0d3f0]"
        )}>
            {stream && !isCamOff ? (
                <video ref={videoRef} autoPlay muted={muted} playsInline className="absolute inset-0 w-full h-full object-cover rounded-[1.75rem]" />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-[1rem] bg-[#dadcf1] border border-[#c9cbea] flex items-center justify-center shadow-inner">
                        {isCamOff ? <VideoOff className="w-6 h-6 text-[#8e8e98]" /> : <User className="w-6 h-6 text-[#8e8e98]" />}
                    </div>
                    <p className="text-[13px] font-medium text-[#8e8e98] tracking-wide mt-2">{placeholderText}</p>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-[#1e1e2d] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 shadow-sm">
                        {label}
                    </span>
                    {isSpeaking && <SpeakBars />}
                </div>
                {isMuted && (
                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-red-600 bg-red-100/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-200/50 shadow-sm">
                        <MicOff className="w-3 h-3" /> Muted
                    </span>
                )}
            </div>
        </div>
    )
}

export default function VideoPanel({ localStream, remoteStream, isConnected, isCamOff, isMuted, webrtcError }) {
    const localRef = useRef(null); const remoteRef = useRef(null)
    const isSpeaking = useVoiceActivity(localStream, isMuted)

    useEffect(() => { if (localRef.current && localStream) localRef.current.srcObject = localStream }, [localStream])
    useEffect(() => { if (remoteRef.current && remoteStream) remoteRef.current.srcObject = remoteStream }, [remoteStream])

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-full">
            <VideoBox videoRef={localRef} stream={localStream} label="You" muted isCamOff={isCamOff}
                isMuted={isMuted} placeholderText={isCamOff ? "Camera muted" : "Camera access denied"} isSpeaking={isSpeaking && !isMuted} />
            <VideoBox videoRef={remoteRef} stream={remoteStream} label="Stranger"
                placeholderText={webrtcError ? "Connection blocked (Strict NAT)" : isConnected ? "Connecting encrypted video…" : "Waiting for match…"} isSpeaking={false} />
        </div>
    )
}
