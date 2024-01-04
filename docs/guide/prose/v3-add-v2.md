# kzl-v3独立2.0

❗❗❗(遗留的问题)1. 异步业务逻辑层的抽离，补建议直接直接在状态管理里面处理数据 2. 数据模型一定要有补全 3. 数据逻辑的处理单独抽离出来，比如说路由权限的判断那个地方。

> 2018年07月24日 15:15 `cater-source`（old后台）
>
> 2021年01月29日 10:23 `wzl-cater-h5`（v3后台）
>
> 2022年10月18日 10:16 [引入iframe合并方案](http://doc.int.kzl.com.cn/docs/technology-research/technology-research-1e7o82hvhjf1s)（v3后台以iframe嵌套的形式在old后台运行）

old后台与v3后台原本是两个功能独立的后台项目，因产品市场的需要紧急拼成一个合在一起运行的项目。在当时确实是一个不错的方案，不过随着不断的迭代时间的推移许多问题逐渐的浮现了出来。

- 不易维护。
- 交互体验差。
- 影响工作效率。

所有现在有了v3后台独立的迫切需求，希望在保证项目平稳的前提下，消除iframe嵌套所带来的一些实质上的问题。

## v3项目独立缺少什么？

在iframe嵌套之前，v3有着属于自己的运行系统。从登陆到菜单再到各个功能模块运行有着一整套完整流程。不过随着iframe合并之后，一年多的时间弃用没有维护，再加上后续功能的迭代，显然已经不能再用了。所以现在v3后项目想要独立运行现在缺什么？

- **登陆系统**
- **菜单路由系统**
- **old后台现有的功能模块**

除了上面表面上的看到的缺失功能，`old后台现有的功能模块`内部的**全局数据的运转**肯定会涉及更改，加上`登陆以及路由系统`也是全局数据得维护起来，所有需要设计一套合理的全局数据，便于维护、更改、兼容v3。

- **全局数据的维护/更改/兼容**

怎样确保v3项目在独立过程中的稳定性？

- **项目的稳定性**

![v3项目独立缺少什么](../../../draw/v3_du_li.drawio.svg)

## 登陆系统

废弃v3原有的登陆页面系统，**将old登陆页面系统迁移到v3**和**登陆页面系统全局数据的维护/更改/兼容**。

1. old登陆页面迁移到v3(页面、功能、样式、组件、api、方法)。登陆得到：
     1. 用户信息（UInfo）
     2. 连锁信息（GInfo）
     3. 品牌信息（BInfo）
     4. 门店信息（SInfo）

2. 登陆成功对于**全局数据的处理**。基本遵循与现在的v3后台的数据保持一致（vuex以及localStorage）。

3. 通过先有的数据对老数据做向下赋值。

### 用户信息

现有old后台给v3后台下发的数据。(也就是v3项目localStorage里面的userInfo)

```javascript
// 旧
export const v3GetUserInfo = (headerKey) => {
  return new Promise((resolve, reject) => {
    try {
      // 集团信息
      const curGroup = JSON.parse(localStorage.getItem('curGroup'))
      // 店铺信息
      const curShop = JSON.parse(localStorage.getItem('curShop'))
      // header
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
        /** 打印版本 */
        printVersion: header.printVersion,
        /** 打印配置 */
        addGoodsPrintDefault: header.addGoodsPrintDefault,
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
      console.log('这里获取老后台的用户信息', JSON.stringify(params))
      resolve(params)
    } catch (e) {
      reject(e)
    }
  })
}
```

old下发v3整合UInfo数据接口。

> 下面的数据结构是根据现在v3后台的userInfo还原的数据模型，虽然有不合理的地方，但必须先保证v3数据userInfo的完整性，确保v3的页面不受影响。

```javascript
/** 数据结构 */
// src/helpers/constants/global_info.ts
interface UInfo {
  /** 品牌ID */
  bid: number,
  /** 集团ID */
  gid: number,
  /** 门店ID */
  sid: number,
  /** 用户名称 */
  uname: string,
  /** 用户ID */
  uid: number,
  /** token */
  token: string,
  /** refreshToken */
  refreshToken: string,
  /** 打印版本 */
  printVersion: number,
  /** 打印配置(类型需要补全，现在是个对象) */
  addGoodsPrintDefault: any,
  /** 登陆有效时间 */
  expireTime: number,
  /** ⬇️⬇️⬇️门店才有的字段⬇️⬇️⬇️ */
  /** 门店名称 */
  shop_text?: string,
  /** 门店ID */
  shopId?: number,
  /** 当前类型 */
  type?: 'shop',
}
```

vuex同步用户信息（store/common/userInfo）

> 全局信息储存的信息，都要用interface定义一下确保知道每个字段是干啥的。

```javascript
- store
  - modules
    - global_info.ts
```

```javascript
import { UInfo } from '@src/helpers/constants/global_info.ts'
interface GlobalInfo {
  /** 用户 */
  uInfo: UInfo,
}
const globalInfo = {
  state: () => ({
    /** 用户 */
    uInfo: {} as UInfo,
  }),
  mutations: {
    /** 设置用户信息 */
    uInfoSet(state: GlobalInfo, uInfo: UInfo) {
      state.uInfo = uInfo
    }
  },
  actions: {
    // 获取用户信息
    uInfoService({ commit }) {
      // 异步获取uInfo的数据，并调用uInfoSet，mutation进行设置（以及一些特殊字段处理）
    },
    // 用户退出登陆
    uInfoRemove() {
      // ...
    }
  },
}
export default globalInfo
```

localStorage缓存userInfo(UInfo)。

> 确保本地缓存页面刷新之后能够还原现有的vuex信息

### 关于localStorage的改动

#### old后台localStorage数据处理

| Key                                      | Value                                                                | 处理方式                              |
| ---------------------------------------- | -------------------------------------------------------------------- | --------------------------          |
| expireTime                               | 1701830570956                                                        | 保留（v3后台有相同的字段）               |
| https://caterapi-qa.weizhilian.comheader | {"token":"eyJhbGciOiJ...（此处数据已截断）                              | ❌弃用（同步转换至userInfo）            |
| curGroup                                 | {"id":10006,"status":1,"name":"豪侠汇餐厅...                           | ❌弃用（每次刷新重新请求，可放到vuex保存） |
| brandListParams                          | {"page":1,"query":"","size":20,"gid":10006}                          | ❌弃用                                |
| curBrand                                 | {"id":-1,"gid":10006,"name":"连锁设置","chainStatus":1,"business":1}   | ❌弃用（每次刷新重新请求，可放到vuex保存） |
| groupList                                | [{"id":10006,"name":"豪侠汇餐厅...                                     | ❌弃用（每次刷新重新请求，可放到vuex保存） |
| shopList                                 | {"page":1,"size":20,"query":""}                                      | ❌弃用                                |
| brandList                                | [{"id":-1,"gid":1000...                                              | ❌弃用                                |
| curShop                                  | {"id":0,"bid":0}                                                     | ❌弃用                                |
| groupListParams                          | {"page":1,"size":20,"query":""}                                      | ❌弃用                                |
| shopListParams                           | {"page":0,"size":20,"query":""}                                      | ❌弃用                                |
| loglevel:webpack-dev-server              | WARN                                                                 | ❌弃用                                |

❗上面涉及的相关缓存同步处理到Vuex下，尽量不要使用localStorage数据平移，不宜于维护。

#### v3后台localStorage数据处理

> 保留原有的userInfo、expireTime

| Key                                      | Value                                                                | 处理方式                              |
| ---------------------------------------- | -------------------------------------------------------------------- | --------------------------          |
| expireTime                               | 1701830570956                                                        | 保留（v3后台有相同的字段）               |
| userInfo                                 | {"token":"eyJhbGciOiJ...（此处数据已截断）                              | 保留数据同UInfo                        |

### 连锁、品牌、门店信息

跟用户信息同理

```javascript
// todo: 这里的数据需要在业务场景提取，看那些是需要的，用interface定义统一管理
import { GInfo, BInfo, SInfo, UInfo } from '@src/helpers/constants/global_info.ts'
interface GlobalInfo {
  /** 连锁 */
  gInfo: GInfo,
  /** 品牌 */
  bInfo: BInfo,
  /** 门店 */
  sInfo: SInfo,
  /** 用户 */
  uInfo: UInfo,
}
const globalInfo = {
  state: () => ({
    /** 连锁 */
    gInfo: {} as GInfo,
    /** 品牌 */
    bInfo: {} as BInfo,
    /** 门店 */
    sInfo: {} as SInfo,
    /** 用户 */
    uInfo: {} as UInfo,
  }),
  mutations: {
    /** 设置集团信息 */
    gInfoSet(state: GlobalInfo, gInfo: GInfo) {
    },
    // ...
    /** 设置品牌信息 */
    /** 设置门店信息 */
    // ...
  },
  actions: {
    /** 获取集团信息 */
    gInfoService({ commit }) {
      // 异步获取gInfo的数据，并调用setGInfo，mutation进行设置（以及一些特殊字段处理）
    },
    // ...
    /** 获取品牌信息 */
    /** 获取门店信息 */
    // ...
  },
}
export default globalInfo
```

### 小结

- 登陆页面迁移。

- 使用interface定义相关数据结构，保证数据的准确性。

- 用户信息保存localStorage/userInfo。

- 用户、集团、品牌、门店信息用vuex的module/globalInfo统一管理。

- 关于old部分localStorage字段的弃用，改用vuex/globalInfo(相关interface定义的字段)。

## 菜单路由系统

> 之前old菜单有大量iframe和全局数据的包袱，以及部分历史代码错综复杂交织在一起。

整体思路：重构。先搭菜单路由，后面补全局的功能。

> 全局功能有：
>
> - 选择门店与连锁
>
> - 营业状态切换
>
> - 用户口令与退出
>
> - 搜索订单

### 路由重构

#### 权限

```javascript
// cater-source/src/views/layout/publiceResah.js
// getPermissions方法获取了权限的值
[
  "shop:pc:back",
  "shop:pc:back:home",
  "shop:pc:back:order:manage",
  // ...
]
```

在printVersion2版本中增加了根据后台配置，切换路由的隐藏显示判断。

后续可能还会有更多的类似操作。

#### 菜单vuex

当然路由也是全局数据，放到vuex里面统一管理。

```javascript
import { deepClone } from "@/utils/utils"
import { isPrintVersion1Hide } from '@/utils/printVersion'
import { menusReq, permissionsReq } from "@/api/menus"

/** 菜单路由相关的信息 */
interface MenusInfo {
  /** 当前的菜单路由信息 */
  currentMenus: object[],
}

/** 通过权限值过滤菜单路由（旧版可优化） */
function deepFormatMenu(isChan, sliders, permissions) {
  const arr = []
  const hasPermission = (value) => {
    // 没有权限配置则不用校验
    return !value || permissions.includes(value)
  }
  sliders.forEach(item => {
    if (isChan) { // 连锁
      if (item.isChan !== false) {
        if (item.chiildren) {
          item.chiildren = deepFormatMenu(isChan, item.chiildren, permissions)
        }
        if (hasPermission(item.permission ? item.permission.chain : null)) {
          arr.push(item)
        }
      }
    } else { // 门店
      if (item.isChan !== true) {
        if (item.chiildren) {
          item.chiildren = deepFormatMenu(isChan, item.chiildren, permissions)
        }
        if (hasPermission(item.permission ? item.permission.shop : null)) {
          arr.push(item)
        }
      }
    }
  })
  return arr
}

const menusInfo = {
  state: (): MenusInfo => ({
    currentMenus: [],
  }),
  mutations: {
    /** 更具当前的后台的配置信息获取到现在的路由 */
    GET_CURRENT_MENUS(state: MenusInfo, data: { menusRes: object[], permissionsRes: string[], isChan: boolean }) {
      const { menusRes, permissionsRes, isChan } = data

      /** 部分路由需要通过某些字段过滤，这里删除对应权限值start */
      const needFilterPermissionList = []
      // 是否是因打印升级隐藏老版打印
      if (isPrintVersion1Hide()) {
        needFilterPermissionList.push(PermissionKey.PrinterManage)
      }
      const permissions = permissionsRes.filter(i => !needFilterPermissionList.includes(i))
      /** 部分路由需要通过某些字段过滤，这里删除对应权限值start */

      // 老代码
      if (isChan) {
        permissions.push('chain')
      } else {
        permissions.push('shop')
      }
      const currentMenus = deepFormatMenu(isChan, menusRes, permissions)

      state.currentMenus = currentMenus
    }
  },
  actions: {
    async getCurrentMenus({ commit, getters }) {
      /** 去服务器获取当前的【菜单列表】与【权限值列表】 */
      Promise.all([menusReq(), permissionsReq()]).then(([menusRes, permissionsRes]) => {
        commit('GET_CURRENT_MENUS', {
          menusRes,
          permissionsRes,
          isChan: getters.isChanGetters
        })
      })
    }
  },
  getters: {
    isChanGetters(state, getters, rootState) {
      return rootState.moduleA.isChan
    }
  }
}
export default menusInfo
```

### 补全局的功能

**选择门店与连锁**、**营业状态切换**、**用户口令与退出**、**搜索订单**根据老版功能平移，替换相关全局字段。

### 小结

- 先重构菜单，再平移补充全局功能。

- 维护全局状态MenusInfo。
  - 通过getCurrentMenus统一更新路由信息。
  - needFilterPermissionList控制路由的相关配置。

## old后台现有的功能模块

### 页面整理收集

[excel整理](https://w4ib2x4t86.feishu.cn/sheets/L4pEssEBkhvZN1tHDk4cVhXon4d)后台所有的路由，包括有**old后台以及v3后台的页面主路由**。

截止目前（23年11月15前版本路由）总共139个主路由。`有44个old主路由需要迁移至v3，占总体的约32%。`

### 页面迁移流程

> 这里建议先从简单的页面开始迁移，熟悉之后再迁移比较复杂的页面。

  1. 查看[excel整理](https://w4ib2x4t86.feishu.cn/sheets/L4pEssEBkhvZN1tHDk4cVhXon4d)，筛选`所属项目`为`old`的项（则是需要迁移的页面）。
  2. 更新[excel整理](https://w4ib2x4t86.feishu.cn/sheets/L4pEssEBkhvZN1tHDk4cVhXon4d)，**开发前**，在`开发人员`写上自己的大名（避免出现多人迁移一个页面的情况）。
  3. 迁移页面（[注意事项](#注意事项)）。

### 页面迁移规则

主要涉及页面文件、路由添加、组件、全局组件、方法、样式的目录，以及相关迁移方式。

#### 页面文件目录以及路由规则

路由名称保持不变。可改变对应的component引用路径。根据现在v3文件夹规则来。

路由：

```javascript
// ...
{
  path: '/login', // 保持不变
  name: 'login',
  component: login, // 更改或者保持不变
  meta: {
    title: '系统登录'
  }
}
```

文件夹目录（这里以【运营中心-首页(门店)】为例）：

```javascript
// old
- src
  - views
    - storeHome
      - index.vue
```

```javascript
// v3
- src
  - pages
    - operationCenter
      - store_home
        - index.vue
```
  
v3的pages文件夹名称说明

```javascript
  - marketingCenter // 营销中心
  - minProgram      // 小程序
  - operationCenter // 运营中心
  - reportCenter    // 报表中心
  - user_center     // 用户中心
```

#### 组件迁移规则

页面组件（保持原有的样子就好了）

```javascript
// old
- src
  - views
    - storeHome
      - components
        - Store.vue
        - storeItem.vue
        - cell_item.vue
      - index.vue
```

```javascript
// v3
- src
  - pages
    - operationCenter
      - store_home
        - components
          - store.vue
          - store_item.vue // 统一使用下划线拼接
          - cell_item.vue
        - index.vue
```
全局组件（统一放在migration文件夹里面

```javascript
// old
- src
  - components
    - Modal
      - account_recharge_pay.vue
```

```javascript
// v3
- src
  - components
    - migration
      - modal
        - account_recharge_pay.vue  // 统一使用下划线拼接
```

#### json数据、方法、图片全局组件同理（统一放在migration文件夹里面）

后面在逐一迁移或者等后面功能改版的时候在进行替换（当然如果有把握可以使用v3的）。

```javascript
// v3
- src
  - assets
    - migration
      - ...  // 统一使用下划线拼接
  - style // 样式可以迁移至同页面平行的目录（不要引用到全局去）
    - migration
      - ...  // 统一使用下划线拼接
  - utils
    - migration
      - ...  // 统一使用下划线拼接
```

## 项目的稳定性

这一步其实很重要，就是可以在不影响开发的前提下更好的实现平稳迁移。目的就是为了在保持现有框架结构不变的情况下，一点点的迁移页面。而且在迁移完成之后可以在test/qa/pre先试运行一段时候之后再发布正式环境，从而实现平稳迁移。

定义独立环境的配置

```javascript
// /package.json

{
  "script": {
    // ...
    "dev:independent": "cross-env env_config=independent NODE_OPTIONS=\"--max_old_space_size=8192\" webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 0.0.0.0",
  }
}
```

```javascript
// /config/independent.env.js

/** independent环境 */
'use strict'
module.exports = {
  NODE_ENV: '"qa"',
  ZERO_ENCRY_VALUE: '"0"', // 0的加密值 pre和正式为 WEqLJ3 qa和testing mRe1R8,
  USERNAME: '"cater"',
  PASSWOED: '"96j58I$J$KQR76MH"',
  SIGN: '"guB&Vy9iM^4kiWd#"',
  IMG_HOST: '"https://img.weizhilian.com/"',
  HOST: '"https://caterapi-qa.weizhilian.com"',
  COS_API: '"https://cater-api-v3-qa.weizhilian.com"',
  APPLY_CODE: '"https://img.weizhilian.com/opla1ettpqleonko80s1keral4"',
  IS_INDEPENDENT: true,
}
```

```javascript
// /src/utils/independent.ts

/**
 * @description v3独立运行的标识
 * @returns {boolean}
 * @todo 用于兼容v3以iframe形式在old运行
 */
export const getIsIndependent = function () {
  console.log('=======当前v3项目运行状态=======', `${process.env.IS_INDEPENDENT ? '独立运行' : '非独立运行'}`)
  return !!process.env.IS_INDEPENDENT
}
```

通过方法getIsIndependent对当前v3项目与独立之后的修改做一个兼容，如下

```javascript
// 正常的修改
// 代码片段（批处理layout, 对modules里面的BaseLayout替换为Layout）
- import BaseLayout from '@/components/BaseLayout/Index/Index.vue'
+ const Layout = () => import('@/views/layout/Layout')
// 代码片段
- component: BaseLayout,
+ component: Layout,

// 兼容处理
// 代码片段
import { getIsIndependent } from '@/utils/independent'
component: getIsIndependent() ? BaseLayout : Layout
```

```javascript
// 登陆页面
// src/router/modules/common.js
import { getIsIndependent } from '@/utils/independent'
const Login = () => import('@/views/login/login')
export default [
  {
    path: '/login',
    name: 'login',
    component: getIsIndependent() ? Login : oldLogin,
    meta: {
      title: '系统登录'
    }
  },
  ...
 ]
```

需要兼容的有：登陆、布局、iframe交互。

### 小结

- 定义兼容环境变量名称IS_INDEPENDENT，以及新的independent环境。
- getIsIndependent方法兼容当前v3项目与独立之后的修改。

## 注意事项

1. 部分功能弹窗v3页面存在使用old后台组件的情况。
2. old后台使用的本地缓存数据（localstorage/sessionstorage/cookie），迁移页面的时候需要注意。
3. 未知问题... 还有没有其他iframe的不为人知的操作。
4. 最近webpack更新后（/deep/ 改为\:v-deep）。