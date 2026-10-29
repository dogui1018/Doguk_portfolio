"use client";

import { create } from "zustand";
import type { SpecNode } from "@/spec/types";

type InspectState = {
  enabled: boolean;
  selected: SpecNode | null;
  toggle: () => void;
  close: () => void;
  select: (node: SpecNode) => void;
};

export const useInspect = create<InspectState>((set) => ({
  enabled: false,
  selected: null,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  close: () => set({ enabled: false }),
  select: (node) => set({ selected: node, enabled: true }),
}));

/** 패널에 보여줄 때 자식 노드는 id만 남겨 한눈에 읽히게 한다. */
export function toPanelJson(node: SpecNode): string {
  const replacer = (key: string, value: unknown) => {
    if (key === "children" && Array.isArray(value)) {
      return value.map((child: SpecNode) => `→ ${child.id}`);
    }
    return value;
  };
  return JSON.stringify(node, replacer, 2);
}
