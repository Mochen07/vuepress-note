import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/guide/'
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/zh/reference/cli.md'
        ]
      },
      {
        text: '打包工具',
        children: [
          '/zh/reference/bundler/vite.md'
        ]
      }
    ]
  }
]