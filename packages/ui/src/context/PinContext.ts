import { createContext } from "react";

interface PinContextValue {
  isActive: boolean;
  inputs: string[];
  addInputs: (id: string) => void;
  value: string;
}

export const PinContext = createContext<PinContextValue | null>(null);
