import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

export const zh: NavbarConfig = [
  // {
  //   text: '指南',
  //   link: '/guide/'
  // },
  {
    text: 'vue2源码阅读',
    link: '/vue2/start',
  },
  {
    text: `版本${version}`,
    link: 'https://gitee.com/Mochen_7/vuepress-note'
  },
]