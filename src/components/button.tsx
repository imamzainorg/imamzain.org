import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
		"transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	].join(" "),
	{
		variants: {
			variant: {
				default: [
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
					"dark:bg-Muharram_primary dark:text-Muharram_primary-foreground dark:hover:bg-Muharram_primary/90",
				].join(" "),
				
				destructive: [
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
					"dark:bg-Muharram_destructive dark:text-destructive-foreground dark:hover:bg-Muharram_destructive/90",
				].join(" "),
				
				outline: [
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
					"dark:border-Muharram_primary/30 dark:bg-Muharram_primary/10 dark:text-Muharram_primary",
					"dark:hover:bg-Muharram_primary/20 dark:hover:text-Muharram_primary-foreground",
				].join(" "),
				
				secondary: [
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
					"dark:bg-Muharram_secondary dark:text-Muharram_secondary-foreground dark:hover:bg-Muharram_secondary/80",
				].join(" "),
				
				ghost: [
					"hover:bg-accent hover:text-accent-foreground",
					"dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary",
				].join(" "),
				
				link: [
					"text-primary underline-offset-4 hover:underline",
					"dark:text-Muharram_primary dark:hover:text-Muharram_primary/80",
				].join(" "),
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button }