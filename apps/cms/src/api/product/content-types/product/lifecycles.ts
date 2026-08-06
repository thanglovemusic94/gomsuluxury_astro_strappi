import { applySeoScore } from '../../../../utils/seo-score';

const stripHtml = (value?: string | null) =>
  (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export default {
  beforeCreate(event: any) {
    const data = event.params.data;
    const content = stripHtml(data.description || data.content || data.excerpt || '');
    event.params.data = applySeoScore(data, content.length);
  },
  beforeUpdate(event: any) {
    const data = event.params.data;
    if (!data) return;
    const content = stripHtml(data.description || data.content || data.excerpt || '');
    event.params.data = applySeoScore(data, content.length);
  },
};
