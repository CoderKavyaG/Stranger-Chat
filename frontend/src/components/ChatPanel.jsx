import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function ChatPanel({ messages, onSend, disabled }) {
    const [input, setInput] = useState("")
    const bottomRef = useRef(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

    const handleSend = () => {
        if (!input.trim() || disabled) return
        onSend(input); setInput("")
    }

    return (
        <div className="flex flex-col h-full rounded-xl border border-[#27272a] bg-[#09090b] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#18181b] shrink-0">
                <p className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">Messages</p>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="flex flex-col gap-1.5 p-3">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-20 text-[#52525b] text-xs">
                            {disabled ? "Connect to start chatting" : "No messages yet"}
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i} className={cn("flex", msg.fromSelf ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[80%] px-3 py-1.5 rounded-lg text-sm break-words",
                                    msg.fromSelf
                                        ? "bg-blue-600 text-white rounded-br-sm"
                                        : "bg-[#18181b] text-[#e4e4e7] border border-[#27272a] rounded-bl-sm"
                                )}>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <div className="flex gap-2 p-2.5 border-t border-[#18181b] shrink-0">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                    disabled={disabled}
                    placeholder={disabled ? "Waiting for match…" : "Type a message…"}
                    className="flex-1 h-8 text-sm bg-[#18181b] border-[#27272a] text-white placeholder-[#52525b]"
                />
                <Button size="icon-sm" onClick={handleSend} disabled={disabled || !input.trim()} className="h-8 w-8 shrink-0">
                    <Send className="w-3.5 h-3.5" />
                </Button>
            </div>
        </div>
    )
}
