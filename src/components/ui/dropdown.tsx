"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { cn } from "@/lib/utils";

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps;

export function DropdownMenu({ ...other }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...other} />;
}

DropdownMenu.Trigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...other }, ref) {
  return <DropdownMenuPrimitive.Trigger {...other} ref={ref} />;
});

DropdownMenu.Portal = DropdownMenuPrimitive.Portal;

DropdownMenu.Content = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...other }, ref) {
  return (
    <DropdownMenuPrimitive.Content
      ref={ref}
      align="end"
      className={cn(
        "animate-in slide-in-from-top-1  overflow-hidden rounded-md bg-white shadow-md md:w-32",
        className
      )}
      {...other}
    />
  );
});

DropdownMenu.Item = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...other }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center py-2 px-3 text-sm text-slate-500 outline-none focus:bg-slate-50 focus:text-black",
        className
      )}
      {...other}
    />
  );
});

DropdownMenu.Separator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(function DropdownMenuItem({ className, ...other }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-slate-200", className)}
      {...other}
    />
  );
});
