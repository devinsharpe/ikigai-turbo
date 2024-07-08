"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Button, ButtonTheme, Spinner } from "@ikigai/ui/components";
import { BuildingIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthGuard from "~/hooks/useAuthGuard";
import AuthLayout from "~/layouts/Auth";

export default function LogOutPage() {
  const { user } = useAuthGuard(false, "/");
  const { signOut } = useClerk();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    router.push("/");
  };

  return (
    <AuthLayout homeHref="/app">
      <div className="flex w-full max-w-96 flex-col">
        <h1 className="text-2xl font-semibold md:text-4xl">
          Ready to log out?
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <Button
            theme={ButtonTheme.Secondary}
            className="w-full justify-center"
            asChild
          >
            <Link href="/app">No</Link>
          </Button>
          <Button
            loading={isLoading}
            theme={ButtonTheme.Primary}
            className="w-full justify-center"
            onClick={handleSignOut}
          >
            Yes
          </Button>
        </div>

        {user ? (
          <div className="dark:bg-zinc-800dark:hover:bg-zinc-700 mt-4 flex cursor-pointer gap-4 rounded border border-zinc-300 bg-white p-2 hover:border-zinc-500 hover:bg-zinc-50 dark:border-zinc-400 dark:hover:bg-zinc-700">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img src={user.imageUrl} alt={`${user.fullName} profile image`} />
            </div>
            <div className="mr-auto">
              <h4 className="text-lg leading-tight md:text-xl">
                {user.fullName}
              </h4>
              <p className="leading-none text-zinc-600 dark:text-zinc-200">
                {user.primaryEmailAddress
                  ? user.primaryEmailAddress.emailAddress
                  : ""}
              </p>
            </div>
            <Button theme={ButtonTheme.Ghost} className="flex items-center ">
              <ChevronRightIcon />
            </Button>
          </div>
        ) : (
          <div className="mt-4 rounded border border-zinc-300 bg-white p-2 hover:border-zinc-500 hover:bg-zinc-50 dark:border-zinc-400  dark:bg-zinc-800 dark:hover:bg-zinc-700">
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              <Spinner />
            </div>
          </div>
        )}
        <Button
          className="mt-2 w-full justify-center"
          theme={ButtonTheme.Outline}
        >
          <BuildingIcon />
          <span>View Organizations</span>
        </Button>
      </div>
    </AuthLayout>
  );
}
