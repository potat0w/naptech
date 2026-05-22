import { env, geminiConfigured } from "../config/env.js";

const CARE_REPORT_PROMPT = `You are an AI care report assistant for a UK domiciliary care agency.

Transform messy caregiver visit notes into professional care documentation.

Rules:
- Keep the original meaning and important details only from the notes.
- Never invent medical information, incidents, symptoms, or treatments.
- Preserve mood, behavior, aggression, confusion, pain, dizziness, poor appetite, distress, safety issues, meals, hydration, mobility, medication, cleaning, and chores when mentioned.
- Do NOT copy caregiver notes verbatim. Rewrite with correct grammar, spelling, and professional clinical tone.
- Combine related actions into natural, complete sentences — not random fragments or semicolon lists.
- Avoid robotic filler such as "visit completed without incident" unless the notes explicitly say so.
- Clinical Summary must be a short rewritten overview in proper English (2–4 sentences max).
- Timeline must be 2–6 numbered items, each a clear complete sentence starting with a past-tense care action.
- Follow-up: one brief line only if the notes imply monitoring or escalation; otherwise write "Continue routine monitoring per care plan."
- Return plain text only. No markdown, no bullet symbols, no code fences.

Use exactly this structure:

Clinical Summary
[rewritten summary]

Timeline
1. [first activity]
2. [second activity]

Follow-up
[one line]`;

const GEMINI_MODEL_FALLBACKS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];

function parseActivities(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized
    .split(/(?:\n+|;|\s*,\s*|\s+and\s+|\s+like\s+|\s+also\s+)/i)
    .map((p) => p.trim())
    .filter(Boolean);
}

function fixSpelling(text: string): string {
  return text
    .replace(/\bconfusd\b/gi, "confused")
    .replace(/\bagressiv\b/gi, "aggressive")
    .replace(/\bmeds?\b/gi, "medication")
    .replace(/\bhydrat\b/gi, "hydration");
}

