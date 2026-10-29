/**
 * 이 사이트의 모든 화면은 "스펙"으로 먼저 정의되고, 렌더러가 그 스펙을 읽어 그린다.
 * 뜯어보기 모드에서 보이는 JSON은 바로 이 객체들이다.
 */

type BaseNode = {
  /** 페이지 안에서 고유한 id. 뜯어보기에서 레이어 이름으로 쓰인다. */
  id: string;
  /** 뜯어보기 이름표에 표시할 짧은 설명 (예: "Section · about") */
  label: string;
};

export type TextNode = BaseNode & {
  type: "text";
  variant: "greeting" | "lead" | "body" | "note" | "kicker";
  content: string;
};

export type HeadingNode = BaseNode & {
  type: "heading";
  level: 1 | 2;
  /** highlight에 해당하는 단어를 선택 상자로 감싼다. content 안에 그대로 들어 있어야 한다. */
  content: string;
  highlight?: string;
};

export type LinkNode = BaseNode & {
  type: "link";
  text: string;
  href: string;
  variant: "plain" | "arrow";
};

export type NavNode = BaseNode & {
  type: "nav";
  items: { text: string; href: string }[];
};

export type MediaNode = BaseNode & {
  type: "media";
  /** 실제 이미지·영상이 준비되면 src를 채운다. 비어 있으면 자리 표시로 그린다. */
  src?: string;
  kind: "photo" | "video" | "image";
  alt: string;
  shape: "blob" | "wide" | "card";
};

export type WorkCardNode = BaseNode & {
  type: "workCard";
  title: string;
  period: string;
  summary: string;
  href: string;
  media: MediaNode;
  stats: { value: string; unit: string }[];
};

export type LabItem = {
  title: string;
  date: string;
  media: MediaNode;
};

export type LabGridNode = BaseNode & {
  type: "labGrid";
  items: LabItem[];
};

export type ReviewStampNode = BaseNode & {
  type: "reviewStamp";
  title: string;
  story: string;
  totalRounds: number;
  passText: string;
};

export type InspectToggleNode = BaseNode & {
  type: "inspectToggle";
  text: string;
};

export type MetaGridNode = BaseNode & {
  type: "metaGrid";
  items: { term: string; lines: { text: string; href?: string }[] }[];
};

/** 관문 시나리오 하나: 어느 단계에서 멈추는지와 돌려받는 결과 */
export type GateScenario = {
  key: string;
  button: string;
  /** 통과한 단계 수. steps.length와 같으면 끝까지 통과 */
  passedSteps: number;
  result: string;
  explain: string;
};

export type GateDemoNode = BaseNode & {
  type: "gateDemo";
  steps: string[];
  scenarios: GateScenario[];
};

/** 뜯어보기를 켰을 때만 펼쳐지는 제작 의도 메모 */
export type WhyNoteNode = BaseNode & {
  type: "whyNote";
  content: string;
};

export type SectionNode = BaseNode & {
  type: "section";
  anchor?: string;
  heading?: string;
  /** kicker: 작은 회색 머리말, title: 본문 제목(h2) */
  headingStyle?: "kicker" | "title";
  gap: "sm" | "md" | "lg";
  children: SpecNode[];
};

export type SpecNode =
  | TextNode
  | HeadingNode
  | LinkNode
  | NavNode
  | MediaNode
  | WorkCardNode
  | LabGridNode
  | ReviewStampNode
  | InspectToggleNode
  | MetaGridNode
  | GateDemoNode
  | WhyNoteNode
  | SectionNode;

/** 홈처럼 왼쪽 소개 + 오른쪽 본문으로 나뉜 페이지 */
export type SplitPageSpec = {
  id: string;
  title: string;
  layout: "split";
  /** 왼쪽 단: 누구인지, 목차, 뜯어보기 스위치 */
  aside: SpecNode[];
  /** 오른쪽 단: 흐르는 본문 */
  main: SpecNode[];
};

/** 케이스 스터디처럼 한 단으로 읽는 글 페이지 */
export type ArticlePageSpec = {
  id: string;
  title: string;
  layout: "article";
  /** 상단 막대에 놓이는 노드 (돌아가기 링크, 뜯어보기 스위치) */
  toolbar: SpecNode[];
  body: SpecNode[];
};

export type PageSpec = SplitPageSpec | ArticlePageSpec;

/** 레이어 목록을 만들 때 쓰는, 페이지의 최상위 노드 전체 */
export function topLevelNodes(page: PageSpec): SpecNode[] {
  return page.layout === "split" ? [...page.aside, ...page.main] : [...page.toolbar, ...page.body];
}
