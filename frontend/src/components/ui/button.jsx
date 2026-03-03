import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white hover:bg-blue-500 shadow-sm",
                outline: "border border-[#27272a] bg-transparent text-[#a1a1aa] hover:bg-[#18181b] hover:text-white hover:border-[#3f3f46]",
                ghost: "text-[#71717a] hover:bg-[#18181b] hover:text-[#a1a1aa]",
                destructive: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15 hover:border-red-500/30",
                warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/30",
                success: "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/15",
                muted: "bg-[#18181b] text-[#71717a] border border-[#27272a] hover:text-[#a1a1aa]",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3 text-xs rounded-md",
                lg: "h-11 px-8 text-base rounded-lg",
                icon: "h-9 w-9",
                "icon-sm": "h-7 w-7 text-xs rounded-md",
            },
        },
        defaultVariants: { variant: "default", size: "default" },
    }
)

function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
