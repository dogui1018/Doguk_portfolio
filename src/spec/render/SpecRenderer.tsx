import Link from "next/link";
import { css, cx } from "styled-system/css";
import { InspectFrame } from "@/inspect/InspectFrame";
import { InspectToggle } from "@/inspect/InspectToggle";
import type {
  HeadingNode,
  LabGridNode,
  MediaNode,
  NavNode,
  SectionNode,
  SpecNode,
  TextNode,
  WorkCardNode,
} from "@/spec/types";
import { ReviewStamp } from "./ReviewStamp";

/* ---------- 노드별 컴포넌트 ---------- */

const textStyles: Record<TextNode["variant"], string> = {
  greeting: css({ fontSize: "18px", fontWeight: 500 }),
  lead: css({ fontSize: "18px", lineHeight: 1.85, color: "body" }),
  body: css({ fontSize: "16px", lineHeight: 1.75, color: "body" }),
  note: css({ fontSize: "18px", lineHeight: 1.85, color: "muted" }),
  kicker: css({ fontSize: "13px", fontWeight: 500, color: "muted" }),
};

function Text({ node }: { node: TextNode }) {
  return <p className={textStyles[node.variant]}>{node.content}</p>;
}

const handle = css({
  position: "absolute",
  width: "7px",
  height: "7px",
  bg: "surface",
  border: "2px solid token(colors.cobalt)",
});

function Heading({ node }: { node: HeadingNode }) {
  const Tag = node.level === 1 ? "h1" : "h2";
  const style =
    node.level === 1
      ? css({ fontSize: { base: "30px", md: "38px" }, lineHeight: 1.32, fontWeight: 700, letterSpacing: "-0.025em" })
      : css({ fontSize: "22px", fontWeight: 700 });

  if (!node.highlight || !node.content.includes(node.highlight)) {
    return <Tag className={style}>{node.content}</Tag>;
  }

  const [before, ...rest] = node.content.split(node.highlight);
  const after = rest.join(node.highlight);

  return (
    <Tag className={style}>
      {before}
      <span className={css({ position: "relative", display: "inline-block", px: "7px", outline: "2px solid token(colors.cobalt)", color: "cobalt" })}>
        <span aria-hidden="true" className={cx(handle, css({ left: "-5px", top: "-5px" }))} />
        <span aria-hidden="true" className={cx(handle, css({ right: "-5px", top: "-5px" }))} />
        <span aria-hidden="true" className={cx(handle, css({ left: "-5px", bottom: "-5px" }))} />
        <span aria-hidden="true" className={cx(handle, css({ right: "-5px", bottom: "-5px" }))} />
        {node.highlight}
      </span>
      {after}
    </Tag>
  );
}

function Nav({ node }: { node: NavNode }) {
  return (
    <nav aria-label="목차">
      <ul className={css({ display: "flex", flexDirection: "column", gap: "4px", listStyle: "none" })}>
        {node.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minHeight: "40px",
                fontSize: "15px",
                color: "muted",
                textDecoration: "none",
                "& > span": { width: "16px", height: "1.5px", bg: "#A3A39C", transition: "width 240ms token(easings.settle), background-color 240ms" },
                _hover: { color: "ink", "& > span": { width: "32px", bg: "ink" } },
                _focusVisible: { outline: "2px solid token(colors.cobalt)", outlineOffset: "2px" },
              })}
            >
              <span aria-hidden="true" />
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const mediaShape: Record<MediaNode["shape"], string> = {
  blob: css({ width: "168px", height: "168px", borderRadius: "42% 58% 51% 49% / 46% 44% 56% 54%" }),
  wide: css({ width: "100%", height: { base: "200px", md: "260px" }, borderRadius: "10px" }),
  card: css({ width: "100%", aspectRatio: "4 / 3", borderRadius: "10px" }),
};

function Media({ node }: { node: MediaNode }) {
  const base = cx(mediaShape[node.shape], css({ bg: "placeholder", overflow: "hidden", flexShrink: 0 }));

  if (node.src && node.kind === "video") {
    return <video className={base} src={node.src} aria-label={node.alt} autoPlay muted loop playsInline style={{ objectFit: "cover" }} />;
  }
  if (node.src) {
    // eslint-disable-next-line @next/next/no-img-element -- 자리 표시 단계라 next/image 최적화는 실제 이미지가 들어올 때 붙인다.
    return <img className={base} src={node.src} alt={node.alt} style={{ objectFit: "cover" }} />;
  }
  return (
    <div
      role="img"
      aria-label={`${node.alt} (준비 중)`}
      className={cx(base, css({ display: "flex", alignItems: "center", justifyContent: "center", p: "16px", textAlign: "center", fontSize: "12px", lineHeight: 1.5, color: "muted" }))}
    >
      [{node.kind === "photo" ? "사진" : node.kind === "video" ? "화면 녹화" : "이미지"}: {node.alt}]
    </div>
  );
}

