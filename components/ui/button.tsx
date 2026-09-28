import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-moss text-cream hover:bg-moss-deep",
  secondary: "border border-ink/15 bg-transparent text-ink hover:border-ink/50",
  ghost: "text-ink hover:bg-ink/5",
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, styles[variant], className)} {...props} />;
}
