import { MbtiPersonalityRunner } from "@/components/MbtiPersonalityRunner";
import { personalityTests } from "@/lib/mbti";

export default function Mbti93Page() {
  return <MbtiPersonalityRunner test={personalityTests["mbti-93"]} />;
}
