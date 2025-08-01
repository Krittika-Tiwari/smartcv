import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function EmptyResume() {
  return (
    <div className="w-full lg:w-1/2 relative mx-auto ">
      <div className="relative w-full aspect-[3/4] rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
        <div className="absolute top-0 left-0 w-full h-[15%] bg-indigo-600">
          <div className="absolute top-6 left-8 w-[50%] h-[20%] bg-white/90 rounded-sm" />
          <div className="absolute bottom-0 left-8 w-[30%] h-[20%] bg-white/80 rounded-t-lg" />
        </div>

        <div className="absolute top-[40%] text-black right-8 flex flex-wrap gap-2 w-[80%]">
          <div className="absolute top-[52%] w-full text-center px-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              No Resume Found
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Start creating your first resume with AI assistance.
            </p>
            <Button
              asChild
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 text-sm font-medium rounded-md shadow-sm transition"
            >
              <Link href="/editor" className="flex items-center gap-2">
                <PlusSquare className="size-5" />
                New Resume
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-[70%] left-8 w-[35%] h-[4%]  rounded-md" />
        <div className="absolute top-[76%] left-8 w-[80%] h-[3%]  rounded-md" />
        <div className="absolute top-[80%] left-8 w-[75%] h-[3%]  rounded-md" />
        <div className="absolute top-[84%] left-8 w-[70%] h-[3%]  rounded-md" />
        <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-[10px] text-indigo-700">
          AI Optimized
        </div>
      </div>

      <div className="absolute -bottom-12 -left-8 w-[40%] aspect-[3/4] rounded-xl bg-white border border-gray-200 shadow-md overflow-hidden rotate-[-8deg] z-10 transition-all duration-300 hover:rotate-[-4deg]">
        <div className="w-full h-[10%] bg-pink-600">
          <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-white/80 rounded-sm" />
        </div>
        <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1"></div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-pink-50 border border-pink-200 text-[8px] text-pink-700">
          Tailored
        </div>
      </div>

      <div className="absolute -top-10 -right-6 w-[40%] aspect-[3/4] rounded-xl bg-white border border-gray-200 shadow-md overflow-hidden rotate-[8deg] z-10 transition-all duration-300 hover:rotate-[4deg]">
        <div className="w-full h-[10%] bg-teal-600">
          <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-white/80 rounded-sm" />
        </div>
        <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1"></div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-[8px] text-teal-700">
          Technical
        </div>
      </div>
    </div>
  );
}
