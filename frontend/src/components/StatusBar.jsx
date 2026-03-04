import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Loader2, CheckCircle2, Github } from "lucide-react"

export default function StatusBar({ status, partnerLeft, waitingTooLong }) {
    if (partnerLeft) {
        return (
            <Badge variant="destructive" className="gap-1.5 glass-dark border-red-500/20 text-red-400">
                <WifiOff className="w-3 h-3" />
                Stranger disconnected
            </Badge>
        )
    }

    const map = {
        waiting: (
            <Badge variant="warning" className="gap-1.5 glass-dark border-amber-500/20 text-amber-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                {waitingTooLong ? "Still searching…" : "Looking for stranger"}
            </Badge>
        ),
        connected: (
            <Badge variant="success" className="gap-1.5 glass-dark border-green-500/20 text-green-400">
                <CheckCircle2 className="w-3 h-3" />
                Connected
            </Badge>
        ),
        disconnected: (
            <Badge variant="destructive" className="gap-1.5 glass-dark border-red-500/20 text-red-400">
                <WifiOff className="w-3 h-3" />
                Disconnected
            </Badge>
        ),
        idle: (
            <Badge variant="muted" className="gap-1.5 glass-dark border-white/10 text-white/40">
                <Wifi className="w-3 h-3" />
                Ready
            </Badge>
        ),
    }

    const badge = map[status] || map.idle

    return (
        <div className="flex items-center gap-4">
            {badge}
            <a
                href="https://github.com/CoderKavyaG/Stranger-Chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                title="View on GitHub"
            >
                <Github className="w-5 h-5" />
            </a>
        </div>
    )
}

