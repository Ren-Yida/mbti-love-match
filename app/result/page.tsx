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

const emotionalNeedDetailCopy: Record<
  MbtiType,
  {
    whyNow: string;
    relationshipFeel: string;
    reminder: string;
    gapDetail: string;
  }
> = {
  INTJ: {
    whyNow: "如果你最近对关系的模糊、试探和反复拉扯感到疲惫，INTJ 式的稳定规划会让你更快看见关系是否值得继续投入。",
    relationshipFeel: "和这个类型靠近时，你会更容易感到被认真评估、被放进未来，而不是只停留在短暂情绪里。",
    reminder: "但你也需要给关系留一点柔软空间，不必把每一次互动都变成结论和判断。",
    gapDetail: "当你此刻更需要轻松陪伴或情绪安抚时，INTJ 的理性和规划感可能显得偏冷，容易让你觉得对方懂道理但不够会哄人。"
  },
  INTP: {
    whyNow: "如果你现在不想被关系催促，也不想太快进入承诺压力，INTP 式的低压相处会让你保留思考和观察空间。",
    relationshipFeel: "这个类型会让互动更像慢慢展开的对话，你不用急着表现，也不用一直解释自己的安静。",
    reminder: "适合不等于完全不用表达，你仍然需要在关键时刻说清期待，避免关系一直停在暧昧舒适区。",
    gapDetail: "当你当前更想要明确偏爱、快速推进或高频回应时，INTP 的慢热和含蓄可能会放大你的不确定感。"
  },
  ENTJ: {
    whyNow: "如果你现在希望关系更有方向、更少消耗，ENTJ 式的行动力会把模糊的问题拉回现实层面。",
    relationshipFeel: "和这个类型相处，你会更容易看到对方愿不愿意投入时间、责任和长期计划。",
    reminder: "你需要确认对方的强势是在承担关系，而不是替你做决定；边界感依然很重要。",
    gapDetail: "当你此刻更需要被温柔理解、慢慢确认感受时，ENTJ 的直接推进可能让你觉得节奏太快、情绪没有被充分接住。"
  },
  ENTP: {
    whyNow: "如果你最近觉得关系太闷、太像任务，ENTP 式的火花会重新激活你的表达欲和好奇心。",
    relationshipFeel: "这个类型容易带来有趣、会接梗、能互相启发的互动，让喜欢不只是安全，还带一点上头感。",
    reminder: "你需要分辨新鲜感和稳定投入，不要只因为聊得来就忽略对方是否真的愿意落地。",
    gapDetail: "当你现在更想要确定承诺、清晰边界和稳定陪伴时，ENTP 的跳跃感可能会让你一边心动一边不安心。"
  },
  INFJ: {
    whyNow: "如果你现在更在意被理解、被看见，而不是表面热闹，INFJ 式的深度共鸣会更贴近你的情绪需求。",
    relationshipFeel: "这个类型通常会认真捕捉你的潜台词，也愿意讨论关系里的意义、信任和长期感。",
    reminder: "深度理解不等于读心成功，关系里仍然需要直接表达，不要让猜测替代沟通。",
    gapDetail: "当你此刻更需要轻松、直接和少一点情绪分析时，INFJ 的敏感与深挖可能让关系显得有些重。"
  },
  INFP: {
    whyNow: "如果你最近很需要被温柔对待，INFP 式的接纳感会让你不必急着变成更强、更正确的人。",
    relationshipFeel: "这个类型会让关系保留浪漫、想象和情绪安全，你的慢热和脆弱也更容易被理解。",
    reminder: "你需要把感受慢慢落到具体需求上，否则两个人可能都很温柔，却不知道下一步怎么走。",
    gapDetail: "当你现在更需要现实推进、明确承诺和问题解决时，INFP 的理想感可能让关系停留在感觉很好但行动不足。"
  },
  ENFJ: {
    whyNow: "如果你现在很需要确认自己是被选择的，ENFJ 式的主动回应和关系经营会给你更强的被在意感。",
    relationshipFeel: "这个类型容易主动照顾氛围，也会把喜欢表达出来，让你少一些反复猜测。",
    reminder: "你需要确认这份照顾是否让你舒服，而不是为了维持和谐而忽略自己的真实节奏。",
    gapDetail: "当你此刻更需要空间、独立感或不被安排的自由时，ENFJ 的照顾和推进可能会变成一种温柔压力。"
  },
  ENFP: {
    whyNow: "如果你最近被内耗困住，ENFP 式的热烈和生命力会把你带回更轻盈、更敢期待的状态。",
    relationshipFeel: "这个类型会让互动更有分享欲、心动感和自由感，你会更容易重新相信关系可以很好玩。",
    reminder: "你需要观察热情是否能持续到日常里，不要只被当下氛围带着走。",
    gapDetail: "当你现在更需要稳定节奏、清晰承诺和长期安全感时，ENFP 的跳跃和自由感可能让你觉得落点不够。"
  },
  ISTJ: {
    whyNow: "如果你现在最缺的是安心和可靠，ISTJ 式的持续行动会比漂亮话更能让你稳定下来。",
    relationshipFeel: "这个类型通常会用守时、负责、记得细节来表达在意，让关系变得更可预期。",
    reminder: "你也需要主动提出情绪需求，不要只用对方做了什么来判断对方有多爱。",
    gapDetail: "当你此刻更需要热烈表达、浪漫惊喜和高频情绪确认时，ISTJ 的稳可能会被你感受成不够心动。"
  },
  ISFJ: {
    whyNow: "如果你最近需要慢慢修复安全感，ISFJ 式的细节照顾会让你在日常里感到被惦记。",
    relationshipFeel: "这个类型会把喜欢藏在稳定陪伴和实际照顾里，适合想要温柔落地关系的人。",
    reminder: "你需要鼓励彼此把不舒服说出来，避免为了维持平和而积累委屈。",
    gapDetail: "当你现在需要直接冲突处理、快速决策或更强的关系推进时，ISFJ 的谨慎可能显得不够果断。"
  },
  ESTJ: {
    whyNow: "如果你讨厌暧昧里的不确定，ESTJ 式的清晰承诺和现实推进会让关系更快有边界。",
    relationshipFeel: "这个类型会把时间、责任和实际安排说清楚，让你知道关系不是只靠感觉维持。",
    reminder: "你需要判断对方是在给安全感，还是在用规则压缩你的感受空间。",
    gapDetail: "当你此刻更需要情绪柔软、被慢慢理解时，ESTJ 的直接和标准感可能会让你觉得不够细腻。"
  },
  ESFJ: {
    whyNow: "如果你现在很需要被放在心上，ESFJ 式的外显关心和仪式感会让关系更有存在感。",
    relationshipFeel: "这个类型擅长经营互动频率、生活细节和社交氛围，你会更容易感到被公开地重视。",
    reminder: "你需要确认高频互动是否真的适合你，而不是因为被照顾就忽略自己的独处需求。",
    gapDetail: "当你现在更想要低压、独立和少一点情绪绑定时，ESFJ 的热络可能会让你觉得关系密度过高。"
  },
  ISTP: {
    whyNow: "如果你最近不想被过度追问，ISTP 式的松弛和边界感会让关系不那么黏腻。",
    relationshipFeel: "这个类型会用行动解决问题，也更尊重彼此的个人空间，适合想轻一点相处的阶段。",
    reminder: "你需要在关键问题上主动确认对方态度，否则太松弛也可能变成不确定。",
    gapDetail: "当你此刻更需要情绪表达、语言确认和深度沟通时，ISTP 的少说多做可能让你觉得摸不准对方。"
  },
  ISFP: {
    whyNow: "如果你现在想要舒服、自然、不被逼迫的靠近，ISFP 式的柔软会让关系保持刚好的温度。",
    relationshipFeel: "这个类型更重视感受、审美和当下体验，你会更容易在低压互动里慢慢放松。",
    reminder: "你需要把重要期待说出来，不要只等氛围自然发展到某个答案。",
    gapDetail: "当你现在更需要明确选择、主动推进和现实规划时，ISFP 的顺其自然可能会让你等得有点累。"
  },
  ESTP: {
    whyNow: "如果你最近想从反复分析里出来，ESTP 式的直接和当下体验会让关系变得更真实、更有行动感。",
    relationshipFeel: "这个类型会带来鲜活互动和即时反馈，让你少一点猜测，多一点实际相处中的确认。",
    reminder: "你需要观察对方是否愿意处理长期问题，不要把短期开心误认为长期适配。",
    gapDetail: "当你此刻更需要深度复盘、长期规划和稳定情绪照顾时，ESTP 的当下感可能显得不够细。"
  },
  ESFP: {
    whyNow: "如果你现在需要快乐、偏爱和明亮陪伴，ESFP 式的外放表达会让关系更有热度。",
    relationshipFeel: "这个类型容易把喜欢变成具体互动、约会和氛围，你会更快感到自己是被喜欢着的。",
    reminder: "你需要在开心之外确认价值观和长期节奏，避免重要问题被好氛围暂时盖过去。",
    gapDetail: "当你现在更需要深层讨论、稳定规划和问题沉淀时，ESFP 的轻快可能让你觉得不够深入。"
  }
};

