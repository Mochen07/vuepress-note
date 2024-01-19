# kzl-后台合并v1

## 背景

> 原本是两个后台，后面需要合并成一个后台， 采用了iframe嵌套的[合并方案](http://doc.int.kzl.com.cn/docs/technology-research/technology-research-1e7o82hvhjf1s). 目前任然是两个项目，为了更好的维护，以及更好的交互体验，希望合并成一个。

## 合并思路

1. 尽量摆脱老项目的代码，逐渐迁移的v3项目，之前也和伟伟沟通过。
2. 由于v3项目相对与之前的项目有跟新的开发方式/插件，比如ts, 以及结合第一点，想的是老项目植入v3项目。
3. 按理来说使用新项目同时植入v3与老项目，可以使项目性能最大化。在第2点合并完成之后，可以逐步朝这个方向的技术栈靠拢，只不过不是移植，改为优化，这样可以控制植入时间和保护项目的完整性。

## 方案整理

> 在v3项目创建scr/v2_files文件夹，用于存放老项目所有代码，保持区分

### 版本信息

1. 老项目：cater-source -> tag: 4.78.2
2. v3项目：wzl-cater-h5 -> tag: 1.47.4

### 关于老项目的准备

1. 调整老项目代码的目录结构scr里面的所有文件到scr/v2_files文件夹。
2. 修改脚手架入口文件配置，全局替换相关引用文件，至项目正常运行。
3. 同步环境变量。兼容v3项目新增变量HOST，全局环境变量BASE_API替换为HOST的引用。
4. vuex兼容。老项目与v3项目modelus里面的cache冲突。cache全局替换为oldCache; vuex配置(index.js)里面的相对引用采用别名@引用。
5. router兼容。router配置(index.js)里面的相对引用采用别名@引用。

### 关于v3项目的接入

1. 合并package.json，并安装相关依赖。新增如下老项目依赖

```javascript
  "dependencies": {
    ...
    "chart": "0.1.2",
    "chart.js": "2.7.3",
    "clipboard": "1.7.1",
    "el-form-renderer": "1.0.5",
    "emoji-vue": "0.2.4",
    "eslint-plugin-vue": "6.0.1",
    "img-loader": "3.0.1",
    "jszip": "3.1.5",
    "normalize.css": "7.0.0",
    "nprogress": "0.2.0",
    "quill": "1.3.7",
    "screenfull": "3.3.2",
    "vcolorpicker": "0.1.8",
    "vee-validate": "2.1.4",
    "vue-count-to": "1.0.13",
    "vue-multiselect": "2.0.8",
    "xlsx": "0.11.16"
  },
  "devDependencies": {
    ...
    "webpack": "3.6.0",
    "webpack-bundle-analyzer": "2.9.0",
    "webpack-dev-server": "2.9.1",
    "webpack-merge": "4.1.0"
    "webpack-merge": "4.1.0",
    "babel-eslint": "8.2.1",
    "babel-plugin-dynamic-import-node": "1.2.0",
    "eslint-friendly-formatter": "3.0.0",
    "eslint-loader": "1.9.0",
    "eslint-plugin-html": "4.0.3",
    "launch-editor-middleware": "^2.6.0",
    "pushstate-server": "3.0.1",
    "sass": "1.26.10",
    "script-loader": "0.7.2"
  },

```

2. 老项目文件迁移到src/v2_files
3. 合并index.html，合并static资源文件

```javascript
// index.html添加
<link rel="stylesheet" href="//at.alicdn.com/t/font_1959418_9d70jhkfyvt.css">
<script src="./static/ueditor/ueditor.config.js"></script>
<script src="./static/ueditor/ueditor.all.min.js"></script>
```

4. 合并router

```javascript
// 屏蔽src/v2_files/router/index.js文件内容
```

```javascript
// src/v2_files/router/config.js
// router.beforeEach封装为方法
export const oldRouterBeforeEach = async (to, from, next) => {...})
// 屏蔽router.afterEach()写到src/router/index里面
```

```javascript
// src/router/index.js添加
import NProgress from 'nprogress' // 头部进度条
import { routesToJson } from '@/v2_files/router/cacheComponents'
import chainRoutes from '@/v2_files/router/modules/chain/index'
import shopRoutes from '@/v2_files/router/modules/shop/index'
import baseRoutes from '@/v2_files/router/modules/base/index'
import exceptionRoutes from '@/v2_files/router/modules/base/exception'
import homeRoutes from '@/v2_files/router/modules/base/home'
import {oldRouterBeforeEach} from '@/v2_files/router/config'

// 动态路由
const oldDynamicRoutes = [
  ...homeRoutes,
  ...chainRoutes,
  ...shopRoutes,
  ...exceptionRoutes
]
// 常量路由
const oldConstantRoutes = [...baseRoutes]

export const constantRoutes = [
    // ...
    ...oldConstantRoutes,❗
]
export const dynamicRoutes = [
    // ...
    ...oldDynamicRoutes,❗
]

// 老项目迁移引入
// 路由表（门店切换时用到）
export const routes = [
  ...constantRoutes,
  ...dynamicRoutes,
]

// 路由json化
export const dynamicRoutesJson = routesToJson(dynamicRoutes)

// 屏蔽了v3的router.before(), 改写为如下❗
router.beforeEach(async(to, from, next) => {
    await oldRouterBeforeEach(to, from, next)
})

// 迁移v2afterEach
router.afterEach(() => {
  // 给页面动态设置标题
  // document.title = '客智联- ' + router.history.current.meta.title
  // 关闭头部进度条
  NProgress.done()
})
```

```javascript
// src/router/modules/common.js 注释与老项目相同的路由
export default [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login,
  //   meta: {
  //     title: '系统登录'
  //   }
  // },
  // ...
 ]
```

5. 合并vuex

```javascript
// 需要屏蔽src/v2_files/store/index.js文件内容（会莫名的引入导致报错）
```

```javascript
// src/store/index.js 添加
import app from '@/v2_files/store/modules/app'
import tagsView from '@/v2_files/store/modules/tagsView'
import user from '@/v2_files/store/modules/user'
import officialAccounts from '@/v2_files/store/modules/officialAccounts'
import oldCache from '@/v2_files/store/modules/oldCache'
import permission from '@/v2_files/store/modules/permission'
import coupon from '@/v2_files/store/modules/coupon'
import getters from '@/v2_files/store/getters'

export default new Vuex.Store({
    modules: {
        //...
        menuTemplate,
        app,
        tagsView,
        user,
        officialAccounts,
        oldCache,
        permission,
        coupon,
    },
    getters
})
```

6. 修改layout布局方式以及iframe跳转方式调整❗

```javascript
// src/v2_files/views/layout/Layout.vue
this.$router.push(data.redirectUrl)
// if (!data.isV3) {
//   // this.gotoV3PageUrl = ''// 加这个是为了顶部导航栏在跳v2后上一个v3url入栈
//   this.$router.push(data.redirectUrl)
// } else {
//   this.gotoV3PageUrl = data.redirectUrl
//   this.$router.push('/v3/base' + data.redirectUrl)
// }
```

```javascript
// 批处理layout, 对modules里面的BaseLayout替换为Layout
// 代码片段
- import BaseLayout from '@/components/BaseLayout/Index/Index.vue'
+ const Layout = () => import('@/v2_files/views/layout/Layout')
// 代码片段
- component: BaseLayout,
+ component: Layout,
```

7. 关于全局数据转移到v3服务的处理方法（用户信息等基础数据）❗

```javascript
// 新增文件src/utils/oldAndV3Merge.js
/** v3从老项目面获取用户信息 */
export const v3GetUserInfo = (headerKey) => {
  return new Promise((resolve, reject) => {
    try {
      const curGroup = JSON.parse(localStorage.getItem('curGroup'))
      // 店铺信息
      const curShop = JSON.parse(localStorage.getItem('curShop'))
      const header = JSON.parse(localStorage.getItem(headerKey))
      const gid_text = curGroup.name
      const originBid = header.gid
      const selectBrandByPage = JSON.parse(localStorage.getItem('selectBrandByPage') || localStorage.getItem('prevSelectedBrandOfPage'))
      let params = {
        bid: header.sid === 0 ? (selectBrandByPage && selectBrandByPage.id ? selectBrandByPage.id : header.bid) : header.bid,
        gid: header.gid,
        sid: header.sid,
        uname: header.name,
        uid: header.uid,
        token: header.token,
        refreshToken: header.refresh_token,
        expireTime: JSON.parse(localStorage.getItem('expireTime'))
      }
      if (header.sid !== 0) {
        params = {
          ...params,
          shop_text: curShop.name,
          shopId: header.sid,
          type: 'shop'
        }
      } else {
        params = { ...params, gid_text, uname: header.name, originBid, type: 'group' }
      }
      console.log('这里获取v2的用户信息', JSON.stringify(params))
      resolve(params)
    } catch (e) {
      reject(e)
    }
  })
}
```

```javascript
// src/v2_files/views/layout/Layout.vue
// 代码片段
const userInfo = await v3GetUserInfo(this.$header)
localStorage.setItem('userInfo', userInfo)
this.$store.dispatch('common/setUserInfo', { userInfo: userInfo })
```

8. v2全局组件方法等处理❗

```javascript
// src/v2_files/main.js

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {
//     App
//   },
//   template: '<App/>'
// })
```

```javascript
// src/main.ts
import '@/v2_files/main'
```

9. 部分细节处理

    9.1 修改老项目echarts引入错误的问题

    ```javascript
    代码片段
    // import echarts from 'echarts'
    import * as echarts from 'echarts'
    ```

    9.2 优化transition-group组件内部列表key使用index的警告

    ```javascript
    // npm install uuid
    // 替换index
    ```

    9.3 侧边样式覆盖问题（v3样式覆盖了v2样式）

    ```javascript
    // src/App.vue
    // width: 36px;
    ```

    9.4 build编译报错的问题修复

    ```javascript
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            minimize: true
        }
    }
    
    // src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_ad_dialog_config/index.vue
    - --hoverBoxHeight: 0px
    + --hoverBoxHeight: 0px;
    ```

    9.5 全局替换v2跳转v3路径

    ```javascript
    // /v3/base 替换为 空
    ```

    9.6 解决切换门店页面卡死的问题

    ```javascript
    // src/v2_files/views/layout/components/Navbar.vue
    // import {routes} from '@/v2_files/router'
    import {routes} from '@/router/index'
    ```

## 数据分析（v3项目）

> 测试场景单一，仅供参考

### 合并前

本地打包耗时：163873ms 约 2.7min
jenkins打包耗时：399882ms 约 6.6min
开发启动：120467ms 约 2.0min
热重载：19659ms 约 19s

### 合并后

本地打包耗时：397859ms 约 6.6min
jenkins打包耗时：688421ms 约 11.4min
开发启动：240051ms 约 4min
热重载：20806ms 约 20s

## 问题合集（欢迎修改/评论）

> [方案整理](#方案整理)里面出现❗地方，都是代表不太稳定有争议的地方，需要斟酌斟酌。

- [x] 1. [关于v3项目的接入](#关于v3项目的接入)第4点，需要检查v3项目与老项目路由是否存在冲突。（如果有则会优先使用v3的路由）；以及v3 beforeEach弃用是否会有什么隐藏的问题。

- [x] 2. [关于v3项目的接入](#关于v3项目的接入)第6点，跟伟伟沟通过v3失去了iframe标签支撑，原来与v2的通讯交互都需要逐一调整。
- [x] 3. [关于v3项目的接入](#关于v3项目的接入)第7点，这里只是处理了，之前v2进入v3后台传递的全局数据，变为了，登陆直接直接传递。其他的地方是否有特殊处理，暂不知道。
- [x] 4. [关于v3项目的接入](#关于v3项目的接入)第8点，这个操作有点暴力，但是还是挺有效的。存在的问题：全局样式覆盖、影响性能、未发现的隐藏问题。
- [x] 5. 打包后，左侧侧边栏出现样式问题（开发环境正常）
- [x] 6. 页面登陆失效会跳到/home空白页面，导致无法操作
- [x] 7. 全局品牌选择出现无法显示的问题。只有品牌，门店列表出不来。
- [ ] 8. 合并后jenkins打包压力上升至200%，需要优化build。
- [x] 9. 目前只发现了这么多，还有可能会有一下潜藏的问题。大家可以添加在评论里面。
