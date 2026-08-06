import SeoScoreField from './components/SeoScoreField';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'seo-live-score',
      pluginId: 'seo-analyzer',
      type: 'json',
      intlLabel: {
        id: 'seo-analyzer.seo-live-score.label',
        defaultMessage: 'SEO Live Score',
      },
      intlDescription: {
        id: 'seo-analyzer.seo-live-score.description',
        defaultMessage: 'Đo chỉ số SEO khi nhập meta title / description',
      },
      components: {
        Input: async () => SeoScoreField,
      },
    });
  },
  bootstrap() {},
};
