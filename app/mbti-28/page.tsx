import { MbtiPersonalityRunner } from "@/components/MbtiPersonalityRunner";
import { personalityTests } from "@/lib/mbti";

export default function Mbti28Page() {
  return <MbtiPersonalityRunner test={personalityTests["mbti-28"]} />;
}
