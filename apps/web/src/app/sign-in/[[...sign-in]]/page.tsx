import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen pl-4 pt-4">
      <section className="flex h-full flex-col items-center justify-center rounded-tl-2xl border border-slate-300/50 bg-white p-4 shadow-inner">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              card: "shadow-none p-0 flex flex-col",
            },
          }}
        />
      </section>
    </div>
  );
}
