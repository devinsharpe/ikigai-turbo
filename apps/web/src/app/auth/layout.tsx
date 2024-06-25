import {
  Button,
  ButtonSize,
  ButtonTheme,
  ThemeToggle,
} from "@repo/ui/components";
import { twMerge } from "@repo/ui/lib";
import { HomeIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  console.log(cookieStore);

  return (
    <div className={twMerge("flex flex-col pl-4")} style={{ height: "100dvh" }}>
      <div className="flex w-full items-stretch justify-between gap-4 p-4">
        <ThemeToggle />
        <div className="flex items-stretch justify-end gap-4">
          <Button
            size={ButtonSize.Sm}
            theme={ButtonTheme.Ghost}
            className="items-center"
            asChild
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size={ButtonSize.Icon} theme={ButtonTheme.Ghost} asChild>
            <Link href="/">
              <HomeIcon />
            </Link>
          </Button>
        </div>
      </div>
      <section className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-tl-xl border-l border-t border-zinc-300 bg-white p-4 shadow-inner dark:border-zinc-700 dark:bg-zinc-800">
        {children}
      </section>
    </div>
  );
}
