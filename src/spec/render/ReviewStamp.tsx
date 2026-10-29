"use client";

import { useState } from "react";
import { css } from "styled-system/css";
import type { ReviewStampNode } from "@/spec/types";

const stamp = css.raw({
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "132px",
  height: "132px",
  borderRadius: "999px",
  border: "3px dashed #BDBDB5",
  color: "muted",
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: 1.35,
  textAlign: "center",
  whiteSpace: "pre-line",
  transitionProperty: "transform, border-color, color",
  transitionDuration: "260ms",
  transitionTimingFunction: "cubic-bezier(.3,1.6,.5,1)",
});

const stampPassed = css.raw({
  borderStyle: "solid",
  borderColor: "cobalt",
  color: "cobalt",
  bg: "surface",
});

const pill = css.raw({
  minHeight: "44px",
  px: "18px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  _focusVisible: { outline: "2px solid token(colors.cobalt)", outlineOffset: "3px" },
  _disabled: { cursor: "default" },
});

export function ReviewStamp({ node }: { node: ReviewStampNode }) {
  const [round, setRound] = useState(0);
  const passed = round >= node.totalRounds;

  const label = passed
    ? `${node.passText}\n리뷰 ${node.totalRounds}차`
    : round === 0
      ? "리뷰 전"
      : `리뷰 ${round}차\n수정 중`;

  const rotate = passed ? "rotate(-8deg) scale(1.06)" : `rotate(${round % 2 === 0 ? -3 : 3}deg)`;

  return (
    <div className={css({ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "28px", p: "28px", border: "1.5px dashed #BDBDB5", borderRadius: "16px" })}>
      <div className={css(stamp, passed && stampPassed)} style={{ transform: rotate }} aria-live="polite">
        {label}
      </div>
      <div className={css({ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "10px" })}>
        <h3 className={css({ fontSize: "17px", fontWeight: 700 })}>{node.title}</h3>
        <p className={css({ fontSize: "15px", lineHeight: 1.7, color: "body" })}>{node.story}</p>
        <div className={css({ display: "flex", flexWrap: "wrap", gap: "8px" })}>
          <button
            type="button"
            disabled={passed}
            onClick={() => setRound((r) => Math.min(r + 1, node.totalRounds))}
            className={css(pill, { border: "none", bg: "ink", color: "white" })}
          >
            {passed ? "이제 안 겹쳐요" : `리뷰 보내기 (${round}/${node.totalRounds})`}
          </button>
          <button
            type="button"
            onClick={() => setRound(0)}
            className={css(pill, { border: "1px solid token(colors.line)", bg: "transparent", color: "muted", fontWeight: 500 })}
          >
            처음부터
          </button>
        </div>
      </div>
    </div>
  );
}
