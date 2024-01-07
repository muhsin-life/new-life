import { DEFAULT_ADDRESS } from "@/config";
import { Address } from "@/types/session";
import { create } from "zustand";

interface addressProps {
  currentAddress: Address;
  setCurrentAddress: (currentAddress: Address) => void;
}

export const addressStore = create<addressProps>()(
  (set) => ({
    currentAddress: DEFAULT_ADDRESS,
    setCurrentAddress: (currentAddress) => {
      set({ currentAddress });
    },
  }));
