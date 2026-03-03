import { useState, useEffect, useRef, useCallback } from "react"
import { Video, Users, Loader2, SkipForward, Github } from "lucide-react"
import { useSocket } from "../hooks/useSocket"
import { useWebRTC } from "../hooks/useWebRTC"
import { useChat } from "../hooks/useChat"
import VideoPanel from "./VideoPanel"
import ChatPanel from "./ChatPanel"
import Controls from "./Controls"
import StatusBar from "./StatusBar"
import MediaSettings from "./MediaSettings"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ChatRoom({ onStop, onlineCount }) {
    const [appState, setAppState] = useState("waiting")
    const [roomId, setRoomId] = useState(null)
    const [isInitiator, setIsInitiator] = useState(false)
    const [statusText, setStatusText] = useState("waiting")
    const [partnerLeft, setPartnerLeft] = useState(false)
    const [waitingTooLong, setWaitingTooLong] = useState(false)
    const waitingTimerRef = useRef(null)

    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    const [isMuted, setIsMuted] = useState(false)
    const [isCamOff, setIsCamOff] = useState(false)
    const [mediaError, setMediaError] = useState(null)
    const [webrtcError, setWebrtcError] = useState(null)
    const [showSkip, setShowSkip] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const { messages, sendMessage, receiveMessage, clearMessages } = useChat(roomId)

    const clearTimer = () => { if (waitingTimerRef.current) { clearTimeout(waitingTimerRef.current); waitingTimerRef.current = null } }

    const handleMatched = useCallback(({ roomId: rId, initiator }) => {
        clearTimer(); setRoomId(rId); setIsInitiator(initiator); setAppState("chatting")
        setStatusText("connected"); setPartnerLeft(false); setWaitingTooLong(false); clearMessages()
    }, [])

    const handlePartnerLeft = useCallback(() => {
        setPartnerLeft(true); setStatusText("disconnected"); setAppState("waiting")
        setRemoteStream(null); setRoomId(null); setWebrtcError(null); clearMessages()
    }, [])

    const handleWaiting = useCallback(() => {
        setStatusText("waiting"); setAppState("waiting"); clearTimer()
        waitingTimerRef.current = setTimeout(() => setWaitingTooLong(true), 30000)
    }, [])

    const { emit } = useSocket({
        matched: handleMatched,
        partner_left: handlePartnerLeft,
        waiting: handleWaiting,
        receive_message: useCallback((d) => receiveMessage(d), [receiveMessage]),
    })

    const { destroyPeer } = useWebRTC({
        roomId: appState === "chatting" ? roomId : null,
        isInitiator, localStream,
        onRemoteStream: setRemoteStream,
        onError: (msg) => setWebrtcError(msg),
    })

    useEffect(() => {
        let s = null
            ; (async () => {
                try {
                    s = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: true })
                    setLocalStream(s)
                } catch (e) {
                    setMediaError(e.name === "NotAllowedError" ? "Camera/mic denied — text chat still works." : "Camera unavailable — text chat still works.")
                }
            })()
        return () => { if (s) s.getTracks().forEach(t => t.stop()) }
    }, [])

    useEffect(() => { emit("find_partner") }, [])
    useEffect(() => () => clearTimer(), [])

    const handleMuteToggle = () => {
        if (!localStream) return
        const t = localStream.getAudioTracks()[0]
        if (t) { t.enabled = isMuted; setIsMuted(!isMuted) }
    }
    const handleCamToggle = () => {
        if (!localStream) return
        const t = localStream.getVideoTracks()[0]
        if (t) { t.enabled = isCamOff; setIsCamOff(!isCamOff) }
    }

    const handleSkip = useCallback(() => {
        destroyPeer(); setRemoteStream(null); setRoomId(null); setWebrtcError(null)
        setPartnerLeft(false); clearMessages(); emit("leave_room"); setShowSkip(true)
        setTimeout(() => { setShowSkip(false); emit("find_partner") }, 1200)
    }, [destroyPeer, emit, clearMessages])

    const handleStop = useCallback(() => {
        destroyPeer(); emit("leave_room")
        if (localStream) localStream.getTracks().forEach(t => t.stop())
        clearTimer(); onStop()
    }, [destroyPeer, emit, localStream, onStop])

    return (
        <div className="flex flex-col h-screen bg-[#09090b] overflow-hidden">
            <header className="flex items-center justify-between px-4 h-14 border-b border-[#18181b] shrink-0">
                <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-white tracking-tight">StrangerChat</span>
                    <Separator orientation="vertical" className="h-4 bg-[#27272a]" />
                    <div className="flex items-center gap-1.5 text-xs text-[#52525b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        <Users className="w-3 h-3" />
                        <span>{onlineCount} online</span>
                    </div>
                </div>
                <StatusBar status={statusText} partnerLeft={partnerLeft} waitingTooLong={waitingTooLong} />
            </header>

            {mediaError && (
                <div className="px-4 py-2 text-xs text-amber-400 bg-amber-500/5 border-b border-amber-500/10 text-center shrink-0">
                    {mediaError}
                </div>
            )}

            <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0 overflow-hidden">
                <div className="flex flex-col gap-3 flex-1 min-h-0">
                    <div className="flex-1 min-h-0">
                        <VideoPanel
                            localStream={localStream} remoteStream={remoteStream}
                            isConnected={appState === "chatting"} isCamOff={isCamOff}
                            isMuted={isMuted} webrtcError={webrtcError}
                        />
                    </div>
                    <Controls
                        isMuted={isMuted} isCamOff={isCamOff} isWaiting={appState === "waiting"}
                        onMuteToggle={handleMuteToggle} onCamToggle={handleCamToggle}
                        onSkip={handleSkip} onStop={handleStop} onSettings={() => setShowSettings(true)}
                    />
                </div>

                <div className="flex flex-col lg:w-72 xl:w-80 h-56 lg:h-auto min-h-0">
                    <ChatPanel messages={messages} onSend={sendMessage} disabled={appState !== "chatting"} />
                </div>
            </div>

            <footer className="shrink-0 flex items-center justify-center gap-2 h-9 border-t border-[#18181b]">
                <span className="text-[11px] text-[#3f3f46]">
                    Built with care by{" "}
                    <a href="https://github.com/goelsahhab" target="_blank" rel="noopener noreferrer"
                        className="text-[#52525b] hover:text-[#a1a1aa] transition-colors font-medium">
                        @goelsahhab
                    </a>
                </span>
                <a href="https://github.com/goelsahhab" target="_blank" rel="noopener noreferrer"
                    className="text-[#3f3f46] hover:text-[#71717a] transition-colors">
                    <Github className="w-3 h-3" />
                </a>
            </footer>

            {showSkip && (
                <div className="absolute inset-0 bg-[#09090b]/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl border border-[#27272a] bg-[#18181b]">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        <p className="text-sm text-white font-medium">Finding next stranger…</p>
                    </div>
                </div>
            )}

            {partnerLeft && appState === "waiting" && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40">
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl">
                        <span className="text-sm text-white">Stranger has left</span>
                        <Button size="sm" variant="outline" className="h-7 text-xs"
                            onClick={() => { setPartnerLeft(false); emit("find_partner") }}>
                            <SkipForward className="w-3 h-3" /> Find new
                        </Button>
                    </div>
                </div>
            )}

            {showSettings && (
                <MediaSettings localStream={localStream} isMuted={isMuted} isCamOff={isCamOff}
                    onClose={() => setShowSettings(false)} />
            )}
        </div>
    )
}
