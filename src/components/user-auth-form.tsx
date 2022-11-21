"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { infer as zInfer } from "zod";

import { Icons } from "@/components/icons";
import toast from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";

type FormData = zInfer<typeof userAuthSchema>;

export function UserAuthForm({
  className,
  ...other
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: `${window.location.origin}/dashboard`,
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Noe gikk galt.",
        message: "Vi kunne ikke logge deg inn akkurat nå. Prøv igjen senere",
        type: "error",
      });
    }

    return toast({
      title: "Sjekk e-posten din",
      message:
        "Vi sendte deg en login-link. Sørg for å sjekk søppekposten også.",
      type: "success",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...other}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="ola.normann@mail.com"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Logg inn med e-post
          </button>
        </div>
      </form>
    </div>
  );
}
