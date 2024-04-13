"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import {
  AppIcon,
  Button,
  ButtonSize,
  ButtonTheme,
  FloatingInput,
  PinInput,
  PinNode,
  ThemeToggle,
} from "@repo/ui/components";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useInterval from "~/hooks/useInterval";
import { HomeIcon } from "lucide-react";

interface NewAccount {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface NewAccountFormProps {
  errors: Partial<NewAccount>;
  isLoading: boolean;
  value: NewAccount;
  onChange: (val: NewAccount) => void | Promise<void>;
  onSubmit: (val: NewAccount) => void | Promise<void>;
}

function NewAccountForm({
  errors,
  isLoading,
  value,
  onChange,
  onSubmit,
}: NewAccountFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="flex w-full flex-col gap-4 pt-4" onSubmit={handleSubmit}>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput.Fieldset>
          <FloatingInput.Input
            id="first-name"
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            required
            errorMessage={errors.firstName}
            value={value.firstName}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
          />
          <FloatingInput.Label htmlFor="first-name">
            First Name
          </FloatingInput.Label>
        </FloatingInput.Fieldset>

        <FloatingInput.Fieldset>
          <FloatingInput.Input
            id="last-name"
            type="text"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            required
            errorMessage={errors.lastName}
            value={value.lastName}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          />
          <FloatingInput.Label htmlFor="last-name">
            Last Name
          </FloatingInput.Label>
        </FloatingInput.Fieldset>
      </div>

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
        <span>Send Verification Email</span>
      </Button>

      <p>
        Already have an account?&nbsp;
        <Link
          href="/sign-in"
          className="rounded-sm text-zinc-600 underline focus:outline-none focus:ring focus:ring-zinc-600/50 dark:text-white"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

interface VerificationCode {
  code: string;
}

interface EmailVerificationFormProps {
  errors: Partial<VerificationCode>;
  isLoading: boolean;
  value: VerificationCode;
  onBack: () => void;
  onChange: (val: VerificationCode) => void | Promise<void>;
  onResendRequest: () => void;
  onSubmit: (val: VerificationCode) => void | Promise<void>;
}

function EmailVerificationForm({
  errors,
  isLoading,
  value,
  onBack,
  onChange,
  onSubmit,
}: EmailVerificationFormProps) {
  const handleBackClick = () => {
    onBack();
    onChange({ code: "" });
  };

  const [timer, setTimer] = useState(60);
  const interval = useInterval(
    () => {
      if (timer > 0) setTimer(timer - 1);
    },
    timer > 0 ? 1000 : null,
  );

  useEffect(() => {
    return () => {
      if (interval.current !== null) window.clearInterval(interval.current);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="flex w-full flex-col gap-4 pt-4" onSubmit={handleSubmit}>
      <PinInput
        name="email-verification-code"
        autoComplete="one-time-code"
        required
        errorMessage={errors.code}
        value={value.code}
        onChange={(code) => onChange({ code: code as string })}
      >
        <div className="w-100 flex">
          <PinNode className=" rounded-l" />
          <PinNode className="" />
          <PinNode className="" />
          <PinNode className="" />
          <PinNode className="" />
          <PinNode className=" rounded-r" />
        </div>
      </PinInput>

      <Button
        type="button"
        theme={ButtonTheme.Ghost}
        className="mx-auto text-sm"
        onClick={handleBackClick}
      >
        Didn't receive a code? {timer ? `(${timer}s)` : "Resend now."}
      </Button>

      <Button
        disabled={value.code.length !== 6}
        type="submit"
        loading={isLoading}
        className="w-full justify-center"
      >
        Continue
      </Button>

      <Button
        type="button"
        theme={ButtonTheme.Ghost}
        className="mx-auto"
        onClick={handleBackClick}
      >
        Back
      </Button>
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

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = React.useState<NewAccount>({
    emailAddress: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = React.useState({
    code: "",
  });

  const [newAccountFormErrors, setNewAccountFormErrors] = React.useState<
    Partial<NewAccount>
  >({});
  const [verificationFormErrors, setVerificationFormErrors] = React.useState<
    Partial<VerificationCode>
  >({});

  const [isLoadingApple, setIsLoadingApple] = React.useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(false);
  const [isLoadingVerification, setIsLoadingVerification] =
    React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const router = useRouter();

  const handleSignInWithApple = async () => {
    setIsLoadingApple(true);
    if (isLoaded && signUp) {
      await signUp.authenticateWithRedirect({
        redirectUrl: "/sso",
        redirectUrlComplete: "/",
        strategy: "oauth_apple",
      });
    }
    setIsLoadingApple(false);
  };

  //
  const handleVerificationRequest = async (formVal: NewAccount) => {
    try {
      if (!signUp) return;

      setIsLoadingEmail(true);

      await signUp.create(form);

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: any) {
      if (err.clerkError) {
        setNewAccountFormErrors(
          err.errors.reduce(
            (prev: typeof newAccountFormErrors, curr: ClerkError) => {
              if (curr.meta.paramName === "first_name")
                prev.firstName = curr.message;
              if (curr.meta.paramName === "last_name")
                prev.lastName = curr.message;
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
    setIsLoadingEmail(false);
  };

  const handleCodeVerification = async (code: VerificationCode) => {
    if (!isLoaded) {
      return;
    }

    setIsLoadingVerification(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification(code);
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(
          "signup not completed",
          JSON.stringify(completeSignUp, null, 2),
        );
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      if (err.clerkError) {
        setVerificationFormErrors(
          err.errors.reduce(
            (prev: typeof verificationFormErrors, curr: ClerkError) => {
              if (curr.meta.paramName === "code") prev.code = curr.longMessage;
              return prev;
            },
            {},
          ),
        );
      } else console.error(JSON.stringify(err, null, 2));
    }
    setIsLoadingVerification(false);
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col pl-4" style={{ height: "100dvh" }}>
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
        <div className="flex w-full max-w-96 flex-col">
          <div className="flex w-full flex-col justify-center">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex h-10   w-10 items-center justify-center rounded  text-zinc-600 hover:bg-zinc-100 focus:text-zinc-800 focus:outline-none focus:ring focus:ring-zinc-800/25 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:text-zinc-50 dark:focus:ring-white/50"
              >
                <AppIcon className="duration-500" />
              </Link>
              <h1 className="text-2xl font-semibold md:text-4xl">Sign Up</h1>
            </div>
            <h2 className="text-lg text-zinc-600 dark:text-zinc-300">
              Live life a little differently
            </h2>
          </div>

          {pendingVerification ? (
            <>
              <hr className="mt-4" />
              <div className="py-4">
                <h3 className="text-xl font-bold tracking-wide text-zinc-600 md:text-2xl dark:text-zinc-300">
                  Verify your email
                </h3>
                <p className="mt-2">
                  Enter the verification code sent to&nbsp;
                  <span className="underline">{form.emailAddress}</span>
                </p>
              </div>
            </>
          ) : (
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
          )}

          {pendingVerification ? (
            <EmailVerificationForm
              errors={verificationFormErrors}
              isLoading={isLoadingVerification}
              onBack={() => setPendingVerification(false)}
              onChange={setVerificationCode}
              onResendRequest={() => handleVerificationRequest(form)}
              onSubmit={handleCodeVerification}
              value={verificationCode}
            />
          ) : (
            <NewAccountForm
              errors={newAccountFormErrors}
              isLoading={isLoadingEmail}
              onChange={setForm}
              onSubmit={handleVerificationRequest}
              value={form}
            />
          )}
        </div>
      </section>
    </div>
  );
}
