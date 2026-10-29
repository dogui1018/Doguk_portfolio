import type { Metadata } from "next";
// 폰트는 npm 패키지로 직접 호스팅한다. 한글 글리프가 unicode-range 단위로 나뉘어 있어 필요한 조각만 내려받는다.
import "@fontsource/ibm-plex-sans-kr/400.css";
import "@fontsource/ibm-plex-sans-kr/500.css";
import "@fontsource/ibm-plex-sans-kr/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "도국 — 프론트엔드 개발자",
  description: "무엇을 왜 만들지 고민하고, AI와 함께 빠르게 구현하는 프론트엔드 개발자 도국의 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
