import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue驱动静态网站生成器'
    }
  },

  themeConfig: {
    logo: '/images/hreo.png',
    repo: 'vuepress/vuepress-next',
  }
})