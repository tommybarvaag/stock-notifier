import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
    className?: string;
  }
>(function Switch({ className, ...other }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-5 w-10 rounded-full border-black bg-black shadow",
        className
      )}
      {...other}
    >
      <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full border-white bg-white shadow-sm transition-all ease-in will-change-transform data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
});

export default Switch;
