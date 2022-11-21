import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

type AvatarProps = AvatarPrimitive.AvatarProps;

export function Avatar({ className, ...other }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full bg-slate-100",
        className
      )}
      {...other}
    />
  );
}

type AvatarImageProps = AvatarPrimitive.AvatarImageProps;

Avatar.Image = function AvatarImage({ className, ...other }: AvatarImageProps) {
  return <AvatarPrimitive.Image className={cn("", className)} {...other} />;
};

Avatar.Fallback = function AvatarFallback({
  className,
  children,
  ...other
}: AvatarPrimitive.AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      delayMs={500}
      className={cn("", className)}
      {...other}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
};
