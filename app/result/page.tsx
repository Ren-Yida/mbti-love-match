import Link from "next/link";
import { ChallengeButton } from "@/components/ChallengeButton";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { getRecommendations, isMbtiType, type MbtiType, typeProfiles } from "@/lib/mbti";
import { ArrowLeft, Heart } from "lucide-react";

type ResultPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const emotionalNeedCopy: Record<
  MbtiType,
  {
    fit: string;
    need: string;
    gap: string;
  }
> = {
  INTJ: {
    fit: "你现在更需要一个能给关系方向感的人，而不是只给情绪热度的人。这个类型会让你感到被认真对待，也更容易把暧昧落到现实计划里。",
    need: "确定性、长期规划、清晰边界",
    gap: "可能会让你觉得关系太像项目推进，浪漫感和情绪流动不够。"
  },
  INTP: {
    fit: "你现在更需要能尊重你思考空间的人。这个类型不会急着把关系定型，反而更容易让你在舒服的节奏里慢慢靠近。",
    need: "空间感、思想交流、低压相处",
    gap: "可能因为表达太含蓄，让关系推进显得不够明确。"
  },
  ENTJ: {
    fit: "你现在更需要一个能和你一起往前走的人。这个类型能接住你的行动力，也能让关系更快进入清晰、稳定的节奏。",
    need: "目标一致、稳定推进、强执行力",
    gap: "可能会带来压迫感，让情绪比较细腻的人觉得不够柔软。"
  },
  ENTP: {
    fit: "你现在更需要关系里有火花和新鲜感。这个类型能激发你的表达欲，让相处不只是安全，还能持续有趣。",
    need: "脑力火花、新鲜感、轻松互动",
    gap: "可能稳定感不足，容易让需要确定性的人感到忽冷忽热。"
  },
  INFJ: {
    fit: "你现在更需要被真正理解，而不是被表面哄好。这个类型更容易进入你的深层情绪，也愿意认真对待关系里的隐性需求。",
    need: "深度共鸣、情绪理解、长期信任",
    gap: "可能太敏感或想太多，关系里容易出现过度解读。"
  },
  INFP: {
    fit: "你现在更需要温柔、允许和被看见。这个类型更能接住你的理想感，也不太会把你的慢热当成麻烦。",
    need: "温柔回应、情绪安全、浪漫想象",
    gap: "可能现实推进不足，让关系停留在感觉里。"
  },
  ENFJ: {
    fit: "你现在更需要被积极回应和认真照顾。这个类型会主动经营关系温度，也更容易让你感到自己是被选择的。",
    need: "明确回应、情绪照顾、关系经营",
    gap: "可能照顾感太强，让你在关系里有一点被安排的压力。"
  },
  ENFP: {
    fit: "你现在更需要轻盈、热烈和重新心动。这个类型能把你从内耗里带出来，让关系重新有期待感和生命力。",
    need: "热情表达、自由感、心动体验",
    gap: "可能节奏太跳跃，让需要稳定承诺的人不够安心。"
  },
  ISTJ: {
    fit: "你现在更需要可靠和可落地的安全感。这个类型会用持续行动表达在意，让你少猜一点，多确定一点。",
    need: "稳定陪伴、责任感、现实安全",
    gap: "可能表达不够热烈，容易让你觉得缺少情绪确认。"
  },
  ISFJ: {
    fit: "你现在更需要细节里的照顾和安稳。这个类型会在日常里给你被惦记的感觉，适合想慢慢修复安全感的状态。",
    need: "细节照顾、安稳陪伴、温柔确认",
    gap: "可能太迁就或太谨慎，冲突时不够直接。"
  },
  ESTJ: {
    fit: "你现在更需要一个说到做到的人。这个类型会把关系中的责任、时间和承诺讲清楚，减少暧昧里的不确定。",
    need: "责任落地、清晰承诺、现实推进",
    gap: "可能显得强势，情绪表达不够柔和。"
  },
  ESFJ: {
    fit: "你现在更需要被放在心上的感觉。这个类型擅长把关系经营得有温度，也会用互动和仪式感确认彼此的位置。",
    need: "陪伴感、仪式感、外显关心",
    gap: "可能太依赖互动频率，让需要独处的人觉得负担。"
  },
  ISTP: {
    fit: "你现在更需要轻松、有边界的关系。这个类型不会过度追问，也能用实际行动给你一种不黏腻的稳定。",
    need: "边界感、松弛感、行动表达",
    gap: "可能情绪表达太少，让你不确定对方到底有多在意。"
  },
  ISFP: {
    fit: "你现在更需要柔软、审美和低压的靠近。这个类型能让关系保持舒服的温度，不会急着定义你的每一种感受。",
    need: "柔软陪伴、感受共鸣、低压靠近",
    gap: "可能不够主动，重要节点上容易显得犹豫。"
  },
  ESTP: {
    fit: "你现在更需要一个能把你拉回当下的人。这个类型会带来直接、鲜活的互动，让你少一点反复猜测，多一点真实体验。",
    need: "直接回应、当下体验、行动火花",
    gap: "可能太重即时感，长期规划和情绪复盘不一定充足。"
  },
  ESFP: {
    fit: "你现在更需要明亮的陪伴和直接的喜欢。这个类型会把爱意表达得更外放，也更容易让你从关系里获得快乐和确认。",
    need: "快乐陪伴、直接表达、被偏爱的感觉",
    gap: "可能太看重当下氛围，深层问题容易被暂时带过。"
  }
};

