import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { navbar, sidebar } from './configs'

export default defineUserConfig<DefaultThemeOptions>({
  base: './',

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
      title: '想名字想家',
      description: '用VuePress构建学习笔记'
    }
  },

  themeConfig: {
    logo: '/images/hero.png',

    repo: 'Mochen07/vuepress-note',

    docsDir: 'docs',

    locales: {
      '/': {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
      }
    }
  }
})
