import { STRING_CONSTANTS } from "@/constants/stringConstants";
import { Icons } from "./icons";

export function DashboardBranding() {
  return (
    <header className="flex items-center space-x-2 px-3">
      <Icons.Logo />
      <span className="font-bold">{STRING_CONSTANTS.TITLE}</span>
    </header>
  );
}