function buildResultInsight(match: MbtiType, alternatives: MbtiType[]) {
  const matchCopy = emotionalNeedCopy[match];

  return {
    need: matchCopy.need,
    fit: matchCopy.fit,
    alternatives: alternatives.map((type) => ({
      type,
      title: typeProfiles[type].title,
      gap: emotionalNeedCopy[type].gap
    }))
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const requestedSelfType = params.self ?? null;
  const legacyType = params.type ?? null;
  const selfType = isMbtiType(requestedSelfType) ? requestedSelfType : isMbtiType(legacyType) ? legacyType : "INFJ";
  const candidates = getRecommendations(selfType);
  const requestedMatch = params.match ?? null;
  const match = isMbtiType(requestedMatch) && candidates.includes(requestedMatch) ? requestedMatch : candidates[0];
  const scores = candidates.map((candidate) => ({
    type: candidate,
    score: Number(params[candidate] ?? 0)
  }));
  const alternatives = scores
    .filter((item) => item.type !== match)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.type);
  const insight = buildResultInsight(match, alternatives);

  return (
    <ChallengeFrame>
      <Link
        href={`/${selfType.toLowerCase()}`}
        className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#147f95]/20 bg-[#147f95]/8 text-[#147f95]">
        <Heart size={28} />
      </div>
      <p className="text-sm font-bold text-[#147f95]">测试结果</p>
      <h1 className="mt-3 text-5xl font-black leading-tight">
        目前你的情感需求更适合 {match}
      </h1>
      <p className="mt-4 text-base leading-7 text-[#4a5d75]">
        你当前更需要的是：{insight.need}。{match} 的相处模式更容易贴近你现在的关系状态。
      </p>

      <div className="mt-6 rounded-[24px] border border-[#b7c7df]/70 bg-white/58 p-5">
        <p className="text-sm font-bold text-[#147f95]">为什么目前更适合 {match}</p>
        <p className="mt-3 text-sm leading-7 text-[#4a5d75]">
          {insight.fit}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {insight.alternatives.map((item) => (
          <div key={item.type} className="rounded-[20px] border border-[#b7c7df]/70 bg-white/52 p-4">
            <p className="text-sm font-bold text-[#5d6f86]">为什么不是 {item.type}</p>
            <p className="mt-2 text-lg font-black">{item.title}</p>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{item.gap}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <ChallengeButton href={`/${selfType.toLowerCase()}`}>重新测试</ChallengeButton>
        <Link href="/test" className="block text-center text-sm text-[#4a5d75] hover:text-[#147f95]">
          返回全部 MBTI 测试
        </Link>
      </div>

      <p className="mt-6 rounded-[18px] border border-[#b7c7df]/70 bg-white/45 p-4 text-xs leading-6 text-[#5d6f86]">
        本测试仅供娱乐和自我了解参考，不构成专业心理测评或关系建议。所谓官配只是内容钩子，现实关系仍取决于尊重、沟通和边界。
      </p>
    </ChallengeFrame>
  );
}
