import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/guide/': [
    '/guide/prose/github-actions',
    '/guide/prose/markdown',
  ],
  '/vue2/': [
    {
      text: '准备工作',
      children: [
        '/vue2/start',
        '/vue2/start/flow',
        '/vue2/start/catalog',
        '/vue2/start/build',
        '/vue2/start/entrance',
      ]
    },
    {
      text: '数据驱动',
      children: [
        '/vue2/data',
      ]
    },
  ]
}