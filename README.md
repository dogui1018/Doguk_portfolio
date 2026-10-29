# 도국 포트폴리오

> 무엇을 왜 만들지 고민하고, AI와 함께 빠르게 구현하는 프론트엔드 개발자

평소에는 읽기 편한 두 단 구성의 포트폴리오지만, **"이 페이지 뜯어보기"** 스위치를 켜면 화면의 각 요소가 어떤 스펙으로 짜여 있는지 드러납니다.

## 핵심 아이디어: 화면보다 스펙이 먼저

이 사이트의 내용은 컴포넌트 안에 직접 쓰지 않고 `src/spec/pages/*.ts`에 **스펙 데이터**로 먼저 정의합니다. 렌더러는 그 스펙을 읽어 화면을 그리고, 뜯어보기 패널은 **같은 스펙 객체를 그대로** 보여줍니다. 패널에 보이는 JSON은 예시가 아니라 실제로 화면을 그린 데이터입니다.

```
src/
├─ spec/
│  ├─ types.ts              스펙 노드 타입 (text, heading, workCard, reviewStamp …)
│  ├─ pages/home.ts         홈 화면 스펙 — 내용을 고칠 때는 여기만 수정
│  └─ render/
│     ├─ PageView.tsx       두 단 레이아웃
│     ├─ SpecRenderer.tsx   노드 타입 → 컴포넌트 디스패처
│     └─ ReviewStamp.tsx    "리뷰 8번" 장난감
├─ inspect/
│  ├─ store.ts              뜯어보기 상태 (Zustand)
│  ├─ InspectFrame.tsx      요소 테두리·이름표
│  ├─ InspectToggle.tsx     뜯어보기 스위치
│  ├─ InspectShift.tsx      패널이 열리면 본문이 비켜서기
│  └─ SpecPanel.tsx         레이어 목록 + 스펙 JSON (모바일은 아래 시트)
└─ app/                     Next.js App Router
```

## 기술 스택

- Next.js (App Router) · TypeScript
- Panda CSS — 디자인 토큰은 `panda.config.ts`
- Zustand — 뜯어보기 상태
- 폰트는 `@fontsource`로 직접 호스팅 (IBM Plex Sans KR, JetBrains Mono)

## 실행

```bash
npm install      # 설치 후 panda codegen이 자동 실행됩니다
npm run dev
npm run build
npm run typecheck
npm run lint
```

## 원칙

- **모션은 의미 있는 순간에만.** 운영체제의 "동작 줄이기"를 켜면 모든 전환이 즉시 끝납니다.
- **보이는 건 전부 동작한다.** 장식용 가짜 버튼을 두지 않습니다.
- **상태별 스타일은 `css(a, cond && b)`로 병합한다.** Panda는 속성마다 클래스를 만들기 때문에 `cx`로 겹치면 스타일시트 순서가 이기는 쪽을 정해버립니다.

## 채워야 할 자리

- [ ] 작업 중인 사진 (`intro.photo`)
- [ ] 직접 쓰는 소개 한두 줄 (`about.personal`)
- [ ] Visual Spec Builder 화면 녹화 (`work.vsb.media`, `lab.*`)
- [ ] 케이스 스터디 페이지를 스펙으로 옮기기 (`/work/visual-spec-builder`)
- [ ] 이 사이트 제작기
