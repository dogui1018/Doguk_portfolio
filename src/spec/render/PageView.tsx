import { css } from "styled-system/css";
import { InspectShift } from "@/inspect/InspectShift";
import { SpecPanel } from "@/inspect/SpecPanel";
import type { ArticlePageSpec, PageSpec, SplitPageSpec } from "@/spec/types";
import { SpecNodeView } from "./SpecRenderer";

/** 페이지 스펙의 layout에 맞는 틀을 고르고, 뜯어보기 패널을 함께 붙인다. */
export function PageView({ page }: { page: PageSpec }) {
  return (
    <>
      <InspectShift>{page.layout === "split" ? <SplitLayout page={page} /> : <ArticleLayout page={page} />}</InspectShift>
      <SpecPanel page={page} />
    </>
  );
}

/** 두 단 레이아웃: 왼쪽은 누구인지, 오른쪽은 흐르는 본문. */
function SplitLayout({ page }: { page: SplitPageSpec }) {
  return (
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
  );
}

/** 한 단 글 레이아웃: 위에 돌아가기·뜯어보기 막대, 아래로 읽기 좋은 폭의 본문. */
function ArticleLayout({ page }: { page: ArticlePageSpec }) {
  return (
    <>
      <header
        className={css({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          maxWidth: "1080px",
          mx: "auto",
          px: { base: "20px", md: "48px" },
          pt: { base: "28px", md: "40px" },
        })}
      >
        {page.toolbar.map((node, i) => (
          <SpecNodeView key={node.id} node={node} order={i} />
        ))}
      </header>
      <article
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "56px",
          maxWidth: "720px",
          mx: "auto",
          px: "20px",
          pt: { base: "56px", md: "72px" },
          pb: "120px",
        })}
      >
        {page.body.map((node, i) => (
          <SpecNodeView key={node.id} node={node} order={page.toolbar.length + i} />
        ))}
      </article>
    </>
  );
}
