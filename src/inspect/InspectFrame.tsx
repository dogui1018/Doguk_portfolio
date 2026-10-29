"use client";

import type { ReactNode } from "react";
import { css } from "styled-system/css";
import type { SpecNode } from "@/spec/types";
import { useInspect } from "./store";

// Panda는 속성마다 클래스를 하나씩 만든다. 꺼짐/켜짐 클래스를 cx로 겹치면 스타일시트 순서가
// 이기는 쪽을 정해버리므로, 상태별 스타일은 css.raw 객체로 두고 css(...)로 병합한다.
const frame = css.raw({
  position: "relative",
  borderRadius: "10px",
  outline: "1.5px dashed transparent",
  outlineOffset: "10px",
  transitionProperty: "outline-color, background-color",
  transitionDuration: "inspect",
  transitionTimingFunction: "settle",
});

const frameOn = css.raw({
  outlineColor: "cobalt",
  backgroundColor: "rgba(43, 59, 255, 0.04)",
});

const frameSelected = css.raw({
  outlineStyle: "solid",
  outlineWidth: "2px",
});

const tag = css.raw({
  position: "absolute",
  // 테두리에 걸치게 붙여서, 간격이 좁은 왼쪽 단에서도 위 요소를 가리지 않게 한다.
  left: "-10px",
  top: "-23px",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  height: "26px",
  px: "8px",
  border: "none",
  borderRadius: "4px",
  bg: "cobalt",
  color: "white",
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: 500,
  whiteSpace: "nowrap",
  cursor: "pointer",
  opacity: 0,
  transform: "translateY(6px)",
  pointerEvents: "none",
  transitionProperty: "opacity, transform",
  transitionDuration: "inspect",
  transitionTimingFunction: "settle",
  _focusVisible: { outline: "2px solid token(colors.ink)", outlineOffset: "2px" },
});

const tagOn = css.raw({ opacity: 1, transform: "none", pointerEvents: "auto" });

type Props = {
  node: SpecNode;
  /** 이름표가 나타나는 순서. 위에서 아래로 살짝씩 늦게 뜬다. */
  order: number;
  children: ReactNode;
};

export function InspectFrame({ node, order, children }: Props) {
  const enabled = useInspect((s) => s.enabled);
  const selectedId = useInspect((s) => s.selected?.id);
  const select = useInspect((s) => s.select);
  const isSelected = enabled && selectedId === node.id;

  return (
    <div className={css(frame, enabled && frameOn, isSelected && frameSelected)}>
      <button
        type="button"
        className={css(tag, enabled && tagOn)}
        style={{ transitionDelay: enabled ? `${order * 40}ms` : "0ms" }}
        tabIndex={enabled ? 0 : -1}
        aria-hidden={!enabled}
        onClick={() => select(node)}
      >
        {node.label}
      </button>
      {children}
    </div>
  );
}
