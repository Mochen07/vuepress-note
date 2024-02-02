# 全局数据的分层

## 用户信息

### model

当前登陆者的所有信息，接口定义

```typescript
/** 用户信息interface */
export interface UserInfo {
  /** 用户id */
  id: number;
  /** 用户名称 */
  name: string;
  /** token */
  token: string;
  /** refreshToken */
  refreshToken: string;
}
/** 连锁信息interface */
export interface ChainInfo {
  /** 连锁id */
  id: number;
  /** 连锁名称 */
  name: string;
}
/** 品牌信息interface */
export interface BrandInfo {
  /** 品牌id */
  id: number;
  /** 品牌名称 */
  name: string;
  /** 品牌列表信息 */
  brandList: unknown[];
}
/** 门店信息interface */
export interface StoreInfo {
  /** 门店id */
  id: number;
  /** 门店名称 */
  name: string;
}
/** 路由信息interface */
export interface RouteInfo {
  /** 路由菜单 */
  routeMenu: [];
  /** 有权限的路由路径 */
  userRoutePaths: string[];
}

/** 用户model interface */
export interface User {
  userInfo: UserInfo;
  chainInfo: ChainInfo;
  brandInfo: BrandInfo;
  storeInfo: StoreInfo;
  routeInfo: RouteInfo;
}
```

model提供的功能

全局数据关联（只处理大类，比如用户、连锁...）

1. fetch
2. update
3. clear

用户

1. init
2. fetch
3. update

连锁

1. fetch（获取时候没有再init）
2. init（目前是在项目里面去找的后面得依赖接口才行）
3. update

品牌

1. fetch
2. init
3. update
4. reset

门店

1. fetch
2. init
3. update
4. reset

路由

1. fetch
2. update

### service

用户

1. 获取基础用户信息
2. 获取uid
3. 是否登陆
4. 退出登陆

连锁

1. 是否是连锁
2. 获取连锁信息
3. 获取gid
4. 是否开启云音响管理
5. 是否开启管辖范围控制
6. 更新门店信息

品牌

1. 获取品牌信息
2. 获取bid
3. 重置品牌信息
4. 获取品牌信息列表

门店

1. 是否是门店
2. 获取门店信息
3. 获取sid
4. 当前打印版本
5. 是否是旧版本打印

### 路由

1. 获取当前的路由数据
2. 路由拦截
