import Link from "next/link";

import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen w-screen grid-cols-2 flex-col items-center justify-center">
      <Link
        href="/login"
        className="absolute top-8 right-8 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3  text-center text-sm font-medium text-slate-900 hover:border-slate-100 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700"
      >
        Login
      </Link>
      <div className="h-full bg-slate-100" />
      <div className="p-8">
        <div className="mx-auto flex max-w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-bold">Lag en konto</h1>
            <p className="text-sm text-slate-500">
              Skriv inn e-posten din under, og vi sender deg en magisk
              login-link.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-slate-500">
            Dersom du klikker deg videre, så aksepterer du våre{" "}
            <Link href="/terms" className="underline hover:text-brand">
              vilkår for bruk
            </Link>{" "}
            og når{" "}
            <Link href="/privacy" className="underline hover:text-brand">
              personvernerklæring
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
