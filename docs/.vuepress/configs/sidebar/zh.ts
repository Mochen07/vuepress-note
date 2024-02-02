import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/guide/': [
    '/guide/prose/github-actions',
    '/guide/prose/markdown',
    '/guide/prose/uniapp-main-seo',
    '/guide/prose/v3_add_v2_v1',
    '/guide/prose/v3_add_v2_v2',
    '/guide/prose/v3_add_v2_v3',
    '/guide/prose/v3_add_v2_v4',
    '/guide/prose/v3_add_v2_v5',
    '/guide/prose/v3_global_data_v1',
    '/guide/prose/v3_global_data_v2',
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