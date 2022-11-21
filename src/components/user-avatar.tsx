import type { User } from "@prisma/client";
import type { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...other }: UserAvatarProps) {
  return (
    <Avatar {...other}>
      <Avatar.Image
        alt="Picture"
        src={
          user.image ??
          "https://miro.medium.com/max/640/1*W35QUSvGpcLuxPo3SRTH4w.png"
        }
      />
      <Avatar.Fallback>
        <span className="sr-only">{user.name}</span>
        <Icons.User className="h-6 w-6" />
      </Avatar.Fallback>
    </Avatar>
  );
}
