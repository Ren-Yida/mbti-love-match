import { notFound } from "next/navigation";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { getCompatibilityTest, isMbtiType } from "@/lib/mbti";
import { TestRunner } from "./TestRunner";

type CompatibilityTestPageProps = {
  params: Promise<{ type: string }>;
};

export default async function CompatibilityTestPage({ params }: CompatibilityTestPageProps) {
  const { type } = await params;
  const normalizedType = type.toUpperCase();

  if (!isMbtiType(normalizedType)) {
    notFound();
  }

  const test = getCompatibilityTest(normalizedType);

  return (
    <ChallengeFrame className="my-12">
      <TestRunner test={test} />
    </ChallengeFrame>
  );
}
