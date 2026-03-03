import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "border-transparent bg-blue-600 text-white",
                outline: "border-[#27272a] text-[#71717a] bg-transparent",
                success: "border-green-500/20 bg-green-500/10 text-green-400",
                warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
                destructive: "border-red-500/20 bg-red-500/10 text-red-400",
                muted: "border-[#27272a] bg-[#18181b] text-[#71717a]",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
