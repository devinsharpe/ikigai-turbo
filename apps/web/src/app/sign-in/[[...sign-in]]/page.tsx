"use client";

import React, { FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";
import AuthHeader from "~/components/AuthHeader";
import AuthLayout from "~/layouts/Auth";
import {
  Button,
  ButtonSize,
  ButtonTheme,
  FloatingInput,
} from "@repo/ui/components";
import useAuthGuard from "~/hooks/useAuthGuard";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AccountCredentials {
  emailAddress: string;
  password: string;
}

interface AccountFormProps {
  errors: Partial<AccountCredentials>;
  isLoading: boolean;
  value: AccountCredentials;
  onChange: (val: AccountCredentials) => void | Promise<void>;
  onSubmit: (val: AccountCredentials) => void | Promise<void>;
}

function AccountForm({
  errors,
  isLoading,
  value,
  onChange,
  onSubmit,
}: AccountFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="flex w-full flex-col gap-4 pt-4" onSubmit={handleSubmit}>
      <FloatingInput.Fieldset>
        <FloatingInput.Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="jane.doe@email.com"
          required
          errorMessage={errors.emailAddress}
          value={value.emailAddress}
          onChange={(e) => onChange({ ...value, emailAddress: e.target.value })}
        />
        <FloatingInput.Label htmlFor="email">Email Address</FloatingInput.Label>
      </FloatingInput.Fieldset>

      <FloatingInput.Fieldset>
        <FloatingInput.Input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="password"
          required
          errorMessage={errors.password}
          value={value.password}
          onChange={(e) => onChange({ ...value, password: e.target.value })}
        />
        <FloatingInput.Label htmlFor="password">Password</FloatingInput.Label>
      </FloatingInput.Fieldset>

      <Button
        className="justify-center"
        disabled={isLoading}
        loading={isLoading}
        size={ButtonSize.Lg}
        theme={ButtonTheme.Primary}
        type="submit"
      >
        <span>Continue to App</span>
      </Button>

      <p>
        Need to create an account?&nbsp;
        <Link
          href="/sign-up"
          className="rounded-sm text-zinc-600 underline focus:outline-none focus:ring focus:ring-zinc-600/50 dark:text-white"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

interface ClerkError {
  code: string;
  message: string;
  longMessage: string;
  meta: {
    paramName?: string;
  };
}

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [form, setForm] = React.useState<AccountCredentials>({
    emailAddress: "",
    password: "",
  });

  const [accountFormErrors, setAccountFormErrors] = React.useState<
    Partial<AccountCredentials>
  >({});

  const [isLoadingApple, setIsLoadingApple] = React.useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(false);

  const router = useRouter();

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

  const handleEmailRequest = async (formVal: AccountCredentials) => {
    try {
      if (!signIn) return;

      setIsLoadingEmail(true);

      const result = await signIn.create({
        identifier: formVal.emailAddress,
        password: formVal.password,
      });

      console.log(result);

      // TODO: handle other statuses
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/app");
      } else console.log(result.status, result);
    } catch (err: any) {
      if (err.ClerkError) {
        setAccountFormErrors(
          err.errors.reduce(
            (prev: typeof accountFormErrors, curr: ClerkError) => {
              if (curr.meta.paramName === "email_address")
                prev.emailAddress = curr.message;
              if (curr.meta.paramName === "password")
                prev.password = curr.message;
              return prev;
            },
            {},
          ),
        );
      } else console.log(JSON.stringify(err, null, 2));
    }
    setIsLoadingEmail;
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

          <AccountForm
            errors={accountFormErrors}
            isLoading={isLoadingEmail}
            onChange={setForm}
            onSubmit={handleEmailRequest}
            value={form}
          />
        </>
      </div>
    </AuthLayout>
  );
}