function buildResultInsight(match: MbtiType, alternatives: MbtiType[]) {
  const matchCopy = emotionalNeedCopy[match];
  const matchDetail = emotionalNeedDetailCopy[match];

  return {
    need: matchCopy.need,
    fit: matchCopy.fit,
    whyNow: matchDetail.whyNow,
    relationshipFeel: matchDetail.relationshipFeel,
    reminder: matchDetail.reminder,
    alternatives: alternatives.map((type) => ({
      type,
      title: typeProfiles[type].title,
      gap: emotionalNeedCopy[type].gap,
      gapDetail: emotionalNeedDetailCopy[type].gapDetail
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
        <p className="mt-3 text-sm leading-7 text-[#4a5d75]">
          {insight.whyNow}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-[18px] bg-[#eef7ff]/70 p-4">
            <p className="text-xs font-bold text-[#147f95]">相处时你可能会感受到</p>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{insight.relationshipFeel}</p>
          </div>
          <div className="rounded-[18px] bg-white/70 p-4">
            <p className="text-xs font-bold text-[#147f95]">需要留意的一点</p>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{insight.reminder}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <p className="rounded-[18px] border border-[#b7c7df]/70 bg-white/45 p-4 text-xs leading-6 text-[#5d6f86]">
          下面的分析不是在否定其他类型，而是帮你区分：从这次答题状态看，哪些关系模式可能没有那么贴近你此刻的情感需求。
        </p>
        {insight.alternatives.map((item) => (
          <div key={item.type} className="rounded-[20px] border border-[#b7c7df]/70 bg-white/52 p-4">
            <p className="text-sm font-bold text-[#5d6f86]">为什么目前不是 {item.type}</p>
            <p className="mt-2 text-lg font-black">{item.title}</p>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{item.gap}</p>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{item.gapDetail}</p>
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
