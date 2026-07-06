import { describe, expect, it } from "vitest";
import {
  getCompatibilityTest,
  getRecommendations,
  mbtiQuestions,
  personalityTests,
  scoreCompatibilityTest,
  scoreMbti,
  type MbtiAnswerValue
} from "../lib/mbti";

describe("mbti scoring", () => {
  it("scores answers into a four-letter MBTI type", () => {
    const answers: Record<string, MbtiAnswerValue> = Object.fromEntries(
      mbtiQuestions.map((question) => [question.id, question.options[0].value ?? "X"])
    ) as Record<string, MbtiAnswerValue>;

    expect(scoreMbti(answers)).toBe("ESTJ");
  });

  it("returns four recommendation types", () => {
    const recommendations = getRecommendations("INFP");

    expect(recommendations).toHaveLength(4);
    expect(recommendations).toContain("ENFJ");
  });

  it("builds a 15-question compatibility test for each MBTI type", () => {
    const test = getCompatibilityTest("INFJ");

    expect(test.questions).toHaveLength(15);
    expect(test.candidates).toEqual(["ENTP", "ENFP", "INTJ", "ENFJ"]);
    expect(test.questions[0].options).toHaveLength(4);
    expect(test.questions[0].options.map((option) => option.value)).toEqual(["ENTP", "ENFP", "INTJ", "ENFJ"]);
    expect(test.questions[1].options.map((option) => option.value)).toEqual(["INTJ", "ENFJ", "ENTP", "ENFP"]);
  });

  it("loads imported 28 and 93 question files", () => {
    expect(personalityTests["mbti-28"].questions).toHaveLength(28);
    expect(personalityTests["mbti-93"].questions).toHaveLength(93);
  });

  it("scores compatibility answers into a partner type", () => {
    const test = getCompatibilityTest("INFJ");
    const answers = Object.fromEntries(test.questions.map((question) => [question.id, "ENFP" as const]));

    expect(scoreCompatibilityTest("INFJ", answers).match).toBe("ENFP");
  });
});
