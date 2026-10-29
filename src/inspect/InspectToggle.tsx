"use client";

import { css } from "styled-system/css";
import { useInspect } from "./store";

const button = css.raw({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  minHeight: "44px",
  pl: "10px",
  pr: "14px",
  border: "1.5px solid token(colors.ink)",
  borderRadius: "999px",
  bg: "transparent",
  color: "ink",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  _focusVisible: { outline: "2px solid token(colors.cobalt)", outlineOffset: "3px" },
});

const track = css.raw({
  position: "relative",
  display: "inline-block",
  width: "44px",
  height: "24px",
  borderRadius: "999px",
  bg: "#CFCFC8",
  transitionProperty: "background-color",
  transitionDuration: "inspect",
});

const knob = css.raw({
  position: "absolute",
  top: "3px",
  left: "3px",
  width: "18px",
  height: "18px",
  borderRadius: "999px",
  bg: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
  transitionProperty: "transform",
  transitionDuration: "inspect",
  transitionTimingFunction: "settle",
});

export function InspectToggle({ text }: { text: string }) {
  const enabled = useInspect((s) => s.enabled);
  const toggle = useInspect((s) => s.toggle);

  return (
    <button type="button" className={css(button)} aria-pressed={enabled} onClick={toggle}>
      <span aria-hidden="true" className={css(track, enabled && { bg: "cobalt" })}>
        <span className={css(knob, enabled && { transform: "translateX(20px)" })} />
      </span>
      {text}
    </button>
  );
}
