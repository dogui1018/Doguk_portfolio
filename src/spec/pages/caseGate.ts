import type { ArticlePageSpec, SectionNode, SpecNode } from "../types";

/** 제목(h2) + 문단들로 된 본문 섹션을 만든다. */
function prose(id: string, heading: string, paragraphs: string[], extra: SpecNode[] = []): SectionNode {
  return {
    id: `case.${id}`,
    label: `Section · ${heading}`,
    type: "section",
    heading,
    headingStyle: "title",
    gap: "sm",
    children: [
      ...paragraphs.map((content, i) => ({
        id: `case.${id}.p${i + 1}`,
        label: "Text · body",
        type: "text" as const,
        variant: "body" as const,
        content,
      })),
      ...extra,
    ],
  };
}

/**
 * Visual Spec Builder 케이스 스터디 — AI 명령 검증 관문.
 * 사실은 전부 커밋 ad03be1, d18adf0 과 PR #176 기준이다. [대괄호]는 도국이 채울 자리.
 */
export const caseGateSpec: ArticlePageSpec = {
  id: "case-gate",
  title: "AI가 낸 명령을 그대로 믿지 않기 위한 관문",
  layout: "article",
  toolbar: [
    { id: "nav.back", label: "Link · back", type: "link", variant: "plain", text: "← 처음으로", href: "/" },
    { id: "nav.inspect", label: "Toggle · inspect", type: "inspectToggle", text: "이 페이지 뜯어보기" },
  ],
  body: [
    {
      id: "case.intro",
      label: "Section · intro",
      type: "section",
      gap: "sm",
      children: [
        { id: "case.kicker", label: "Text · kicker", type: "text", variant: "kicker", content: "Visual Spec Builder · 케이스 스터디 01" },
        { id: "case.title", label: "Heading · h1", type: "heading", level: 1, content: "AI가 낸 명령을 그대로 믿지 않기 위한 관문" },
        {
          id: "case.lead",
          label: "Text · lead",
          type: "text",
          variant: "lead",
          content:
            "자연어로 화면을 고치면 AI가 명령 배열을 만들어 에디터에 넘깁니다. 형식이 맞아도 아무 효과가 없거나 화면 데이터를 망가뜨릴 수 있는 입력이었죠. 그 명령이 실제로 반영되기 전에 걸러내는 관문을 구현했습니다.",
        },
      ],
    },
    {
      id: "case.meta",
      label: "Grid · meta",
      type: "metaGrid",
      items: [
        { term: "내 역할", lines: [{ text: "G2·G3 관문, 전부-또는-전무 커밋 구현" }] },
        { term: "날짜", lines: [{ text: "2026.09.21" }] },
        { term: "팀", lines: [{ text: "프론트엔드 6명" }] },
        {
          term: "관련 기록",
          lines: [
            { text: "PR #176", href: "https://github.com/visual-spec-labs/visual-spec-builder/pull/176" },
            { text: "커밋 d18adf0", href: "https://github.com/visual-spec-labs/visual-spec-builder/commit/d18adf0" },
          ],
        },
      ],
    },
    prose("problem", "문제", [
      "에디터의 GUI는 패널이 바꿀 수 있는 값의 모양을 코드로 고정해 두기 때문에 잘못된 명령이 들어올 틈이 적었습니다. 하지만 자연어 입력에서 오는 명령 배열은 출처를 믿을 수 없었습니다.",
      "그대로 적용하면 아무 변화도 없는 명령이 되돌리기 기록만 쌓거나, 명령 하나하나는 멀쩡해도 합친 결과가 화면 스펙의 규칙을 깨뜨릴 수 있었습니다.",
    ]),
    prose("role", "내 역할", [
      "팀 설계 문서에 정의된 관문 세 개(G1·G2·G3) 중, G1(명령 배열의 형태 검사)은 다른 이슈가 맡았고 저는 G2와 G3, 그리고 커밋 경로를 구현했습니다.",
      "G2는 명령을 실제로 반영하지 않고 미리 하나씩 돌려보며 아무 변화도 없는 명령을 전부 짚어냅니다. G3는 그렇게 만들어진 결과 화면이 스펙 규칙에 맞는지 검증합니다. 둘 다 통과해야만 화면을 바꾸고 되돌리기 기록을 한 단계 쌓습니다.",
    ]),
    prose(
      "decision",
      "내가 내린 판단",
      [
        "입력의 범위가 넓어서 혼자서는 모든 경우를 예측할 수 없다고 봤습니다. 그래서 완벽하게 만든 뒤 올리기보다, \"실패는 예외로 터뜨리지 않고 정해진 형태로 돌려준다\"는 약속을 먼저 정하고 테스트와 코드 리뷰로 빈틈을 찾는 쪽을 택했습니다.",
        "미리 돌려보기를 화면 상태를 건드리지 않는 순수 함수로 만든 것도 같은 이유입니다. 판정 과정이 아무것도 바꾸지 않으니, 하나라도 걸리면 전부 버리는 전부-또는-전무 규칙을 추가 비용 없이 지킬 수 있었습니다.",
      ],
      [
        {
          id: "case.decision.why",
          label: "Note · why",
          type: "whyNote",
          content: "이 문단은 기능 설명보다 '왜 이 순서로 일했는지'를 먼저 보여주려고 넣었어요. 면접에서 가장 많이 받을 질문이 여기서 나온다고 생각했어요.",
        },
      ],
    ),
    {
      id: "case.demo",
      label: "Section · demo",
      type: "section",
      heading: "직접 보내보기",
      headingStyle: "title",
      gap: "md",
      children: [
        {
          id: "case.demo.gate",
          label: "Demo · gate-pipeline",
          type: "gateDemo",
          steps: ["페이지 확인", "G2 · 미리 돌려보기", "G3 · 결과 검증", "반영"],
          scenarios: [
            {
              key: "ok",
              button: "정상 명령",
              passedSteps: 4,
              result: "{ ok: true, screen: { … } }",
              explain: "모든 관문을 통과해서 화면을 바꾸고, 되돌리기 기록을 한 단계 쌓아요.",
            },
            {
              key: "noop",
              button: "아무 변화 없는 명령",
              passedSteps: 1,
              result: '{ ok: false, failure: { kind: "noOp", noOps: [ { index: 1, … } ] } }',
              explain: "미리 돌려보면서 아무것도 바꾸지 못하는 명령을 짚어내요. 한 번에 전부 찾아내고, 일부만 반영하지 않고 배열 전체를 버려요.",
            },
            {
              key: "invalid",
              button: "규칙을 깨는 명령",
              passedSteps: 2,
              result: '{ ok: false, failure: { kind: "invalid", issues: [ … ] } }',
              explain: "명령 하나하나는 문제없어도, 합친 결과 화면이 스펙 규칙을 어기면 G3에서 막아요.",
            },
            {
              key: "page",
              button: "지워진 페이지를 가리키는 명령",
              passedSteps: 0,
              result: '{ ok: false, failure: { kind: "pageNotFound", pageId: "…" } }',
              explain: "처음 구현에서는 이 경우 관문이 실패를 돌려주지 못하고 TypeError로 터졌어요. 리뷰에서 찾아내 같은 날 고친 바로 그 경우예요.",
            },
          ],
        },
        {
          id: "case.demo.why",
          label: "Note · why",
          type: "whyNote",
          content: "글로 설명하는 것보다, 실패가 '어느 단계에서 어떻게 거절되는지' 직접 눌러보는 편이 관문의 약속을 빨리 이해시켜요.",
        },
      ],
    },
    prose("ai", "AI와 함께 구현한 방식", [
      "Claude와 함께 구현하면서 테스트 380여 줄을 같이 작성했습니다. 관문 자체가 'AI가 낸 결과를 그대로 믿지 않는다'는 생각에서 나온 것처럼, 저도 AI가 함께 쓴 코드를 테스트와 리뷰로 검증하는 방식으로 일했습니다.",
      "[어떤 부분을 AI에 맡기고, 어떤 부분을 직접 판단·검토했는지 한두 줄]",
    ]),
    prose("result", "결과", [
      "같은 날 리뷰에서, 지워진 페이지를 가리키는 명령이 약속을 깨고 오류를 내는 경우를 찾아 pageNotFound 실패로 바꿨습니다. 실패의 종류가 늘었지만 호출하는 쪽이 받는 형태는 그대로였습니다.",
      "이 관문은 이후 팀의 자연어 화면 생성·수정 기능의 기반이 되었습니다.",
    ]),
    prose("learn", "배운 점", ["[직접 채우기]"]),
    {
      id: "case.next",
      label: "Section · next",
      type: "section",
      gap: "sm",
      children: [{ id: "case.next.home", label: "Link · home", type: "link", variant: "plain", text: "← 처음으로", href: "/" }],
    },
  ],
};
