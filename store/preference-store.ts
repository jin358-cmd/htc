"use client";

import type { AdminChannel } from "@/types/commerce";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PreferenceState = {
  adminChannels: Record<AdminChannel, boolean>;
  sound: "off" | "default";
  customer: { email: boolean; line: boolean; telegram: boolean };
  setAdminChannel: (channel: AdminChannel, enabled: boolean) => void;
  setSound: (sound: "off" | "default") => void;
  setCustomer: (channel: "email" | "line" | "telegram", enabled: boolean) => void;
};

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      adminChannels: { telegram: false, line: false, email: true, "web-push": false },
      sound: "default",
      customer: { email: true, line: false, telegram: false },
      setAdminChannel: (channel, enabled) =>
        set((state) => ({ adminChannels: { ...state.adminChannels, [channel]: enabled } })),
      setSound: (sound) => set({ sound }),
      setCustomer: (channel, enabled) =>
        set((state) => ({ customer: { ...state.customer, [channel]: enabled } })),
    }),
    {
      name: "htc-preferences",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
