import { liveQuery } from "dexie";
import { useEffect, useState } from "react";

export function useDexieLive<T>(
  queryFn: () => Promise<T>,
  initial: T,
  deps: any[] = []
) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const sub = liveQuery(queryFn).subscribe({
      next: setValue,
      error: console.error,
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return value;
}
