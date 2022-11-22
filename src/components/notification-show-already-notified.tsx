"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Switch from "./ui/swtich";

export default function NotificationShowAlreadyNotified() {
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(
    searchParams.get("showAlreadyNotified") === "true"
  );
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="show-already-notified" className="text-sm">
        Show already notified
      </label>
      <Switch
        id="show-already-notified"
        checked={checked}
        onCheckedChange={(checked) => {
          setChecked(checked);

          if (checked) {
            router.push(`${pathname}?showAlreadyNotified=true`);
            router.refresh();
          } else {
            router.push(pathname ?? "/dashboard");
            router.refresh();
          }
        }}
      />
    </div>
  );
}
