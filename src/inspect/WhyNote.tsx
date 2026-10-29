"use client";

import { css } from "styled-system/css";
import { useInspect } from "./store";

const note = css.raw({
  display: "grid",
  gridTemplateRows: "0fr",
  opacity: 0,
  transitionProperty: "grid-template-rows, opacity",
  transitionDuration: "420ms",
  transitionTimingFunction: "settle",
});

const noteOn = css.raw({ gridTemplateRows: "1fr", opacity: 1 });

/** 뜯어보기를 켰을 때만 펼쳐지는 "왜 이렇게 만들었나" 메모. 꺼져 있으면 보조기기에서도 숨긴다. */
export function WhyNote({ content }: { content: string }) {
  const enabled = useInspect((s) => s.enabled);
  return (
    <div className={css(note, enabled && noteOn)} aria-hidden={!enabled}>
      <div className={css({ overflow: "hidden" })}>
        <p className={css({ p: "12px 14px", borderRadius: "8px", bg: "rgba(43, 59, 255, 0.07)", fontSize: "14px", lineHeight: 1.7, color: "body" })}>
          <strong className={css({ color: "cobalt" })}>왜 이렇게 만들었나 · </strong>
          {content}
        </p>
      </div>
    </div>
  );
}