function rewriteActivity(fragment: string): string | null {
  let s = fixSpelling(fragment.trim().replace(/^like\s+/i, "").replace(/^i\s+/i, ""));
  if (!s) return null;

  const moodOnly = s.match(/^(?:he|she|they|client)?\s*was\s+(confused|agitated|anxious|upset|calm)\s*(today)?\.?$/i);
  if (moodOnly) {
    return `The client appeared ${moodOnly[1].toLowerCase()} during the visit.`;
  }

  s = s
    .replace(/\b(i|me)\b/gi, "the caregiver")
    .replace(/\btheir home\b/gi, "the client's home")
    .replace(/\btheir\b/gi, "the client's")
    .replace(/\bhis\b/gi, "the client's")
    .replace(/\bher\b/gi, "the client's")
    .replace(/\bhim\b/gi, "the client");

  const pairs: [RegExp, string][] = [
    [/^changed the napkins/i, "Replaced napkins and refreshed hygiene supplies"],
    [/^changed\b/i, "Updated"],
    [/^organized (?:their |the client's )?home/i, "Supported household organisation and tidying"],
    [/^organized\b/i, "Organised"],
    [/^helped (?:the client )?(?:with |doing )?/i, "Assisted the client with "],
    [/^helped\b/i, "Provided support with "],
    [/^gave medicine/i, "Provided medication reminder support"],
    [/^gave\b/i, "Provided"],
    [/^ate\b/i, "The client ate"],
    [/^walked\b/i, "Supported mobility including a walk"],
    [/^the client was confused/i, "The client appeared confused during the visit"],
    [/^was confused/i, "The client appeared confused during the visit"],
  ];

  for (const [pattern, replacement] of pairs) {
    if (pattern.test(s)) {
      s = s.replace(pattern, replacement);
      break;
    }
  }

  s = s.replace(/\s*(he|she|they)\s+was\s+confused\s*(today)?/gi, "").trim();
  if (!s) return null;

  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (!/[.!?]$/.test(s)) s += ".";
  return s;
}

function expandActivities(rawParts: string[]): string[] {
  const results: string[] = [];

  for (const part of rawParts) {
    const fixed = fixSpelling(part);
    const moodSplit = fixed.match(
      /^(.+?)\s+(?:he|she|they)\s+was\s+(confused|agitated|anxious|upset)\s*(today)?\.?$/i
    );
    if (moodSplit) {
      const task = rewriteActivity(moodSplit[1]);
      if (task) results.push(task);
      results.push(`The client appeared ${moodSplit[2].toLowerCase()} during the visit.`);
      continue;
    }

    const line = rewriteActivity(fixed);
    if (line) results.push(line);
  }

  return results;
}

function buildClinicalSummary(activities: string[]): string {
  if (activities.length === 0) {
    return "Visit notes were recorded but contained limited detail.";
  }

  const careActions = activities.filter((a) => !/appeared (confused|agitated|anxious|upset)/i.test(a));
  const observations = activities.filter((a) => /appeared (confused|agitated|anxious|upset)/i.test(a));

  const parts: string[] = [];

  if (careActions.length > 0) {
    parts.push(...careActions.map((a) => (a.endsWith(".") ? a : `${a}.`)));
  }

  if (observations.length > 0) {
    parts.push(...observations.map((a) => (a.endsWith(".") ? a : `${a}.`)));
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function buildFollowUp(activities: string[]): string {
  if (activities.some((a) => /confused|agitat|aggress|pain|dizz|distress|safety|refus/i.test(a))) {
    return "Monitor presentation and escalate to the care coordinator if concerns continue.";
  }
  return "Continue routine monitoring per care plan.";
}

function normalizeReportOutput(text: string): string {
  let out = text
    .replace(/^```[\w]*\n?/gm, "")
    .replace(/```$/gm, "")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^[-•]\s+/gm, "")
    .trim();

  if (!/^Clinical Summary/im.test(out)) {
    out = `Clinical Summary\n${out}`;
  }
  if (!/^Timeline/im.test(out)) {
    out += "\n\nTimeline\n1. Visit activities documented.";
  }
  if (!/^Follow-up/im.test(out)) {
    out += "\n\nFollow-up\nContinue routine monitoring per care plan.";
  }

  return out.replace(/\n{3,}/g, "\n\n");
}

function generateOrganizedReportRules(rawNotes: string): string {
  const trimmed = rawNotes.trim();
  if (!trimmed) {
    return normalizeReportOutput(
      "Clinical Summary\nNo visit notes were provided.\n\nTimeline\n1. No activities recorded.\n\nFollow-up\nContinue routine monitoring per care plan."
    );
  }

  const rawParts = parseActivities(trimmed);
  let activities = expandActivities(rawParts.length > 0 ? rawParts : [trimmed]);

  if (activities.length === 0) {
    const single = rewriteActivity(trimmed);
    if (single) activities = [single];
  }

  const summary = buildClinicalSummary(activities);
  const timeline = activities.map((line, i) => `${i + 1}. ${line}`).join("\n");
  const followUp = buildFollowUp(activities);

  return normalizeReportOutput(
    `Clinical Summary\n${summary}\n\nTimeline\n${timeline}\n\nFollow-up\n${followUp}`
  );
}

async function callGeminiModel(model: string, rawNotes: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: CARE_REPORT_PROMPT }] },
      contents: [
        {
          parts: [
            {
              text: `Rewrite these caregiver home visit notes into the required report format:\n\n${rawNotes}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Gemini ${model} (${response.status}): ${errBody}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    throw new Error(`Gemini ${model} returned an empty report.`);
  }

  return normalizeReportOutput(text);
}

async function generateOrganizedReportGemini(rawNotes: string): Promise<string> {
  const trimmed = rawNotes.trim();
  if (!trimmed) {
    return generateOrganizedReportRules("");
  }

  const models = [
    env.geminiModel,
    ...GEMINI_MODEL_FALLBACKS.filter((m) => m !== env.geminiModel),
  ];

  let lastError: Error | null = null;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await callGeminiModel(model, trimmed);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (lastError.message.includes("429") && attempt === 0) {
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }
        break;
      }
    }
  }

  throw lastError ?? new Error("All Gemini models failed.");
}

export async function generateOrganizedReport(
  rawNotes: string
): Promise<{ text: string; provider: string }> {
  if (env.aiProvider === "gemini" && geminiConfigured()) {
    try {
      const text = await generateOrganizedReportGemini(rawNotes);
      return { text, provider: "gemini" };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("429") || message.includes("quota")) {
        console.warn(
          "Gemini quota unavailable — using enhanced local report formatter. Enable billing or wait for quota reset."
        );
      } else {
        console.error("Gemini report generation failed, using rules fallback:", err);
      }
    }
  }

  return { text: generateOrganizedReportRules(rawNotes), provider: "rules" };
}

export function buildPreview(text: string, max = 300) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 3)}...`;
}
