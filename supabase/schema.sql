create extension if not exists "pgcrypto";

create table if not exists public.mbti_test_results (
  id uuid primary key default gen_random_uuid(),
  test_type text,
  self_type text,
  answers jsonb not null,
  result text not null,
  score_detail jsonb not null,
  created_at timestamptz not null default now(),
  user_agent text,
  referrer text
);

create index if not exists mbti_test_results_created_at_idx
  on public.mbti_test_results (created_at desc);

create index if not exists mbti_test_results_test_type_idx
  on public.mbti_test_results (test_type);

create index if not exists mbti_test_results_result_idx
  on public.mbti_test_results (result);

alter table public.mbti_test_results enable row level security;

-- No public insert/select policy is created on purpose.
-- The app writes through /api/submit-result with SUPABASE_SERVICE_ROLE_KEY on the server only.
