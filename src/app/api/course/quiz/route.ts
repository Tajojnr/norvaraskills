import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type StudentResult =
  | { client: SupabaseClient; user: User; error?: never }
  | { client?: never; user?: never; error: NextResponse };

function parseQuiz(value: unknown): QuizQuestion[] | null {
  if (!Array.isArray(value)) return null;
  const questions: QuizQuestion[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") return null;
    const question = entry as Record<string, unknown>;
    if (
      typeof question.question !== "string" ||
      !Array.isArray(question.options) ||
      question.options.length < 2 ||
      !question.options.every((option) => typeof option === "string") ||
      !Number.isInteger(question.answer) ||
      Number(question.answer) < 0 ||
      Number(question.answer) >= question.options.length ||
      (question.explanation !== undefined && typeof question.explanation !== "string")
    ) return null;
    questions.push({
      question: question.question,
      options: question.options,
      answer: Number(question.answer),
      explanation: typeof question.explanation === "string" ? question.explanation : undefined,
    });
  }
  return questions;
}

async function getStudentClient(req: NextRequest): Promise<StudentResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const token = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!url || !anonKey) {
    return { error: NextResponse.json({ error: "Course services are not configured." }, { status: 500 }) };
  }
  if (!token) {
    return { error: NextResponse.json({ error: "Sign in is required." }, { status: 401 }) };
  }

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error } = await client.auth.getUser(token);
  if (error || !user) {
    return { error: NextResponse.json({ error: "Your session is invalid. Sign in again." }, { status: 401 }) };
  }
  return { client, user };
}

async function readQuiz(client: SupabaseClient, lessonId: string) {
  const { data, error } = await client.from("content_items")
    .select("quiz")
    .eq("id", lessonId)
    .eq("kind", "video")
    .maybeSingle();
  if (error) return { response: NextResponse.json({ error: error.message }, { status: 500 }) };
  if (!data) return { response: NextResponse.json({ error: "Lesson not found or access denied." }, { status: 404 }) };
  const questions = parseQuiz(data.quiz);
  if (!questions) return { response: NextResponse.json({ error: "This lesson's quiz is not configured correctly." }, { status: 500 }) };
  return { questions };
}

export async function GET(req: NextRequest) {
  const auth = await getStudentClient(req);
  if (!auth.client) return auth.error;
  const lessonId = new URL(req.url).searchParams.get("lesson");
  if (!lessonId || !UUID_PATTERN.test(lessonId)) {
    return NextResponse.json({ error: "A valid lesson is required." }, { status: 400 });
  }

  const result = await readQuiz(auth.client, lessonId);
  if (result.response) return result.response;
  return NextResponse.json({
    questions: result.questions.map(({ question, options, explanation }) => ({ question, options, explanation })),
  });
}

export async function POST(req: NextRequest) {
  const auth = await getStudentClient(req);
  if (!auth.client) return auth.error;

  let body: { lessonId?: unknown; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof body.lessonId !== "string" || !UUID_PATTERN.test(body.lessonId) || !Array.isArray(body.answers) || !body.answers.every(Number.isInteger)) {
    return NextResponse.json({ error: "Quiz answers are invalid." }, { status: 400 });
  }

  const answers = body.answers as number[];
  const quiz = await readQuiz(auth.client, body.lessonId);
  if (quiz.response) return quiz.response;
  if (!quiz.questions.length || answers.length !== quiz.questions.length ||
      answers.some((answer, index) => !Number.isInteger(answer) || answer < 0 || answer >= quiz.questions[index].options.length)) {
    return NextResponse.json({ error: "Answer every quiz question before submitting." }, { status: 400 });
  }

  const score = quiz.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const { error } = await auth.client.from("content_quiz_attempts").insert({
    user_id: auth.user.id,
    item_id: body.lessonId,
    score,
    total: quiz.questions.length,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    score,
    total: quiz.questions.length,
    review: quiz.questions.map((question, index) => ({
      correct: answers[index] === question.answer,
      correctAnswer: question.options[question.answer],
      explanation: question.explanation ?? "",
    })),
  });
}
