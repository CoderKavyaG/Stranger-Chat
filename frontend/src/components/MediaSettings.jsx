import { useState, useEffect } from "react"
import { Mic, Camera, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function MediaSettings({ localStream, isMuted, isCamOff, onClose, onSave }) {
    const [audioDevices, setAudioDevices] = useState([])
    const [videoDevices, setVideoDevices] = useState([])
    const [activeAudioId, setActiveAudioId] = useState("")
    const [activeVideoId, setActiveVideoId] = useState("")

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            setAudioDevices(devices.filter((d) => d.kind === "audioinput"))
            setVideoDevices(devices.filter((d) => d.kind === "videoinput"))

            if (localStream) {
                const audioTrack = localStream.getAudioTracks()[0]
                const videoTrack = localStream.getVideoTracks()[0]
                if (audioTrack) setActiveAudioId(audioTrack.getSettings().deviceId || "")
                if (videoTrack) setActiveVideoId(videoTrack.getSettings().deviceId || "")
            }
        })
    }, [localStream])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <Card className="glass w-full max-w-lg border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[32px]">
                <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold tracking-tight">Devices</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
                            <X className="w-5 h-5 text-white/50" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-8 pt-0 flex flex-col gap-8">
                    {/* Audio Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-xl">
                                    <Mic className="w-5 h-5 text-white/60" />
                                </div>
                                <span className="text-lg font-semibold">Microphone</span>
                            </div>
                            <Badge variant="outline" className="border-white/10 uppercase tracking-widest text-[10px] py-0.5">
                                {isMuted ? "Muted" : "Active"}
                            </Badge>
                        </div>
                        <div className="grid gap-2">
                            {audioDevices.length === 0 ? (
                                <p className="text-sm text-white/20">No microphones found</p>
                            ) : (
                                audioDevices.map((device) => (
                                    <button
                                        key={device.deviceId}
                                        onClick={() => setActiveAudioId(device.deviceId)}
                                        className={cn(
                                            "flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all border",
                                            device.deviceId === activeAudioId
                                                ? "bg-white text-black border-white"
                                                : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10"
                                        )}
                                    >
                                        <span className="font-medium truncate mr-4">
                                            {device.label || `Microphone ${audioDevices.indexOf(device) + 1}`}
                                        </span>
                                        {device.deviceId === activeAudioId && <Check className="w-4 h-4 shrink-0" />}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-xl">
                                    <Camera className="w-5 h-5 text-white/60" />
                                </div>
                                <span className="text-lg font-semibold">Camera</span>
                            </div>
                            <Badge variant="outline" className="border-white/10 uppercase tracking-widest text-[10px] py-0.5">
                                {isCamOff ? "Disconnected" : "Active"}
                            </Badge>
                        </div>
                        <div className="grid gap-2">
                            {videoDevices.length === 0 ? (
                                <p className="text-sm text-white/20">No cameras found</p>
                            ) : (
                                videoDevices.map((device) => (
                                    <button
                                        key={device.deviceId}
                                        onClick={() => setActiveVideoId(device.deviceId)}
                                        className={cn(
                                            "flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all border",
                                            device.deviceId === activeVideoId
                                                ? "bg-white text-black border-white"
                                                : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10"
                                        )}
                                    >
                                        <span className="font-medium truncate mr-4">
                                            {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
                                        </span>
                                        {device.deviceId === activeVideoId && <Check className="w-4 h-4 shrink-0" />}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <Button onClick={() => onSave(activeAudioId, activeVideoId)} size="lg" className="w-full bg-white text-black hover:bg-white/90 rounded-2xl py-6 font-bold text-base mt-4 transition-transform active:scale-[0.98]">
                        Save configuration
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

