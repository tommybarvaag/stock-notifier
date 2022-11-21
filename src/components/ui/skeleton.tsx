import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...other
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-5 w-2/5 animate-pulse rounded-lg bg-slate-100",
        className
      )}
      {...other}
    />
  );
}
