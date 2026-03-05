import { useState, useRef, useEffect } from "react"
import { Send, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function ChatPanel({ messages, onSend, disabled }) {
    const [input, setInput] = useState("")
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = () => {
        if (!input.trim() || disabled) return
        onSend(input)
        setInput("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const formatTime = (ts) =>
        new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    return (
        <div className="flex flex-col h-full glass border-white/5 rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 shrink-0">
                <Hash className="w-4 h-4 text-white/20" />
                <p className="text-sm font-bold tracking-tight text-white/50">MATCH_CHAT</p>
                <div className="ml-auto flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                </div>
            </div>

            <ScrollArea className="flex-1 min-h-0 bg-white/[0.01]">
                <div className="flex flex-col gap-4 p-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="p-4 bg-white/5 rounded-2xl mb-4">
                                <Send className="w-6 h-6 text-white/10" />
                            </div>
                            <p className="text-sm text-white/20 font-medium">
                                {disabled ? "Waiting for participant..." : "Say something interesting"}
                            </p>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex flex-col max-w-[85%]",
                                    msg.fromSelf ? "items-end ml-auto" : "items-start mr-auto"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-5 py-3.5 rounded-[20px] text-[15px] leading-snug break-words transition-all",
                                        msg.fromSelf
                                            ? "bg-white text-black font-semibold rounded-br-sm"
                                            : "bg-white/5 text-white/80 border border-white/5 rounded-bl-sm"
                                    )}
                                >
                                    {msg.message}
                                </div>
                                <span className="text-[10px] text-white/20 mt-2 font-mono px-2 uppercase tracking-tighter">
                                    {formatTime(msg.timestamp)}
                                </span>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <div className="p-4 pb-6 border-t border-white/5 shrink-0">
                <div className="flex items-center gap-2 p-2 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 transition-all">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={disabled ? "Finding someone..." : "Send clinical message..."}
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/20 h-10 px-3"
                    />
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={disabled || !input.trim()}
                        className="h-10 w-10 rounded-xl bg-white text-black hover:bg-white/90 shrink-0 transition-transform active:scale-95 disabled:bg-white/10 disabled:text-white/20"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

