import { useEffect, useState } from "react";
import {
  DEMO_STATE_EVENT,
  DemoState,
  DemoTransaction,
  getState,
  listTransactions,
} from "@/lib/demoDb";

export function useDemoState() {
  const [state, setState] = useState<DemoState>(getState);
  const [transactions, setTransactions] = useState<DemoTransaction[]>(() =>
    listTransactions()
  );

  useEffect(() => {
    const handler = () => {
      setState(getState());
      setTransactions(listTransactions());
    };
    window.addEventListener(DEMO_STATE_EVENT, handler);
    return () => window.removeEventListener(DEMO_STATE_EVENT, handler);
  }, []);

  return { state, transactions };
}
