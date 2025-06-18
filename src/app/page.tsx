import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="h-full w-full bg-[radial-gradient(125%_125%_at_50%_10%,#f0f0ff_40%,#b5b5f5_100%)] dark:bg-none" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(125%_125%_at_50%_10%,#0f0f1f_40%,#5b5bd6_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,_#eaeaff,_transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_200px,_#2e2e4d,_transparent)]" />
      </div>
      <header className="fixed top-0 left-0 w-full z-20 shadow-sm bg-transparent backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="SmartCv Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">SmartCv</span>
          </Link>

          <div className="flex items-center gap-3">
            <ModeToggle />

            <SignedOut>
              <SignInButton>
                <Button
                  variant="secondary"
                  className="border-slate-600 transition-colors"
                >
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="font-semibold px-4 py-2 rounded-md shadow-md shadow-black transition-colors">
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 animate-fade-in">
        <div className="text-center lg:text-left lg:max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight  mb-6">
            Build a{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Job-Winning Resume
            </span>{" "}
            in Minutes
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            SmartCv uses AI to help you craft a professional, personalized
            resume—fast, effective, and effortless.
          </p>

          <Link href="/resumes">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 relative mx-auto mt-20">
          <div className="relative w-full aspect-[3/4] rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-[15%] bg-indigo-600">
              <div className="absolute top-6 left-8 w-[50%] h-[20%] bg-white/90 rounded-sm" />
              <div className="absolute bottom-0 left-8 w-[30%] h-[20%] bg-white/80 rounded-t-lg" />
            </div>

            <div className="absolute top-[20%] left-8 w-[80%] h-[4%] bg-slate-200 rounded-md" />
            <div className="absolute top-[26%] left-8 w-[60%] h-[3%] bg-slate-200 rounded-md" />
            <div className="absolute top-[30%] left-8 w-[70%] h-[3%] bg-slate-200 rounded-md" />

            <div className="absolute top-[36%] left-8 w-[35%] h-[4%] bg-indigo-100 rounded-md" />
            <div className="absolute top-[42%] left-8 w-[80%] h-[3%] bg-slate-200 rounded-md" />
            <div className="absolute top-[46%] left-8 w-[75%] h-[3%] bg-slate-200 rounded-md" />
            <div className="absolute top-[50%] left-8 w-[70%] h-[3%] bg-slate-200 rounded-md" />

            <div className="absolute top-[56%] left-8 w-[35%] h-[4%] bg-indigo-100 rounded-md" />
            <div className="absolute top-[62%] right-8 flex flex-wrap gap-2 w-[80%]">
              <div className="h-[12px] w-[60px] bg-indigo-100 rounded-full" />
              <div className="h-[12px] w-[70px] bg-indigo-100 rounded-full" />
              <div className="h-[12px] w-[50px] bg-blue-100 rounded-full" />
              <div className="h-[12px] w-[80px] bg-teal-100 rounded-full" />
              <div className="h-[12px] w-[65px] bg-cyan-100 rounded-full" />
            </div>

            <div className="absolute top-[70%] left-8 w-[35%] h-[4%] bg-indigo-100 rounded-md" />
            <div className="absolute top-[76%] left-8 w-[80%] h-[3%] bg-slate-200 rounded-md" />
            <div className="absolute top-[80%] left-8 w-[75%] h-[3%] bg-slate-200 rounded-md" />
            <div className="absolute top-[84%] left-8 w-[70%] h-[3%] bg-slate-200 rounded-md" />

            <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-[10px] text-indigo-700">
              AI Optimized
            </div>
          </div>

          <div className="absolute -bottom-12 -left-8 w-[40%] aspect-[3/4] rounded-xl bg-white border border-gray-200 shadow-md overflow-hidden rotate-[-8deg] z-10 transition-all duration-300 hover:rotate-[-4deg]">
            <div className="w-full h-[10%] bg-pink-600">
              <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-white/80 rounded-sm" />
            </div>
            <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1">
              <div className="h-[8px] w-[80%] bg-slate-200 rounded-sm" />
              <div className="h-[8px] w-[70%] bg-slate-200 rounded-sm" />
              <div className="mt-2 h-[8px] w-[50%] bg-pink-100 rounded-sm" />
              <div className="h-[8px] w-[80%] bg-slate-200 rounded-sm" />
              <div className="h-[8px] w-[75%] bg-slate-200 rounded-sm" />
            </div>
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-pink-50 border border-pink-200 text-[8px] text-pink-700">
              Tailored
            </div>
          </div>

          <div className="absolute -top-10 -right-6 w-[40%] aspect-[3/4] rounded-xl bg-white border border-gray-200 shadow-md overflow-hidden rotate-[8deg] z-10 transition-all duration-300 hover:rotate-[4deg]">
            <div className="w-full h-[10%] bg-teal-600">
              <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-white/80 rounded-sm" />
            </div>
            <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1">
              <div className="h-[8px] w-[80%] bg-slate-200 rounded-sm" />
              <div className="h-[8px] w-[70%] bg-slate-200 rounded-sm" />
              <div className="mt-2 h-[8px] w-[50%] bg-teal-100 rounded-sm" />
              <div className="h-[8px] w-[80%] bg-slate-200 rounded-sm" />
              <div className="h-[8px] w-[75%] bg-slate-200 rounded-sm" />
            </div>
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-[8px] text-teal-700">
              Technical
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
