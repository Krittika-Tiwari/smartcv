import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebouncedEffect } from "@/hooks/useDebounce";
import { EditorFormProps } from "@/lib/type";
import { EducationType, eductionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
export default function EductionForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationType>({
    resolver: zodResolver(eductionSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  const values = form.watch();

  useDebouncedEffect(
    () => {
      const save = async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setResumeData({
            ...resumeData,
            educations:
              values.educations?.filter((exp) => exp !== undefined) || [],
          });
        }
      };
      save();
    },
    [values, resumeData, setResumeData],
    100,
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add as many educations as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EductionItems
              key={field.id}
              form={form}
              remove={remove}
              index={index}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  school: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EductionItemsProps {
  form: UseFormReturn<EducationType>;
  index: number;
  remove: (index: number) => void;
}
function EductionItems({ form, index, remove }: EductionItemsProps) {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3 ">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Eduction {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input autoFocus {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button variant={"destructive"} onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
