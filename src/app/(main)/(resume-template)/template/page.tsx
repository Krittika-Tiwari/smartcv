"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ClassicImg from "@/assets/classic.png";
import CreativeImg from "@/assets/creative.png";
import ModernImg from "@/assets/modern.png";
import MinimalImg from "@/assets/minimal.png";

const templates = [
  {
    id: "classic",
    name: "Classic",
    image: ClassicImg,
    description: "Simple and timeless layout.",
  },
  {
    id: "creative",
    name: "Creative",
    image: CreativeImg,
    description: "Unique layout with color.",
  },
  {
    id: "modern",
    name: "Modern",
    image: ModernImg,
    description: "Clean and modern design.",
  },
  {
    id: "minimal",
    name: "Minimal",
    image: MinimalImg,
    description: "Focused and minimal style.",
  },
];

export default function TemplatePage() {
  const router = useRouter();

  return (
    <main className="w-full p-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-10">
        Templates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => router.push(`/editor?template=${template.id}`)}
            className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3 cursor-pointer"
          >
            <div className="space-y-3">
              {/* Title + description */}
              <div className="inline-block w-full text-center">
                <p className="font-semibold line-clamp-1">{template.name}</p>
                {template.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {template.description}
                  </p>
                )}
              </div>

              {/* Preview image */}
              <div className="relative inline-block w-full">
                <div className="overflow-hidden rounded-md shadow-sm transition-shadow group-hover:shadow-lg aspect-[3/4] relative w-full">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className=""
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-background to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
