function parseNoteSentences(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  const parts = normalized
    .split(/\n+|[.!?]+\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [normalized];
}

function rewriteForCareDoc(fragment: string): string {
  let line = fragment.trim().replace(/^like\s+/i, "").replace(/^i\s+/i, "");
  if (!line) return "";

  line = line
    .replace(/\bi\b/gi, "the caregiver")
    .replace(/\btheir\b/gi, "the client's")
    .replace(/\bhis\b/gi, "the client's")
    .replace(/\bher\b/gi, "the client's");

  const transforms: [RegExp, string][] = [
    [/^changed the napkins\b/i, "Replaced napkins and maintained hygiene supplies"],
    [/^changed\b/i, "Updated"],
    [/^organized their home\b/i, "Supported household organisation and tidying"],
    [/^organized\b/i, "Organised"],
    [/^helped (?:him|her|them) (?:with |doing )?/i, "Provided assistance with "],
    [/^helped with\b/i, "Assisted with"],
    [/^helped\b/i, "Supported the client with"],
    [/^gave medicine\b/i, "Medication reminder and support provided"],
    [/^gave\b/i, "Provided"],
    [/^ate\b/i, "The client ate"],
    [/^walked\b/i, "Mobility support included a walk"],
  ];

  for (const [pattern, replacement] of transforms) {
    if (pattern.test(line)) {
      line = line.replace(pattern, replacement);
      break;
    }
  }

  line = line.charAt(0).toUpperCase() + line.slice(1);
  if (!/[.!?]$/.test(line)) line += ".";
  return line;
}

function buildClinicalSummary(sentences: string[]): string {
  if (sentences.length === 0) return "";
  if (sentences.length === 1) return sentences[0];

  const domestic = sentences.filter((s) =>
    /napkin|home|chore|clean|tidy|house/i.test(s)
  );
  const personal = sentences.filter((s) =>
    /medic|meal|food|walk|mobility|shower|hygiene|toilet/i.test(s)
  );
  const other = sentences.filter(
    (s) => !domestic.includes(s) && !personal.includes(s)
  );

  const parts: string[] = [];
  if (domestic.length > 0) {
    parts.push(
      `Domestic support was provided, including ${domestic
        .map((s) => s.replace(/\.$/, "").toLowerCase())
        .join(" and ")}`
    );
  }
  if (personal.length > 0) {
    parts.push(
      personal.length === 1
        ? personal[0].replace(/\.$/, "")
        : `Personal care activities included ${personal
            .map((s) => s.replace(/\.$/, "").toLowerCase())
            .join(", ")}`
    );
  }
  if (other.length > 0) {
    parts.push(other.map((s) => s.replace(/\.$/, "")).join(". "));
  }

  return `${parts.join(". ")}.`;
}

function buildTimeline(sentences: string[]): string[] {
  if (sentences.length <= 3) return sentences;

  const domestic = sentences.filter((s) =>
    /napkin|home|chore|clean|tidy|house/i.test(s)
  );
  const personal = sentences.filter((s) =>
    /medic|meal|food|walk|mobility|shower|hygiene|toilet/i.test(s)
  );
  const other = sentences.filter(
    (s) => !domestic.includes(s) && !personal.includes(s)
  );

  const grouped: string[] = [];
  if (domestic.length > 0) {
    grouped.push(
      `Domestic support: ${domestic.map((s) => s.replace(/\.$/, "").toLowerCase()).join("; ")}.`
    );
  }
  if (personal.length > 0) {
    grouped.push(
      personal.length === 1
        ? personal[0]
        : `Personal care: ${personal.map((s) => s.replace(/\.$/, "").toLowerCase()).join("; ")}.`
    );
  }
  grouped.push(...other);
  return grouped.length > 0 ? grouped : sentences.slice(0, 4);
}

export function generateOrganizedReport(rawNotes: string): string {
  const trimmed = rawNotes.trim();
  if (!trimmed) {
    return "Clinical Summary\nNo visit notes were provided.\n\nTimeline\n1. No activities recorded.";
  }

  let sentences = parseNoteSentences(trimmed).map(rewriteForCareDoc).filter(Boolean);
  if (sentences.length === 0) {
    sentences = [rewriteForCareDoc(trimmed)];
  }

  const summary = buildClinicalSummary(sentences);
  const timelineItems = buildTimeline(sentences);
  const timeline = timelineItems.map((line, i) => `${i + 1}. ${line}`).join("\n");

  return `Clinical Summary\n${summary}\n\nTimeline\n${timeline}`;
}
