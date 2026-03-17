export type ActionType = "lend" | "collect";

export type DemoState = {
  companyStock: number;
  clientContainers: number;
  nutCoins: number;
};

export type DemoTransaction = {
  id: string;
  qrText: string;
  clientEmail: string;
  action: ActionType;
  createdAt: string;
};

const STATE_KEY = "nut_demo_state_v2";
const TX_KEY = "nut_demo_tx_v2";

// Stock initial : 10 contenants disponibles en entreprise
const defaultState: DemoState = { companyStock: 10, clientContainers: 0, nutCoins: 0 };

export const DEMO_STATE_EVENT = "nut-demo-state-change";

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

export function listTransactions(limit = 50): DemoTransaction[] {
  ensureSeed();
  const all = JSON.parse(localStorage.getItem(TX_KEY) || "[]") as DemoTransaction[];
  return all.slice(-limit).reverse();
}

export function addTransaction(qrText: string, action: ActionType): DemoState {
  ensureSeed();

  const state = getState();
  const nextState: DemoState = { ...state };

  if (action === "collect") {
    // Entreprise récupère → stock +1, contenants client -1, coins +1
    nextState.companyStock += 1;
    nextState.clientContainers = Math.max(0, nextState.clientContainers - 1);
    nextState.nutCoins += 1;
  } else {
    // Entreprise prête → stock -1, contenants client +1
    nextState.companyStock = Math.max(0, nextState.companyStock - 1);
    nextState.clientContainers += 1;
  }

  localStorage.setItem(STATE_KEY, JSON.stringify(nextState));

  // Extraire l'email du format QR : nutbox:client:email:timestamp
  const parts = qrText.split(":");
  const clientEmail = parts.length >= 3 ? parts[2] : qrText;

  const tx = JSON.parse(localStorage.getItem(TX_KEY) || "[]") as DemoTransaction[];
  tx.push({
    id: crypto.randomUUID(),
    qrText,
    clientEmail,
    action,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(TX_KEY, JSON.stringify(tx));

  window.dispatchEvent(new Event(DEMO_STATE_EVENT));
  return nextState;
}

export function resetDemo() {
  localStorage.removeItem(STATE_KEY);
  localStorage.removeItem(TX_KEY);
  ensureSeed();
  window.dispatchEvent(new Event(DEMO_STATE_EVENT));
}
