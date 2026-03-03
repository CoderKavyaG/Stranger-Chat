import { Github, Wifi, WifiOff, Loader2, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function StatusBar({ status, partnerLeft, waitingTooLong }) {
    const badge = partnerLeft
        ? <Badge variant="destructive" className="gap-1.5"><WifiOff className="w-3 h-3" />Stranger left</Badge>
        : status === "connected"
            ? <Badge variant="success" className="gap-1.5"><CheckCircle2 className="w-3 h-3" />Connected</Badge>
            : status === "waiting"
                ? <Badge variant="warning" className="gap-1.5">
                    {waitingTooLong ? <Clock className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                    {waitingTooLong ? "Still searching" : "Finding match"}
                </Badge>
                : status === "disconnected"
                    ? <Badge variant="destructive" className="gap-1.5"><WifiOff className="w-3 h-3" />Disconnected</Badge>
                    : <Badge variant="muted" className="gap-1.5"><Wifi className="w-3 h-3" />Ready</Badge>

    return (
        <div className="flex items-center gap-2">
            {badge}
            <a
                href="https://github.com/goelsahhab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3f3f46] hover:text-[#71717a] transition-colors"
                title="@goelsahhab on GitHub"
            >
                <Github className="w-3.5 h-3.5" />
            </a>
        </div>
    )
}