function WorkCard({ node }: { node: WorkCardNode }) {
  return (
    <Link
      href={node.href}
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        p: "24px",
        bg: "surface",
        border: "1px solid token(colors.line)",
        borderRadius: "16px",
        color: "ink",
        textDecoration: "none",
        transition: "transform 240ms token(easings.settle), box-shadow 240ms",
        _hover: { transform: "translateY(-2px)", boxShadow: "0 16px 32px -20px rgba(0,0,0,0.25)" },
        _focusVisible: { outline: "2px solid token(colors.cobalt)", outlineOffset: "4px" },
      })}
    >
      <Media node={node.media} />
      <div className={css({ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px" })}>
        <span className={css({ fontSize: "22px", fontWeight: 700 })}>{node.title}</span>
        <span className={css({ fontFamily: "mono", fontSize: "13px", color: "muted" })}>{node.period}</span>
      </div>
      <span className={css({ fontSize: "16px", lineHeight: 1.7, color: "body" })}>{node.summary} →</span>
      <dl className={css({ display: "flex", flexWrap: "wrap", gap: "20px", pt: "14px", borderTop: "1px solid token(colors.placeholder)", fontSize: "14px" })}>
        {node.stats.map((s) => (
          <div key={s.unit} className={css({ display: "flex", flexDirection: "row-reverse", alignItems: "baseline", gap: "4px" })}>
            <dt>{s.unit}</dt>
            <dd className={css({ fontSize: "20px", fontWeight: 700 })}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

function LabGrid({ node }: { node: LabGridNode }) {
  return (
    <ul className={css({ display: "grid", gridTemplateColumns: { base: "repeat(1, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" }, gap: "16px", listStyle: "none" })}>
      {node.items.map((item) => (
        <li key={item.title} className={css({ display: "flex", flexDirection: "column", gap: "10px" })}>
          <Media node={item.media} />
          <span className={css({ fontSize: "14px", fontWeight: 700 })}>{item.title}</span>
          <time className={css({ fontFamily: "mono", fontSize: "12px", color: "muted" })}>{item.date}</time>
        </li>
      ))}
    </ul>
  );
}

const sectionGap: Record<SectionNode["gap"], string> = {
  sm: css({ gap: "16px" }),
  md: css({ gap: "18px" }),
  lg: css({ gap: "32px" }),
};

function Section({ node, order }: { node: SectionNode; order: number }) {
  return (
    <section id={node.anchor} aria-label={node.heading} className={cx(css({ display: "flex", flexDirection: "column", scrollMarginTop: "48px" }), sectionGap[node.gap])}>
      {node.heading && <h2 className={textStyles.kicker}>{node.heading}</h2>}
      {node.children.map((child, i) => (
        <SpecNodeView key={child.id} node={child} order={order + i + 1} framed={false} />
      ))}
    </section>
  );
}

/* ---------- 디스패처 ---------- */

function renderNode(node: SpecNode, order: number) {
  switch (node.type) {
    case "text":
      return <Text node={node} />;
    case "heading":
      return <Heading node={node} />;
    case "link":
      return (
        <a href={node.href} className={css({ alignSelf: "flex-start", fontSize: "14px", color: "cobalt", _hover: { color: "cobaltDeep" } })}>
          {node.text}
          {node.variant === "arrow" ? " →" : ""}
        </a>
      );
    case "nav":
      return <Nav node={node} />;
    case "media":
      return <Media node={node} />;
    case "workCard":
      return <WorkCard node={node} />;
    case "labGrid":
      return <LabGrid node={node} />;
    case "reviewStamp":
      return <ReviewStamp node={node} />;
    case "inspectToggle":
      return <InspectToggle text={node.text} />;
    case "section":
      return <Section node={node} order={order} />;
  }
}

/**
 * 스펙 노드 하나를 그린다. 최상위 노드는 뜯어보기 프레임으로 감싸서
 * 스위치를 켰을 때 이름표와 테두리가 드러나게 한다.
 */
export function SpecNodeView({ node, order, framed = true }: { node: SpecNode; order: number; framed?: boolean }) {
  const content = renderNode(node, order);
  if (!framed) return content;
  return (
    <InspectFrame node={node} order={order}>
      {content}
    </InspectFrame>
  );
}
