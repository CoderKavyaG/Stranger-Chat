import { Mic, MicOff, Video, VideoOff, SkipForward, PowerOff, Settings2 } from "lucide-react"

function CtrlBtn({ onClick, icon: Icon, active, disabled, activeColor = "red", label }) {
    const base = "flex flex-col items-center justify-center w-[60px] h-[60px] rounded-[1rem] transition-all"
    const idle = "bg-white border border-[#e1e2f6] text-[#5e5e66] hover:bg-[#f5f5f7] hover:border-[#d0d3f0] hover:text-[#1e1e2d] shadow-sm"
    const actv = activeColor === "red"
        ? "bg-red-50 border border-red-200 text-red-600 shadow-sm"
        : "bg-[#201f35] border border-[#201f35] text-white shadow-md shadow-[#201f35]/20"
    const disbl = "opacity-40 pointer-events-none"

    return (
        <button onClick={onClick} disabled={disabled} className={`${base} ${active ? actv : idle} ${disabled ? disbl : ""}`} title={label}>
            <Icon className="w-[22px] h-[22px] mb-1" strokeWidth={2.5} />
            <span className="text-[10px] font-bold tracking-wide uppercase">{label}</span>
        </button>
    )
}

export default function Controls({ isMuted, isCamOff, isWaiting, onMuteToggle, onCamToggle, onSkip, onStop, onSettings }) {
    return (
        <div className="flex items-center justify-center gap-4 flex-wrap pb-2 pt-1">

            {/* Media Group */}
            <div className="flex items-center gap-3 bg-[#e6e8fa]/50 p-2.5 rounded-[1.25rem] border border-[#d6d9f0]">
                <CtrlBtn onClick={onMuteToggle} icon={isMuted ? MicOff : Mic} active={isMuted} label="Mic" />
                <div className="w-[1px] h-8 bg-[#d0d3f0] mx-1" />
                <CtrlBtn onClick={onCamToggle} icon={isCamOff ? VideoOff : Video} active={isCamOff} label="Cam" />
                <div className="w-[1px] h-8 bg-[#d0d3f0] mx-1" />
                <button
                    onClick={onSettings}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#8e8e98] hover:bg-white hover:border-[#d0d3f0] hover:shadow-sm border border-transparent transition-all"
                >
                    <Settings2 className="w-[18px] h-[18px]" />
                </button>
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-3 bg-[#e6e8fa]/50 p-2.5 rounded-[1.25rem] border border-[#d6d9f0]">
                <CtrlBtn onClick={onSkip} icon={SkipForward} disabled={isWaiting} activeColor="dark" label="Next" />
                <div className="w-[1px] h-8 bg-[#d0d3f0] mx-1" />
                <CtrlBtn onClick={onStop} icon={PowerOff} active activeColor="dark" label="End" />
            </div>

        </div>
    )
}
