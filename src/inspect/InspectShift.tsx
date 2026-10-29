"use client";

import type { ReactNode } from "react";
import { css } from "styled-system/css";
import { useInspect } from "./store";

/** 넓은 화면에서 스펙 패널이 열리면 본문이 패널에 가려지지 않게 비켜선다. */
export function InspectShift({ children }: { children: ReactNode }) {
  const enabled = useInspect((s) => s.enabled);
  return (
    <div
      className={css(
        { transition: "padding-right 420ms token(easings.settle)" },
        enabled && { xl: { pr: "380px" } },
      )}
    >
      {children}
    </div>
  );
}
