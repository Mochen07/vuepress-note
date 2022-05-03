# Github Actions

## 介绍

github提供的静态页面部署，研究了一波。干货可以参考[阮一峰](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)先生的文档或者去[github官方文档](https://github.com/features/actions)了解。本文章只粗暴的实现了功能。

### 第一步

![入口](/images/guide/github-actions.jpg)

1. **生成私钥(如上图1)**：`Settings` -> `Developer settings` -> `Personal access tokens` -> 点击`Generate new token`。（创建的时候`勾上workflow`即可）

2. **将私钥存储到当前仓库(如上图2)**：`Settings` -> `Secrets` -> `Actions` -> 点击`New repository secret`

3. **点开Actions(如上图3)**：点击`set up a workflow yourself`。（文件位置为项目：github->workflows->xx.yml。直接创建也行。）

4. 在项目里面的`package.json`，添加如下字段：

```json
"homepage": "https://[username].github.io/github-actions-demo",
```

### 第二步

> 编写yml [源码](https://github.com/Mochen07/vuepress-note/tree/master/.github/workflows/ci)。[参考](https://github.com/ruanyf/github-actions-demo/blob/master/.github/workflows/ci.yml)

<CodeGroup>
  <CodeGroupItem title="INIT" active>

  ```yml
  name: vuepress github actions
  on:
    push:
      branches:
        - master
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: Install and Build
        run: |
          yarn install
          yarn run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist
  ```

  </CodeGroupItem>

  <CodeGroupItem title="REMARK">

  ```yml
  name: vuepress github actions # 设置当前workflow的名称。如果忽略默认为workflow的文件名。
  on:
    push: # 触发方式
      branches:
        - master # 触发分支名称
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest # 运行在虚拟机环境ubuntu-latest
      steps: # job步骤
      - name: Checkout # 第一步获取源码
        uses: actions/checkout@v2 # 使用的action是actions/checkout@v2
        with:
          persist-credentials: false # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
      - name: Install and Build # 第二步构建脚本
        run: |
          yarn install
          yarn run build
      - name: Deploy # 第三步部署
        uses: JamesIves/github-pages-deploy-action@releases/v3 # 使用的action是JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # github 密钥
          BRANCH: gh-pages # 发布分支
          FOLDER: docs/.vuepress/dist # 构建成果所在目录。vue项目通常是dist
  ```

  </CodeGroupItem>
</CodeGroup>

### 总结

根据上面两个步骤，经过特定的分支触发github actions构建完成之后，得到一个[页面](https://mochen07.github.io/vuepress-note/)就可以访问啦。操作过程中遇到如下问题：

1. github pages样式丢失。参考[文档](https://v2.vuepress.vuejs.org/zh/reference/config.html#%E7%AB%99%E7%82%B9%E9%85%8D%E7%BD%AE)解决

2. workflow 文件爬坑，已增加相关备注REMARK。可参照[阮一峰](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)的[workflow 文件]

::: tip
本文章饱腹，但不[营养](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。
:::