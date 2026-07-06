# MBTI 恋爱匹配测评 MVP

一个基于 Next.js App Router、TypeScript 和 Tailwind CSS 的前后端一体化 MVP。客户可见部分聚焦 MBTI 快速测试、MBTI 完整测试和官配适配测试；内容营销、商品运营、审查逻辑保留为内部模块，方便后续扩展 Supabase、支付和内容管理后台。

## 功能模块

- `Product Builder Agent`：客户可见的首页、MBTI 快速测试、MBTI 完整测试、15 题官配适配测试、结果页。
- `Content Marketing Agent`：内部使用的小红书原创标题、正文、封面文案、选题库生成。
- `Store Operation Agent`：内部使用的商品标题、痛点、卖点、详情页文案、CTA、FAQ。
- `Review Officer Agent`：内部使用的测试完整性、内容吸引力、转化逻辑、合规风险 checklist。

## 页面

- `/` 首页，对外展示 3 个测试入口
- `/mbti-28` MBTI 快速测试
- `/mbti-93` MBTI 完整测试
- `/mbti-result` MBTI 人格测试结果页
- `/mbti-about` MBTI 说明页
- `/test` 16 型人格官配测试大纲
- `/test/[type]` 某个 MBTI 的 15 题官配适配测试，例如 `/test/infj`
- `/[type]` 某个 MBTI 的 15 题官配适配测试，例如 `/infj`
- `/result` 官配测试结果页
- `/api/submit-result` 服务端保存测试结果 API

## 运行方式

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:3000`。

## Supabase 数据库

在 Supabase SQL Editor 执行：

```sql
-- 文件路径：supabase/schema.sql
```

该 SQL 会创建 `public.mbti_test_results` 表，保存：

- `answers`：用户每题选择的答案
- `result`：最终 MBTI 或官配结果
- `score_detail`：各维度或候选得分
- `created_at`：提交时间
- `user_agent`：浏览器信息
- `referrer`：来源页面

表已启用 RLS，并且没有创建公开写入策略。前端不直接写 Supabase，只调用 `/api/submit-result`，由服务端使用 `SUPABASE_SERVICE_ROLE_KEY` 写入。

## 环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

填写：

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_RESULTS_TABLE=mbti_test_results
```

注意：`SUPABASE_SERVICE_ROLE_KEY` 只能放在服务端环境变量里，不要使用 `NEXT_PUBLIC_` 前缀，也不要写进前端代码。

## Vercel 部署

1. 将项目推送到 GitHub。
2. 在 Supabase 新建项目。
3. 打开 Supabase SQL Editor，执行 `supabase/schema.sql`。
4. 在 Supabase Project Settings → API 中复制：
   - Project URL → `SUPABASE_URL`
   - service_role secret → `SUPABASE_SERVICE_ROLE_KEY`
5. 在 Vercel 新建项目并导入 GitHub 仓库。
6. Vercel Framework Preset 选择 `Next.js`。
7. Build Command 使用默认的 `pnpm build`，对应 `package.json` 里的 `"build": "next build"`，适合 Vercel。
8. Install Command 使用默认 `pnpm install`。
9. 在 Vercel Project Settings → Environment Variables 添加：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_RESULTS_TABLE`
10. 点击 Deploy。
11. 部署完成后，在线访问首页，完成一次测试。
12. 回到 Supabase Table Editor，检查 `mbti_test_results` 是否出现新数据。

## 测试

```bash
pnpm test
```

测试覆盖：

- MBTI 计分函数
- MBTI 推荐函数
- 28 题/93 题题库加载
- 15 题官配适配测试生成和计分函数
- Review Officer 合规审查函数

## 项目结构

```text
app/
  page.tsx                    首页
  mbti-28/page.tsx            MBTI 快速测试
  mbti-93/page.tsx            MBTI 完整测试
  mbti-result/page.tsx        MBTI 测试结果页
  mbti-about/page.tsx         MBTI 说明页
  api/submit-result/route.ts  保存测试结果 API
  test/page.tsx               16 型官配测试大纲
  test/[type]/page.tsx        单个 MBTI 官配测试页
  [type]/page.tsx             短链接官配测试页
  result/page.tsx             官配测试结果页
components/
  AgentBadge.tsx
  GeneratorResult.tsx
  PageShell.tsx
  PrimaryButton.tsx
  SiteNav.tsx
  SoftCard.tsx
lib/
  mbti.ts
  agents/
    contentAgent.ts
    storeAgent.ts
    reviewAgent.ts
tests/
  mbti.test.ts
  reviewAgent.test.ts
supabase/
  schema.sql
```

## 合规说明

- “官配”仅作为内容钩子和娱乐化表达，不代表科学确定性。
- MBTI 匹配仅作为娱乐和自我了解参考，不宣称科学确定性。
- 结果页明确提示不构成专业心理测评或关系建议。
- 小红书内容生成器只生成原创文案，不爬取或复制真实平台内容。
- 商品页文案避免“保证脱单”“百分百匹配”等绝对化表达。
