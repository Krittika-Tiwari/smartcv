import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useDebouncedForm } from "@/hooks/useDebounce";
import { EditorFormProps } from "@/lib/type";
import { skillSchema, SkillType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function SkillForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillType>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useDebouncedForm({
    form,
    onValueChange(values) {
      console.log(values, "values");
      setResumeData({
        ...resumeData,
        skills: values.skills?.filter((pro) => pro !== undefined) || [],
      });
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Group and reorder your skills
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <SkillItem
                  key={field.id}
                  id={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => append({ category: "", values: [] })}
            >
              + Add Skill
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface SkillItemsProps {
  form: UseFormReturn<SkillType>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

function SkillItem({ id, form, index, remove }: SkillItemsProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className={cn(
        "space-y-3 border rounded-md bg-background p-3",
        isDragging && "shadow-xl z-50 cursor-grab relative",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-end gap-2">
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
        <Button
          className="size-5"
          variant="destructive"
          onClick={() => remove(index)}
        >
          <Trash2 className="size-3" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`skills.${index}.category`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Frontend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`skills.${index}.values`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Next.js, React, Tailwind ..."
                  value={field.value.join(",")}
                  onChange={(e) => {
                    const skills = e.target.value.split(",");
                    const trimmedSkills = skills.map((skill) => skill.trim());

                    field.onChange(trimmedSkills);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription> Separate each skill with a comma.</FormDescription>
      </div>
    </div>
  );
}
