import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { LayoutTemplateIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    { id: "minimal", name: "Minimal" },
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <LayoutTemplateIcon className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-64 p-2 space-y-2">
        {templates.map((template) => (
          <Button
            key={template.id}
            variant={selectedTemplateId === template.id ? "default" : "ghost"}
            className={cn("w-full justify-start text-left", {
              "ring-2 ring-blue-500": selectedTemplateId === template.id,
            })}
            onClick={() => {
              onSelect(template.id);
              setOpen(false);
            }}
          >
            {template.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
