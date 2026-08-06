export type SeoInput = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  ogImage?: unknown;
  slug?: string | null;
  contentLength?: number;
};

export type SeoResult = {
  score: number;
  notes: string[];
};

const lengthScore = (value: string, min: number, idealMin: number, idealMax: number, max: number) => {
  const len = value.trim().length;
  if (len === 0) return { points: 0, note: `Thiếu nội dung (0 ký tự)` };
  if (len < min) return { points: 5, note: `Quá ngắn (${len} ký tự, nên ≥ ${min})` };
  if (len > max) return { points: 8, note: `Quá dài (${len} ký tự, nên ≤ ${max})` };
  if (len >= idealMin && len <= idealMax) {
    return { points: 25, note: `Độ dài tốt (${len} ký tự)` };
  }
  return { points: 18, note: `Độ dài chấp nhận được (${len} ký tự)` };
};

export function calculateSeoScore(input: SeoInput): SeoResult {
  const notes: string[] = [];
  let score = 0;

  const title = input.metaTitle?.trim() || '';
  const description = input.metaDescription?.trim() || '';
  const focus = input.focusKeyword?.trim().toLowerCase() || '';

  const titleResult = lengthScore(title, 30, 50, 60, 70);
  score += titleResult.points;
  notes.push(`Title: ${titleResult.note}`);

  const descResult = lengthScore(description, 70, 140, 160, 180);
  score += descResult.points;
  notes.push(`Description: ${descResult.note}`);

  if (focus) {
    score += 10;
    notes.push('Có từ khóa trọng tâm');
    if (title.toLowerCase().includes(focus)) {
      score += 10;
      notes.push('Từ khóa xuất hiện trong title');
    } else {
      notes.push('Nên đưa từ khóa vào title');
    }
    if (description.toLowerCase().includes(focus)) {
      score += 10;
      notes.push('Từ khóa xuất hiện trong description');
    } else {
      notes.push('Nên đưa từ khóa vào description');
    }
  } else {
    notes.push('Thiếu từ khóa trọng tâm (−30 điểm tiềm năng)');
  }

  if (input.ogImage) {
    score += 10;
    notes.push('Có ảnh Open Graph');
  } else {
    notes.push('Thiếu ảnh Open Graph');
  }

  if (input.canonicalUrl) {
    score += 5;
    notes.push('Có canonical URL');
  }

  if (input.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    score += 5;
    notes.push('Slug thân thiện SEO');
  } else if (input.slug) {
    notes.push('Slug nên dùng chữ thường, số và dấu gạch ngang');
  }

  if ((input.contentLength || 0) >= 300) {
    score += 5;
    notes.push('Nội dung đủ dài (≥ 300 ký tự)');
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    notes,
  };
}

export function applySeoScore<T extends { seo?: SeoInput | null; slug?: string | null }>(
  data: T,
  contentLength = 0
): T {
  if (!data?.seo) return data;
  const result = calculateSeoScore({
    ...data.seo,
    slug: data.slug,
    contentLength,
  });
  return {
    ...data,
    seo: {
      ...data.seo,
      seoScore: result.score,
      seoNotes: result.notes.join('\n'),
    },
  };
}
