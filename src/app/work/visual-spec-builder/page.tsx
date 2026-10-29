import type { Metadata } from "next";
import { PageView } from "@/spec/render/PageView";
import { caseGateSpec } from "@/spec/pages/caseGate";

export const metadata: Metadata = {
  title: `${caseGateSpec.title} — 도국`,
  description: "Visual Spec Builder에서 AI가 만든 명령을 반영 전에 걸러내는 관문을 구현한 이야기",
};

export default function VisualSpecBuilderCase() {
  return <PageView page={caseGateSpec} />;
}
