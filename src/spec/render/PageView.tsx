import { css } from "styled-system/css";
import { InspectShift } from "@/inspect/InspectShift";
import { SpecPanel } from "@/inspect/SpecPanel";
import type { PageSpec } from "@/spec/types";
import { SpecNodeView } from "./SpecRenderer";

/** 두 단 레이아웃: 왼쪽은 누구인지, 오른쪽은 흐르는 본문. */
export function PageView({ page }: { page: PageSpec }) {
  return (
    <>
      <InspectShift>
        <div
          className={css({
            display: "flex",
            flexWrap: "wrap",
            columnGap: "72px",
            rowGap: "64px",
            maxWidth: "1280px",
            mx: "auto",
            px: { base: "20px", md: "48px", lg: "64px" },
            pt: { base: "48px", lg: "72px" },
            pb: "96px",
          })}
        >
          <aside
            className={css({
              flex: "1 1 340px",
              maxWidth: { lg: "440px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "28px",
              lg: { position: "sticky", top: "72px", alignSelf: "flex-start" },
            })}
          >
            {page.aside.map((node, i) => (
              <SpecNodeView key={node.id} node={node} order={i} />
            ))}
          </aside>

          <main className={css({ flex: "999 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: "88px", pt: "8px" })}>
            {page.main.map((node, i) => (
              <SpecNodeView key={node.id} node={node} order={page.aside.length + i} />
            ))}
            <footer className={css({ pt: "24px", borderTop: "1px solid token(colors.line)", fontSize: "13px", lineHeight: 1.7, color: "muted" })}>
              직접 설계하고 만들었어요. 왼쪽 스위치를 켜면 이 페이지가 어떤 스펙으로 짜여 있는지 보여요.
            </footer>
          </main>
        </div>
      </InspectShift>
      <SpecPanel page={page} />
    </>
  );
}
