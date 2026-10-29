"use client";

import { useState } from "react";
import { css } from "styled-system/css";
import type { GateDemoNode } from "@/spec/types";

const stepBox = css.raw({
  flex: "1 1 120px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  p: "12px 14px",
  borderRadius: "10px",
  border: "1.5px solid token(colors.line)",
  bg: "paper",
  fontSize: "13px",
  color: "muted",
  transitionProperty: "background-color, border-color, color, transform",
  transitionDuration: "260ms",
  transitionTimingFunction: "settle",
});

const stepPassed = css.raw({ borderColor: "#86EFAC", bg: "#F0FDF4", color: "#166534" });
const stepStopped = css.raw({ borderColor: "#FDBA74", bg: "#FFF7ED", color: "#9A3412", transform: "translateY(-2px)" });

const choice = css.raw({
  minHeight: "44px",
  px: "14px",
  border: "1px solid token(colors.line)",
  borderRadius: "10px",
  bg: "surface",
  fontSize: "14px",
  color: "ink",
  textAlign: "left",
  cursor: "pointer",
  _hover: { borderColor: "ink" },
  _focusVisible: { outline: "2px solid token(colors.cobalt)", outlineOffset: "2px" },
});

const choiceActive = css.raw({ borderColor: "ink", bg: "ink", color: "white", _hover: { borderColor: "ink" } });

export function GateDemo({ node }: { node: GateDemoNode }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = node.scenarios.find((s) => s.key === activeKey) ?? null;

  const stepState = (i: number) => {
    if (!active) return "idle";
    if (i < active.passedSteps) return "passed";
    if (i === active.passedSteps) return "stopped";
    return "idle";
  };

  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "18px", p: { base: "18px", md: "24px" }, bg: "surface", border: "1px solid token(colors.line)", borderRadius: "16px" })}>
      <p className={css({ fontSize: "13px", fontWeight: 500, color: "muted" })}>직접 해보기 · 명령을 골라 관문에 보내보세요</p>

      <div className={css({ display: "flex", flexWrap: "wrap", gap: "8px" })}>
        {node.scenarios.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={activeKey === s.key}
            onClick={() => setActiveKey(s.key)}
            className={css(choice, activeKey === s.key && choiceActive)}
          >
            {s.button}
          </button>
        ))}
      </div>

      <ol aria-label="관문 단계" className={css({ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none" })}>
        {node.steps.map((step, i) => {
          const state = stepState(i);
          return (
            <li
              key={step}
              className={css(stepBox, state === "passed" && stepPassed, state === "stopped" && stepStopped)}
              style={{ transitionDelay: active ? `${i * 90}ms` : "0ms" }}
            >
              <span className={css({ fontFamily: "mono", fontSize: "11px" })}>{String(i + 1).padStart(2, "0")}</span>
              <span className={css({ fontWeight: 700 })}>{step}</span>
              <span className={css({ fontSize: "12px" })}>
                {state === "passed" ? "통과" : state === "stopped" ? "여기서 거절" : "대기"}
              </span>
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className={css({ minHeight: "64px", p: "14px 16px", borderRadius: "10px", bg: "panel", color: "panelText", fontFamily: "mono", fontSize: "13px", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-all" })}>
        {active ? active.result : "// 위에서 명령을 하나 골라보세요"}
      </div>
      {active && <p className={css({ fontSize: "15px", lineHeight: 1.75, color: "body" })}>{active.explain}</p>}
    </div>
  );
}
