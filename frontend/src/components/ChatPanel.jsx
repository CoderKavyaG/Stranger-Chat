import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle } from "lucide-react"

export default function ChatPanel({ messages, onSend, disabled }) {
    const [input, setInput] = useState("")
    const bottomRef = useRef(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

    const handleSend = () => {
        if (!input.trim() || disabled) return
        onSend(input); setInput("")
    }

    return (
        <div className="flex flex-col h-full rounded-[1.75rem] border border-[#e1e2f6] bg-white shadow-sm overflow-hidden relative">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#f2f2fa] shrink-0 bg-white">
                <MessageCircle className="w-4 h-4 text-[#201f35]" />
                <span className="text-[13px] font-bold text-[#1e1e2d] uppercase tracking-wide">Live Chat</span>
                {messages.length > 0 && <span className="ml-auto text-[11px] font-medium text-[#8e8e98]">{messages.length}</span>}
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto w-full bg-[#fcfcfd]" style={{ scrollbarWidth: "none" }}>
                <div className="flex flex-col gap-2 p-5">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-28 text-[#8e8e98] text-[13px] font-medium mt-10">
                            <div className="w-12 h-12 rounded-[1rem] bg-[#f5f5f7] border border-[#e1e2f6] flex items-center justify-center mb-4">
                                <MessageCircle className="w-5 h-5 text-[#8e8e98]" />
                            </div>
                            {disabled ? "Connect to chat securely" : "Say hi!"}
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.fromSelf ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed break-words shadow-sm
                   ${msg.fromSelf
                                        ? "bg-[#201f35] text-white rounded-2xl rounded-tr-md"
                                        : "bg-white text-[#1e1e2d] border border-[#e1e2f6] rounded-2xl rounded-tl-md"
                                    }`}>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} className="h-2" />
                </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 border-t border-[#f2f2fa] shrink-0 bg-white">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                    disabled={disabled}
                    placeholder={disabled ? "Waiting..." : "Send a message"}
                    className="flex-1 h-[42px] px-4 text-[14px] bg-[#f5f5f7] border border-[#e8e8ed] rounded-full text-[#141416] 
            placeholder:text-[#8e8e98] focus:outline-none focus:border-[#201f35] focus:ring-1 focus:ring-[#201f35] transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="h-[42px] w-[42px] rounded-full bg-[#201f35] flex items-center justify-center text-white shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a192e] transition-colors shadow-sm"
                >
                    <Send className="w-4 h-4 ml-0.5" />
                </button>
            </div>
        </div>
    )
}
