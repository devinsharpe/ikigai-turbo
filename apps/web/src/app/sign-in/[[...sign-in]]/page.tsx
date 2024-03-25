import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Sign In
      </h1>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </section>
  );
}
