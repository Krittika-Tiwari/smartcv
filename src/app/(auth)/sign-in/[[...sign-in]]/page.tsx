import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn
        forceRedirectUrl="/resumes"
        fallbackRedirectUrl="/resumes"
        signUpFallbackRedirectUrl="/sign-up"
      />
    </main>
  );
}
