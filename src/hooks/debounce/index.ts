import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 300
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const timer = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const call = useCallback(
    (...args: Parameters<T>) => {
      cancel();
      timer.current = window.setTimeout(() => {
        fnRef.current(...args);
        timer.current = null;
      }, delay) as unknown as number;
    },
    [cancel, delay]
  );

  useEffect(() => cancel, [cancel]);

  return { call, cancel } as const;
}
