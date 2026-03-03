import { Mic, MicOff, Video, VideoOff, SkipForward, Square, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Controls({ isMuted, isCamOff, isWaiting, onMuteToggle, onCamToggle, onSkip, onStop, onSettings }) {
    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 p-1 rounded-lg border border-[#27272a] bg-[#18181b]">
                <Button variant={isMuted ? "destructive" : "ghost"} size="sm" onClick={onMuteToggle}>
                    {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    {isMuted ? "Unmute" : "Mute"}
                </Button>
                <Button variant={isCamOff ? "destructive" : "ghost"} size="sm" onClick={onCamToggle}>
                    {isCamOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                    {isCamOff ? "Cam Off" : "Camera"}
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={onSettings} className="text-[#52525b] hover:text-[#a1a1aa]">
                    <Settings2 className="w-3.5 h-3.5" />
                </Button>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg border border-[#27272a] bg-[#18181b]">
                <Button variant="warning" size="sm" onClick={onSkip} disabled={isWaiting}>
                    <SkipForward className="w-3.5 h-3.5" />
                    Next
                </Button>
                <Button variant="destructive" size="sm" onClick={onStop}>
                    <Square className="w-3.5 h-3.5" />
                    End
                </Button>
            </div>
        </div>
    )
}
