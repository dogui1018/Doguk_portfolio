import type { PageSpec } from "../types";

/**
 * 홈 화면 스펙.
 * [대괄호] 안의 문장과 비어 있는 src는 도국이 직접 채울 자리다.
 */
export const homeSpec: PageSpec = {
  id: "home",
  title: "도국 — 프론트엔드 개발자",
  layout: "split",
  aside: [
    {
      id: "intro.photo",
      label: "Media · photo",
      type: "media",
      kind: "photo",
      shape: "blob",
      alt: "작업 중인 도국",
    },
    {
      id: "intro.greeting",
      label: "Text · greeting",
      type: "text",
      variant: "greeting",
      content: "안녕하세요, 도국이에요.",
    },
    {
      id: "intro.title",
      label: "Heading · h1",
      type: "heading",
      level: 1,
      content: "무엇을 왜 만들지 고민하고, AI와 함께 빠르게 구현하는 프론트엔드 개발자",
      highlight: "왜",
    },
    {
      id: "intro.nav",
      label: "Nav · sections",
      type: "nav",
      items: [
        { text: "작업", href: "#work" },
        { text: "실험", href: "#lab" },
        { text: "제작기", href: "#making" },
      ],
    },
    {
      id: "intro.inspect",
      label: "Toggle · inspect",
      type: "inspectToggle",
      text: "이 페이지 뜯어보기",
    },
    {
      id: "intro.github",
      label: "Link · github",
      type: "link",
      variant: "plain",
      text: "GitHub",
      href: "https://github.com/dogui1018",
    },
  ],
  main: [
    {
      id: "about",
      label: "Section · about",
      type: "section",
      gap: "sm",
      children: [
        {
          id: "about.lead",
          label: "Text · lead",
          type: "text",
          variant: "lead",
          content:
            "부트캠프를 마치고, 개발자 6명과 함께 AI가 화면을 구현하는 도구를 만들었어요. 저는 그중 손에 닿는 부분을 맡았어요. 메뉴바, 레이어 트리, 그리고 AI가 낸 명령을 그대로 믿지 않게 막아주는 관문까지요.",
        },
        {
          id: "about.personal",
          label: "Text · note",
          type: "text",
          variant: "note",
          content: "[도국이 직접 쓰는 솔직한 한두 줄. 예: 개발을 시작한 계기, 요즘 빠져 있는 것]",
        },
      ],
    },
    {
      id: "work",
      label: "Section · work",
      type: "section",
      anchor: "work",
      heading: "작업",
      gap: "md",
      children: [
        {
          id: "work.vsb",
          label: "Card · featured-work",
          type: "workCard",
          title: "Visual Spec Builder",
          period: "2026.08.25 – 10.23",
          summary: "AI가 낸 명령을 그대로 믿지 않기 위한 관문을 만든 이야기",
          href: "/work/visual-spec-builder",
          media: {
            id: "work.vsb.media",
            label: "Media · video",
            type: "media",
            kind: "video",
            shape: "wide",
            alt: "레이어 트리에서 노드를 끌어 다른 프레임으로 옮기는 장면",
          },
          stats: [
            { value: "133", unit: "커밋" },
            { value: "25+", unit: "머지된 PR" },
            { value: "6", unit: "명 팀" },
          ],
        },
      ],
    },
    {
      id: "toy.review",
      label: "Toy · review-stamp",
      type: "reviewStamp",
      title: "작은 배지 하나, 리뷰 8번",
      story:
        "화면이 좁아지면 넘친 내용을 알려주는 작은 배지가 다른 버튼과 자꾸 겹쳤어요. 리뷰를 여덟 번 받고서야 어떤 폭에서도 안 겹치게 됐죠. 직접 리뷰를 보내보세요.",
      totalRounds: 8,
      passText: "통과!",
    },
    {
      id: "lab",
      label: "Section · lab",
      type: "section",
      anchor: "lab",
      heading: "실험 · 직접 만든 인터랙션 기록",
      gap: "md",
      children: [
        {
          id: "lab.grid",
          label: "Grid · lab",
          type: "labGrid",
          items: [
            {
              title: "드래그로 다른 프레임에 옮기기",
              date: "2026.09.14",
              media: { id: "lab.reparent", label: "Media · video", type: "media", kind: "video", shape: "card", alt: "레이어 트리 재부모화" },
            },
            {
              title: "패널 접기와 폭 조절",
              date: "2026.10.08",
              media: { id: "lab.panel", label: "Media · video", type: "media", kind: "video", shape: "card", alt: "패널 접기와 폭 조절" },
            },
            {
              title: "넘침 안내 배지",
              date: "2026.10.22",
              media: { id: "lab.overflow", label: "Media · video", type: "media", kind: "video", shape: "card", alt: "넘침 안내 배지" },
            },
          ],
        },
      ],
    },
    {
      id: "making",
      label: "Section · making-of",
      type: "section",
      anchor: "making",
      heading: "이 사이트 제작기",
      gap: "sm",
      children: [
        {
          id: "making.lead",
          label: "Text · lead",
          type: "text",
          variant: "lead",
          content:
            "처음엔 에디터 모양으로 만들었다가 너무 흔해 보여서 갈아엎었어요. 왜 지금 모양이 됐는지, 그 결정들을 적어두고 있어요.",
        },
      ],
    },
  ],
};
