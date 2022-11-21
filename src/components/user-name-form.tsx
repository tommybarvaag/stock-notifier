"use client";

import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import toast from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { userNameSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { infer as zInfer } from "zod";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

type FormData = zInfer<typeof userNameSchema>;

export function UserNameForm({ user, className, ...other }: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
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
      message: "Name updated! 🎉",
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
          <Card.Title>Your name</Card.Title>
          <Card.Description>Please update your name</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="my-0 mb-2 block h-9 rounded-md border border-slate-300 py-2 px-3 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 lg:w-[350px]"
              size={32}
              placeholder="Navn"
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </Card.Content>
        <Card.Footer>
          <button
            type="submit"
            className={cn(
              "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
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
            <span>Lagre</span>
          </button>
        </Card.Footer>
      </Card>
    </form>
  );
}
