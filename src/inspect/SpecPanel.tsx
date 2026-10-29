"use client";

import { useEffect } from "react";
import { css } from "styled-system/css";
import type { PageSpec, SpecNode } from "@/spec/types";
import { toPanelJson, useInspect } from "./store";

/** 페이지 스펙을 위에서 아래 순서로 펼쳐 레이어 목록을 만든다. */
function flatten(nodes: SpecNode[], depth = 0): { node: SpecNode; depth: number }[] {
  return nodes.flatMap((node) => [
    { node, depth },
    ...(node.type === "section" ? flatten(node.children, depth + 1) : []),
  ]);
}

const panel = css.raw({
  position: "fixed",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  bg: "panel",
  color: "panelText",
  transitionProperty: "transform",
  transitionDuration: "420ms",
  transitionTimingFunction: "settle",
  // 모바일: 아래에서 올라오는 시트
  left: 0,
  right: 0,
  bottom: 0,
  height: "60%",
  borderTopRadius: "18px",
  transform: "translateY(102%)",
  // 데스크톱: 오른쪽에서 밀려 나오는 패널
  lg: {
    left: "auto",
    top: 0,
    height: "auto",
    width: "380px",
    borderTopRadius: "0",
    transform: "translateX(104%)",
  },
});

const panelOn = css.raw({ transform: "none", boxShadow: "-24px 0 48px -24px rgba(0,0,0,0.35)", lg: { transform: "none" } });

const layerButton = css.raw({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: "34px",
  pr: "10px",
  border: "none",
  borderRadius: "6px",
  bg: "transparent",
  color: "panelText",
  fontFamily: "mono",
  fontSize: "12.5px",
  textAlign: "left",
  cursor: "pointer",
  _hover: { bg: "rgba(255,255,255,0.06)" },
  _focusVisible: { outline: "2px solid token(colors.cobalt)" },
});

const layerActive = css.raw({ bg: "cobalt", color: "white", _hover: { bg: "cobalt" } });

export function SpecPanel({ page }: { page: PageSpec }) {
  const enabled = useInspect((s) => s.enabled);
  const selected = useInspect((s) => s.selected);
  const select = useInspect((s) => s.select);
  const close = useInspect((s) => s.close);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, close]);

  const layers = flatten([...page.aside, ...page.main]);
  const current = selected ?? layers[0]?.node ?? null;

  return (
    <aside
      aria-label="화면 스펙"
      aria-hidden={!enabled}
      inert={!enabled}
      className={css(panel, enabled && panelOn)}
    >
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", px: "20px", py: "12px", borderBottom: "1px solid token(colors.panelLine)" })}>
        <span className={css({ fontFamily: "mono", fontSize: "12px", color: "panelMuted" })}>spec · {page.id}.ts</span>
        <button
          type="button"
          onClick={close}
          className={css({ minHeight: "44px", px: "12px", border: "none", borderRadius: "8px", bg: "transparent", color: "panelText", fontSize: "13px", cursor: "pointer", _focusVisible: { outline: "2px solid token(colors.cobalt)" } })}
        >
          닫기 (Esc)
        </button>
      </div>

      <div className={css({ maxHeight: "40%", overflowY: "auto", px: "12px", py: "12px", borderBottom: "1px solid token(colors.panelLine)" })}>
        <p className={css({ px: "8px", pb: "6px", fontFamily: "mono", fontSize: "11px", letterSpacing: "0.06em", color: "panelMuted" })}>LAYERS</p>
        <ul className={css({ display: "flex", flexDirection: "column", gap: "2px", listStyle: "none" })}>
          {layers.map(({ node, depth }) => (
            <li key={node.id}>
              <button
                type="button"
                aria-pressed={current?.id === node.id}
                onClick={() => select(node)}
                className={css(layerButton, current?.id === node.id && layerActive)}
                style={{ paddingLeft: `${10 + depth * 16}px` }}
              >
                {node.id}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <pre className={css({ flex: 1, overflow: "auto", m: 0, px: "20px", py: "16px", fontFamily: "mono", fontSize: "12.5px", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-all" })}>
        {current ? toPanelJson(current) : ""}
      </pre>
    </aside>
  );
}
