import { useEffect, useRef, useState } from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

interface useDebouncedFormOptions<T extends FieldValues> {
  form: UseFormReturn<T>;
  debounceDelay?: number;
  onValueChange: (values: Partial<T>) => void;
}

export function useDebouncedForm<T extends FieldValues>({
  form,
  onValueChange,
  debounceDelay = 250,
}: useDebouncedFormOptions<T>) {
  // Ref to store the timeout ID for cleanup
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Subscribe to form value changes
    const subscription = form.watch((values) => {
      // Clear any pending debounce timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new timeout to handle the debounced change
      debounceRef.current = setTimeout(async () => {
        // Validate all fields before proceeding
        const isValid = await form.trigger();

        // Only proceed if validation passes
        if (!isValid) return;

        // Invoke the change handler with current values
        onValueChange(values);
      }, debounceDelay);
    });

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      // Unsubscribe from form value changes
      subscription.unsubscribe();

      // Clear any pending timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    form, // React Hook Form instance
    debounceDelay, // Debounce timing
    onValueChange, // Change handler callback
  ]);
}

export function useDebounce<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
