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
        <div className="flex flex-col h-screen bg-[#f5f5f7] overflow-hidden text-[#141416]">
            <header className="flex items-center justify-between px-6 h-14 border-b border-[#e1e2f6] bg-white shrink-0 shadow-sm shadow-[#201f35]/5 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-[#201f35] flex items-center justify-center">
                        <Video className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-[#201f35] tracking-tight">StrangerChat</span>
                    <div className="h-4 w-[1px] bg-[#e1e2f6] mx-1" />
                    <div className="flex items-center gap-1.5 text-xs text-[#5e5e66] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <Users className="w-3 h-3" />
                        {onlineCount} online
                    </div>
                </div>
                <StatusBar status={statusText} partnerLeft={partnerLeft} waitingTooLong={waitingTooLong} />
            </header>

            {mediaError && (
                <div className="px-4 py-2 text-[13px] font-medium text-amber-700 bg-amber-50 border-b border-amber-100 text-center shrink-0">
                    {mediaError}
                </div>
            )}

            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0 overflow-hidden bg-[#f5f5f7]">
                <div className="flex flex-col gap-4 flex-1 min-h-0">
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

                <div className="flex flex-col lg:w-[340px] xl:w-[380px] h-64 lg:h-auto min-h-0">
                    <ChatPanel messages={messages} onSend={sendMessage} disabled={appState !== "chatting"} />
                </div>
            </div>

            <footer className="shrink-0 flex items-center justify-center gap-2 h-10 border-t border-[#e1e2f6] bg-white">
                <span className="text-[12px] font-medium text-[#5e5e66]">
                    Built with care by{" "}
                    <a href="https://github.com/goelsahhab" target="_blank" rel="noopener noreferrer"
                        className="text-[#201f35] hover:text-[#5e5e66] transition-colors">
                        @goelsahhab
                    </a>
                </span>
                <a href="https://github.com/goelsahhab" target="_blank" rel="noopener noreferrer"
                    className="text-[#5e5e66] hover:text-[#201f35] transition-colors">
                    <Github className="w-3.5 h-3.5" />
                </a>
            </footer>

            {showSkip && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="flex flex-col items-center gap-4 px-10 py-8 rounded-[1.5rem] bg-white shadow-2xl border border-[#e1e2f6]">
                        <Loader2 className="w-7 h-7 text-[#201f35] animate-spin" />
                        <p className="text-[15px] font-semibold text-[#141416]">Finding next stranger…</p>
                    </div>
                </div>
            )}

            {partnerLeft && appState === "waiting" && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40">
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-white border border-[#e1e2f6] rounded-full shadow-lg">
                        <span className="text-sm font-medium text-[#141416]">Stranger left</span>
                        <button
                            onClick={() => { setPartnerLeft(false); emit("find_partner") }}
                            className="flex items-center gap-1.5 px-4 h-8 bg-[#201f35] hover:bg-[#1a1a2e] text-white text-[13px] font-medium rounded-full transition-colors"
                        >
                            <SkipForward className="w-3.5 h-3.5" /> Find new
                        </button>
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
