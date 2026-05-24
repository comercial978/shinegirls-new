import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
};

export function ButtonLink({ href, children, variant = "dark", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "dark" && "bg-ink text-pearl hover:bg-wine",
        variant === "light" && "bg-pearl text-ink hover:bg-blush",
        variant === "outline" && "border hairline bg-transparent text-ink hover:border-rose hover:text-wine",
        className,
      )}
    >
      {children}
      <ArrowUpRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}
