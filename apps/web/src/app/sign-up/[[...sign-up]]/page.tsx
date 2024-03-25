import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Sign Up
      </h1>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </section>
  );
}
