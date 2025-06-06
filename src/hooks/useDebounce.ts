import { useEffect, useState } from "react";

export function useDebouncedEffect(
  effect: () => void,
  deps: React.DependencyList,
  delay: number,
) {
  useEffect(() => {
    console.log("useDebouncedEffect", deps);
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);
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
