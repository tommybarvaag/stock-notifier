"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Notification, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { infer as zInfer } from "zod";

import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import toast from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { notificationSchema } from "@/lib/validations/notification";

interface UserNotificationFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id">;
  notification?: Pick<Notification, "id" | "sku" | "url">;
}

type FormData = zInfer<typeof notificationSchema>;

export function UserNotificationForm({
  user,
  notification,
  className,
  ...other
}: UserNotificationFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      id: notification?.id ?? undefined,
      sku: notification?.sku ?? "",
      url: notification?.url ?? "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/notification/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: data.id,
        sku: data.sku,
        url: data.url,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong",
        message:
          "We have no clue what happened, but it's not your fault. Please try again later.",
        type: "error",
      });
    }

    toast({
      title: "Hurray!",
      message:
        "We have tracked your stock notification and we'll let you know when the product is in store! 🎉",
      type: "success",
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      <Card>
        <Card.Header>
          <Card.Title>Notification</Card.Title>
          <Card.Description>
            Only power is supported at the moment. We need to store URL and SKU.
            SKU should pre parsed directly from the URL in the future.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="mb-5 hidden items-center gap-5">
            <label className="text-sm" htmlFor="name">
              ID
            </label>
            <input
              id="id"
              className="my-0 mb-2 block h-9 rounded-md border border-slate-300 py-2 px-3 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 lg:w-[350px]"
              size={32}
              placeholder="Product ID"
              hidden
              {...register("id")}
            />
            {errors?.id && (
              <p className="px-1 text-xs text-red-600">{errors.id.message}</p>
            )}
          </div>
          <div className="mb-5 flex items-center gap-5">
            <label className="text-sm" htmlFor="name">
              Sku
            </label>
            <input
              id="sku"
              className="my-0 mb-2 block h-9 rounded-md border border-slate-300 py-2 px-3 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 lg:w-[350px]"
              size={32}
              placeholder="Product ID"
              {...register("sku")}
            />
            {errors?.sku && (
              <p className="px-1 text-xs text-red-600">{errors.sku.message}</p>
            )}
          </div>
          <div className="mb-5 flex items-center gap-5">
            <label className="text-sm" htmlFor="name">
              URL
            </label>
            <input
              id="name"
              className="my-0 mb-2 block h-9 rounded-md border border-slate-300 py-2 px-3 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 lg:w-[350px]"
              size={32}
              placeholder="URL"
              {...register("url")}
            />
            {errors?.url && (
              <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
            )}
          </div>
        </Card.Content>
        <Card.Footer className="flex gap-3">
          <button
            type="submit"
            className={cn(
              "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2  font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              {
                "cursor-not-allowed opacity-60": isSaving,
              },
              className
            )}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Update</span>
          </button>
          <button
            type="button"
            className={cn(
              "relative inline-flex h-9 items-center rounded-md border border-transparent bg-red-600 px-4 py-2  font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              {
                "cursor-not-allowed opacity-60": isSaving,
              },
              className
            )}
            disabled={isSaving}
            onClick={() => {
              toast({
                message: "Not implemented yet",
                type: "error",
              });
            }}
          >
            {isSaving && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Delete</span>
          </button>
        </Card.Footer>
      </Card>
    </form>
  );
}
