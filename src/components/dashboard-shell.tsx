import { cn } from "@/lib/utils";
import * as React from "react";

export function DashboardShell({
  children,
  className,
  ...other
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...other}>
      {children}
    </div>
  );
}
