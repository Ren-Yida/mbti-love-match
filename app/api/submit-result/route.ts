import { NextRequest, NextResponse } from "next/server";

type SubmitResultPayload = {
  test_type?: string;
  self_type?: string;
  answers?: unknown;
  result?: string;
  score_detail?: unknown;
  referrer?: string;
};

const tableName = process.env.SUPABASE_RESULTS_TABLE || "mbti_test_results";

function hasRequiredPayload(payload: SubmitResultPayload) {
  return Boolean(payload.answers && typeof payload.result === "string" && payload.score_detail);
}

export async function POST(request: NextRequest) {
  let payload: SubmitResultPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!hasRequiredPayload(payload)) {
    return NextResponse.json(
      { error: "answers, result and score_detail are required" },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase server environment variables are not configured" },
      { status: 503 }
    );
  }

  const row = {
    test_type: payload.test_type ?? null,
    self_type: payload.self_type ?? null,
    answers: payload.answers,
    result: payload.result,
    score_detail: payload.score_detail,
    created_at: new Date().toISOString(),
    user_agent: request.headers.get("user-agent"),
    referrer: payload.referrer || request.headers.get("referer")
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    const message = await response.text();

    return NextResponse.json(
      { error: "Failed to save result", detail: message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
