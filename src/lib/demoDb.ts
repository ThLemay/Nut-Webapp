export type ActionType = "lend" | "collect";

export type DemoState = {
  companyStock: number;
  nutCoins: number;
};

export type DemoTransaction = {
  id: string;
  qrText: string;
  action: ActionType;
  createdAt: string;
};

const STATE_KEY = "nut_demo_state_v1";
const TX_KEY = "nut_demo_tx_v1";

const defaultState: DemoState = { companyStock: 0, nutCoins: 0 };

export function ensureSeed() {
  if (!localStorage.getItem(STATE_KEY)) {
    localStorage.setItem(STATE_KEY, JSON.stringify(defaultState));
  }
  if (!localStorage.getItem(TX_KEY)) {
    localStorage.setItem(TX_KEY, JSON.stringify([]));
  }
}

export function getState(): DemoState {
  ensureSeed();
  return JSON.parse(localStorage.getItem(STATE_KEY) || JSON.stringify(defaultState));
}

export function setState(next: DemoState) {
  localStorage.setItem(STATE_KEY, JSON.stringify(next));
}

export function listTransactions(limit = 50): DemoTransaction[] {
  ensureSeed();
  const all = JSON.parse(localStorage.getItem(TX_KEY) || "[]") as DemoTransaction[];
  return all.slice(-limit).reverse();
}

export function addTransaction(qrText: string, action: ActionType) {
  ensureSeed();

  const state = getState();
  const nextState: DemoState = { ...state };

  // Règle démo simple (tu pourras ajuster) :
  // collect => stock +1, coins +1
  // lend => stock -1 (min 0), coins +0
  if (action === "collect") {
    nextState.companyStock += 1;
    nextState.nutCoins += 1;
  } else {
    nextState.companyStock = Math.max(0, nextState.companyStock - 1);
  }

  setState(nextState);

  const tx = JSON.parse(localStorage.getItem(TX_KEY) || "[]") as DemoTransaction[];
  tx.push({
    id: crypto.randomUUID(),
    qrText,
    action,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(TX_KEY, JSON.stringify(tx));

  return nextState;
}

export function resetDemo() {
  localStorage.removeItem(STATE_KEY);
  localStorage.removeItem(TX_KEY);
  ensureSeed();
}
