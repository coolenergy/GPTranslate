import { useState, useEffect } from "react";

export function useDebounce(input: string, time: number) {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, time);
    if (timer) return () => clearTimeout(timer);
  }, [input, time]);

  return debouncedValue;
}
