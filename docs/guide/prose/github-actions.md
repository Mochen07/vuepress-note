# Github Actions

## 介绍

github提供的静态页面部署，研究了一波。概念什么的可以参考[阮一峰](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)先生的文档或者去[github官方文档](https://github.com/features/actions)了解。只做最简单功能实现方式。

### 第一步

![入口](/images/guide/github-actions.jpg)

1. 生成私钥。Settings -> Developer settings -> Personal access tokens -> 点击Generate new token。（创建的时候勾上workflow即可）

2. 将私钥存储到当前仓库。Settings -> Secrets -> Actions -> 点击New repository secret

3. 点开Actions。点击New workflows。（文件位置为项目.github->workflows->xx.yml）

4. 在项目里面的package.json，添加字段
```
"homepage": "https://[username].github.io/github-actions-demo",
```

### 第二步

> 编写yml

```
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
      uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
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

### 总结

根据上面两个步骤发布一个[页面](https://mochen07.github.io/vuepress-note/)，注意注释部分。操作过程中遇到如下问题：

1. github pages样式丢失。参考[文件](https://v2.vuepress.vuejs.org/zh/reference/config.html#%E7%AB%99%E7%82%B9%E9%85%8D%E7%BD%AE)解决