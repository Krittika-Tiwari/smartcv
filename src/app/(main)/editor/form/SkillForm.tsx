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
import { useDebouncedForm } from "@/hooks/useDebounce";
import { EditorFormProps } from "@/lib/type";
import { skillSchema, SkillType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
      setResumeData({
        ...resumeData,
        skills: values.skills
          ?.map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      });
    },
  });

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
