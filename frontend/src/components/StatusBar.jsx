import { Github, Wifi, WifiOff, Loader2, CheckCircle2, Clock } from "lucide-react"

export default function StatusBar({ status, partnerLeft, waitingTooLong }) {
    const SBadge = ({ color, bg, border, icon: Icon, text, spin }) => (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border ${color} ${bg} ${border}`}>
            <Icon className={`w-3.5 h-3.5 ${spin ? "animate-spin" : ""}`} />
            <span>{text}</span>
        </div>
    )

    const badge = partnerLeft
        ? <SBadge icon={WifiOff} text="Stranger left" color="text-red-700" bg="bg-red-50" border="border-red-200" />
        : status === "connected"
            ? <SBadge icon={CheckCircle2} text="Connected" color="text-green-700" bg="bg-green-50" border="border-green-200" />
            : status === "waiting"
                ? <SBadge icon={waitingTooLong ? Clock : Loader2} spin={!waitingTooLong} text={waitingTooLong ? "Still searching" : "Finding match"} color="text-amber-700" bg="bg-amber-50" border="border-amber-200" />
                : status === "disconnected"
                    ? <SBadge icon={WifiOff} text="Disconnected" color="text-red-700" bg="bg-red-50" border="border-red-200" />
                    : <SBadge icon={Wifi} text="Ready" color="text-[#5e5e66]" bg="bg-[#f5f5f7]" border="border-[#e1e2f6]" />

    return (
        <div className="flex items-center gap-3">
            {badge}
            <a
                href="https://github.com/goelsahhab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8e8e98] hover:text-[#201f35] transition-colors"
                title="@goelsahhab on GitHub"
            >
                <Github className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </a>
        </div>
    )
}
