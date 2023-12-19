import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { navbar, sidebar } from './configs'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/vuepress-note/',

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
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
      }
    }
  }
})
