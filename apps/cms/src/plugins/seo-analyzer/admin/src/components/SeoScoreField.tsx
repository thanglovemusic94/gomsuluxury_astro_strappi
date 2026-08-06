import React, { useMemo, useState } from 'react';
import { Box, Typography, Flex, TextInput, Textarea, Badge } from '@strapi/design-system';

type Props = {
  name: string;
  value?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
  } | null;
  onChange: (event: { target: { name: string; value: unknown; type: string } }) => void;
  attribute?: unknown;
  disabled?: boolean;
};

function scoreLength(len: number, min: number, idealMin: number, idealMax: number, max: number) {
  if (len === 0) return 0;
  if (len < min || len > max) return 8;
  if (len >= idealMin && len <= idealMax) return 25;
  return 18;
}

function compute(metaTitle: string, metaDescription: string, focusKeyword: string) {
  const notes: string[] = [];
  let score = 0;
  const title = metaTitle.trim();
  const description = metaDescription.trim();
  const focus = focusKeyword.trim().toLowerCase();

  const t = scoreLength(title.length, 30, 50, 60, 70);
  score += t;
  notes.push(`Title: ${title.length}/50–60 ký tự`);

  const d = scoreLength(description.length, 70, 140, 160, 180);
  score += d;
  notes.push(`Description: ${description.length}/140–160 ký tự`);

  if (focus) {
    score += 10;
    if (title.toLowerCase().includes(focus)) score += 10;
    else notes.push('Chưa có từ khóa trong title');
    if (description.toLowerCase().includes(focus)) score += 10;
    else notes.push('Chưa có từ khóa trong description');
  } else {
    notes.push('Thiếu từ khóa trọng tâm');
  }

  score = Math.min(100, score + 20); // baseline for live widget (OG/canonical scored on save)
  return { score, notes };
}

const tone = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 55) return 'warning';
  return 'danger';
};

const SeoScoreField = ({ name, value, onChange, disabled }: Props) => {
  const [metaTitle, setMetaTitle] = useState(value?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(value?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(value?.focusKeyword || '');

  const result = useMemo(
    () => compute(metaTitle, metaDescription, focusKeyword),
    [metaTitle, metaDescription, focusKeyword]
  );

  const emit = (next: { metaTitle: string; metaDescription: string; focusKeyword: string }) => {
    onChange({
      target: {
        name,
        type: 'json',
        value: next,
      },
    });
  };

  return (
    <Box padding={4} background="neutral100" hasRadius>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography variant="delta">Phân tích SEO realtime</Typography>
        <Badge size="M" active>
          {result.score}/100 · {tone(result.score)}
        </Badge>
      </Flex>

      <Box marginBottom={3}>
        <TextInput
          label="Focus keyword"
          name="focusKeyword"
          disabled={disabled}
          value={focusKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const next = { metaTitle, metaDescription, focusKeyword: e.target.value };
            setFocusKeyword(e.target.value);
            emit(next);
          }}
        />
      </Box>

      <Box marginBottom={3}>
        <TextInput
          label="Meta title (draft)"
          name="metaTitle"
          disabled={disabled}
          value={metaTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const next = { metaTitle: e.target.value, metaDescription, focusKeyword };
            setMetaTitle(e.target.value);
            emit(next);
          }}
        />
      </Box>

      <Box marginBottom={3}>
        <Textarea
          label="Meta description (draft)"
          name="metaDescription"
          disabled={disabled}
          value={metaDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const next = { metaTitle, metaDescription: e.target.value, focusKeyword };
            setMetaDescription(e.target.value);
            emit(next);
          }}
        />
      </Box>

      <Box>
        {result.notes.map((note) => (
          <Typography key={note} textColor="neutral600" variant="pi">
            • {note}
          </Typography>
        ))}
        <Typography variant="pi" textColor="neutral500" marginTop={2}>
          Điểm chính thức (seoScore) được tính lại khi Save từ component SEO.
        </Typography>
      </Box>
    </Box>
  );
};

export default SeoScoreField;
