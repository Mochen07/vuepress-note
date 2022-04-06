import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/guide/': [
    {
      text: '指南',
      children: [
        {
          text: '指南',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/configuration.md',
          ]
        },
        {
          text: '指南2',
          children: [
            '/guide2/README.md',
            '/guide2/getting-started.md',
            '/guide2/configuration.md',
          ]
        },
      ]
    },
    {
      text: '指南1',
      children: [
        {
          text: '指南1',
          children: [
            '/guide1/README.md',
            '/guide1/getting-started.md',
            '/guide1/configuration.md',
          ]
        },
        {
          text: '指南1',
          children: [
            '/guide1/README.md',
            '/guide1/getting-started.md',
            '/guide1/configuration.md',
          ]
        },
      ]
    }
  ]
}