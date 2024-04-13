"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import AuthHeader from "~/components/AuthHeader";
import AuthLayout from "~/layouts/Auth";
import { Button, ButtonTheme } from "@repo/ui/components";
import useAuthGuard from "~/hooks/useAuthGuard";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [isLoadingApple, setIsLoadingApple] = React.useState(false);

  useAuthGuard(true, "/");

  const handleSignInWithApple = async () => {
    setIsLoadingApple(true);
    if (isLoaded && signIn) {
      await signIn.authenticateWithRedirect({
        redirectUrl: "/sso",
        redirectUrlComplete: "/",
        strategy: "oauth_apple",
      });
    }
    setIsLoadingApple(false);
  };

  return (
    <AuthLayout linkHref="sign-up">
      <div className="flex w-full max-w-96 flex-col">
        <AuthHeader title="Sign In" />

        <>
          <div className="pb-2 pt-4">
            <Button
              className="w-full justify-center"
              disabled={isLoadingApple}
              loading={isLoadingApple}
              theme={ButtonTheme.Outline}
              onClick={handleSignInWithApple}
            >
              <span>Continue with Apple</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <hr className="w-full" />
            <span className="text-zinc-600 dark:text-zinc-200">or</span>
            <hr className="w-full" />
          </div>
        </>

        {/* <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              card: "shadow-none p-0 flex flex-col",
            },
          }}
        /> */}
      </div>
    </AuthLayout>
  );
}
