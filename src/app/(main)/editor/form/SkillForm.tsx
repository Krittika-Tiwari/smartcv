import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useDebouncedEffect } from "@/hooks/useDebounce";
import { EditorFormProps } from "@/lib/type";
import { skillSchema, SkillType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

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

  const values = useWatch({ control: form.control });
  useDebouncedEffect(
    () => {
      const save = async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setResumeData({
            ...resumeData,
            skills:
              values.skills
                ?.filter((skill) => skill !== undefined)
                .map((skill) => skill.trim())
                .filter((skill) => skill !== "") || [],
          });
        }
      };
      save();
    },
    [values],
    1000,
  );

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="eg: HTML, CSS, JavaScript, ..."
                    {...field}
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      console.log(skills);
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Separate each skill with a comma.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
