import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: [
          'image/*',
          'video/*',
          'audio/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.*',
          'text/plain',
          'text/csv',
        ],
        deniedTypes: [
          'application/vnd.microsoft.portable-executable',
          'application/x-msdownload',
          'application/x-msdos-program',
          'application/x-executable',
          'application/x-dosexec',
          'application/x-sh',
          'text/x-shellscript',
          'application/x-mach-binary',
        ],
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'vi',
      locales: ['vi', 'en', 'ja'],
    },
  },
});

export default config;
