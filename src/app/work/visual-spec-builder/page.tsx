import Link from "next/link";
import { css } from "styled-system/css";

export const metadata = {
  title: "AI가 낸 명령을 그대로 믿지 않기 위한 관문 — 도국",
};

/** 케이스 스터디는 다음 단계에서 스펙으로 옮긴다. 지금은 링크가 깨지지 않게 자리만 잡아둔다. */
export default function VisualSpecBuilderCase() {
  return (
    <main className={css({ maxWidth: "720px", mx: "auto", px: "20px", py: "96px", display: "flex", flexDirection: "column", gap: "20px" })}>
      <Link href="/" className={css({ alignSelf: "flex-start", fontSize: "14px", color: "cobalt" })}>
        ← 처음으로
      </Link>
      <p className={css({ fontSize: "14px", color: "muted" })}>Visual Spec Builder · 케이스 스터디 01</p>
      <h1 className={css({ fontSize: { base: "30px", md: "40px" }, lineHeight: 1.32, fontWeight: 700, letterSpacing: "-0.015em" })}>
        AI가 낸 명령을 그대로 믿지 않기 위한 관문
      </h1>
      <p className={css({ fontSize: "18px", lineHeight: 1.8, color: "muted" })}>케이스 스터디를 준비하고 있어요.</p>
    </main>
  );
}
