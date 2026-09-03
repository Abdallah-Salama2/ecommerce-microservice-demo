import { useState, useEffect } from "react";

/**
 * Delays updating the returned value until `delay` ms have passed
 * since the last change to `value`. Use this to avoid firing API
 * calls / URL navigations on every keystroke in a search/filter input.
 *
 * @param value  The rapidly-changing input value
 * @param delay  Milliseconds to wait after last change (default 350ms)
 */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
