import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { LayoutTemplateIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import images from assets
import MinimalImg from "@/assets/minimal.png";
import ModernImg from "@/assets/modern.png";
import ClassicImg from "@/assets/classic.png";

interface TemplatePickerPopoverProps {
  selectedTemplateId: string | undefined;
  onSelect: (id: string) => void;
}

export default function TemplatePickerPopover({
  selectedTemplateId,
  onSelect,
}: TemplatePickerPopoverProps) {
  const [open, setOpen] = useState(false);

  const templates = [
    { id: "minimal", name: "Minimal", image: MinimalImg },
    { id: "modern", name: "Modern", image: ModernImg },
    { id: "classic", name: "Classic", image: ClassicImg },
    { id: "creative", name: "Creative", image: MinimalImg },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <LayoutTemplateIcon className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-56 sm:w-72 md:w-80 max-h-80 p-2 overflow-y-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              className={cn(
                "border rounded-lg p-2 flex flex-col items-center text-xs transition-colors",
                selectedTemplateId === template.id
                  ? "border-primary bg-muted"
                  : "border-muted hover:bg-accent",
              )}
              onClick={() => {
                onSelect(template.id);
                setOpen(false);
              }}
            >
              <Image
                src={template.image}
                alt={template.name}
                className="rounded object-cover w-20 sm:w-24 md:w-full h-auto"
              />
              <span className="mt-2 text-sm sm:text-base">{template.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
