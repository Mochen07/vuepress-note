# 全局数据的分层

```typescript
- logics
  - adapter
  - helpers
  - model
  - service
  - typings
  index.ts // 初始值
```

## 用户信息

### model

当前登陆者的所有信息，接口定义

```typescript
/** 用户信息 */
export interface UserInfo {
  /** 用户id */
  id: number
  /** 用户名称 */
  name: string
  /** token */
  token: string
  /** refreshToken */
  refreshToken: string
}
/** 连锁信息 */
export interface ChainInfo {
  /** 连锁id */
  id: number
  /** 连锁名称 */
  name: string
}
/** 品牌信息 */
export interface Brand {
  /** 品牌id */
  id: number
  /** 品牌名称 */
  name: string
}
export interface BrandInfo extends Brand {
  /** 品牌bid（用于请求头的bid以及品牌列表默认选择的品牌） */
  bId: number
  bName: string
  /** 品牌列表信息 */
  brandList: unknown[]
}
/** 门店信息 */
export interface StoreInfo {
  /** 门店id */
  id: number
  /** 门店名称 */
  name: string
  /** 品牌id */
  bId: number
}
/** 路由信息 */
export interface RouteInfo {
  /** 路由菜单 */
  routeMenu: []
  /** 有权限的路由路径 */
  userRoutePaths: string[]
}
/** 用户model */
export interface User {
  userInfo: UserInfo
  chainInfo: ChainInfo
  brandInfo: BrandInfo
  storeInfo: StoreInfo
  routeInfo?: RouteInfo
}
```

model提供的功能

全局数据关联（只处理大类，比如用户、连锁...）

/** 获取数据 */
/** 更新数据 */
/** 清除数据 */
/** 初始化数据 */

用户

/** 获取用户信息 */
/** 更新用户信息 */

连锁

/** 获取连锁信息 */
/** 更新连锁信息 */
/** 获取用户连锁列表 */
/** 重置连锁信息 */

品牌

/** 获取品牌信息 */
/** 更新品牌信息 */
/** 重置品牌信息 */
/** 获取用户品牌列表 */

门店

/** 获取门店信息 */
/** 更新门店信息 */
/** 重置门店信息 */
/** 获取用户门店列表 */

路由

/** 获取路由信息 */ -> 待完善
/** 初始化路由信息 */ -> 待完善

### service

用户

/** 账号登陆（暂无） */
/** 二维码登陆（暂无） */
/** 登陆数据初始化 */
/** 默认选择连锁/机构 */
/** 获取基础用户信息 */
/** 获取uId */
/** 是否登陆 */
/** 退出登陆 */

连锁

/** 获取连锁信息 */
/** 是否是连锁 */
/** 获取gId */
/** 选择连锁 */
/** 是否开启云音响管理 */
/** 是否开启管辖范围控制 */

品牌

/** 获取品牌信息 */
/** 获取bId */
/** 选择品牌 (目前只有选择连锁设置需要用到此方法) */
/** 连锁选择品牌（连锁下选品牌） */
/** 获取品牌列表 */

门店

/** 获取门店信息 */
/** 是否是门店 */
/** 获取sId */
/** 选择门店 */
/** 当前打印版本 */
/** 是否是旧版本打印 */

### 路由

/** 获取当前的路由数据 */ -> 待完善
/** 路由拦截 */ -> 待完善
