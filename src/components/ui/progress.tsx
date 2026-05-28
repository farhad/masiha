import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const bounded = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-full bg-[var(--surface-strong)]",
        className,
      )}
      aria-label={`${Math.round(bounded)}% complete`}
    >
      <div
        className="h-full rounded-full bg-[var(--gold)] transition-all"
        style={{ width: `${bounded}%` }}
      />
    </div>
  );
}
