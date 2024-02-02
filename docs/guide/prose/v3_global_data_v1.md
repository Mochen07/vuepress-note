# 全局数据方法调用

`./userInfo` 用户信息

```typescript
/** 更新用户信息 */
export function storeInfoUpdate(updateData: Partial<StoreInfo>): StoreInfo {
  1. 更新用户信息
  2. 设置用户信息
  3. 特殊字段变更判断
}
/** 获取用户信息 */
type StoreInfoProperty = StoreInfo[keyof StoreInfo] | StoreInfo
export function storeInfoGet(key?: string): StoreInfoProperty {
  1. 获取用户信息
}
/** 删除用户信息 */
export function userInfoRemove(): boolean {
  1. 删除用户信息
}
/** 从localStorage恢复用户信息 */
export function userInfoGetLocal(): UserInfo {
  1. 从localStorage恢复用户信息
}
/** 是否登陆 */
export function userInfoIsLogin(): boolean {
  1. 是否登陆
}
```

`./information` 机构信息

```typescript
/** 删除机构信息 */
export function informationRemove () {
  1. 删除机构信息
}
/** 从localStorage恢复机构信息 */
export function informationLocalGet() {
  1. 从localStorage恢复机构信息
}
```

`./information/chainInfo` 机构信息/连锁信息

```typescript
/** 更新连锁信息 */
export function chainInfoUpdate(updateData: Partial<ChainInfo>): ChainInfo {
  1. 更新连锁信息
  2. 设置连锁信息
  3. 特殊字段变更判断
}
/** 获取连锁信息 */
type ChainInfoProperty = ChainInfo[keyof ChainInfo] | ChainInfo
export function chainInfoGet(key?: string): ChainInfoProperty {
  1. 获取连锁信息
}
/** 删除连锁信息 */
export function chainInfoRemove() {
  1. 删除连锁信息
}
/** 从localStorage恢复连锁信息 */
export function chainInfoGetLocal(): ChainInfo {
  1. 从localStorage恢复连锁信息
}
/** 是否是连锁 */
export function chainInfoIsChain(): boolean {
  1. 是否是连锁
}
/** 从接口更新连锁配置信息(异步) */
function chainConfigApiUpdate(updateData: Partial<ChainInfo['configInfo']>):门店配置 {
}
/** 获取连锁配置(异步) */
export function chainConfigGet() {
  1. 通过懒加载的形式去获取值，维护部分的字段，主要是为了把逻辑弄起来，比如路由的渲染，还有品牌的全局渲染需要用到的特殊字段，后期如果需要增加则随时可以加上。
  2. 连锁下需要：管辖范围控制、云音响管理； 门店下面需要：打印管理新旧版本号。
}

```

`./information/brandInfo` 机构信息/品牌信息

```typescript
/** 更新品牌信息 */
export function brandInfoUpdate(updateData: Partial<BrandInfo>): BrandInfo {
  1. 更新品牌信息
  2. 设置品牌信息
  3. 特殊字段变更判断
}
/** 获取品牌信息 */
type BrandInfoProperty = BrandInfo[keyof BrandInfo] | BrandInfo
export function brandInfoGet(key?: string): BrandInfoProperty {
  1. 获取品牌信息
}
/** 删除品牌信息 */
export function brandInfoRemove() {
  1. 删除品牌信息
}
/** 从localStorage恢复品牌信息 */
export function brandInfoGetLocal(): BrandInfo {
  1. 从localStorage恢复品牌信息
}

/** 从接口更新品牌配置信息(异步) */
export function brandConfigApiUpdate() {
  1. 从接口更新品牌配置信息（异步）
}
/** 获取品牌配置(异步) */
export function brandConfigGet() {
  1. 获取品牌配置(异步)
}
```

`./information/storeInfo` 机构信息/门店信息

```typescript
/** 更新门店信息 */
export function storeInfoUpdate(updateData: Partial<StoreInfo>): StoreInfo {
  1. 更新门店信息
  2. 设置门店信息
  3. 特殊字段变更判断
}
/** 获取门店信息 */
type StoreInfoProperty = StoreInfo[keyof StoreInfo] | StoreInfo
export function storeInfoGet(key?: string): StoreInfoProperty {
  1. 获取门店信息
}
/** 删除门店信息 */
export function storeInfoRemove() {
  1. 删除门店信息
}
/** 从localStorage恢复门店信息 */
export function storeInfoGetLocal(): StoreInfo {
  1. 从localStorage恢复门店信息
}
/** 是否是门店 */
export function storeInfoIsStore(): boolean {
  1. 是否是门店
}

/** 从接口更新门店配置信息(异步) */
export function storeConfigApiUpdate() {
  1. 从接口更新门店配置信息(异步)
}
/** 获取门店配置(异步) */
export function storeConfigGet() {
  1. 获取门店配置(异步)
}
```

`./router` 路由信息

```typescript
/** 更新路由信息 */
export function routeUpdate() {
  1. 更新路由信息
}
/** 路由权限（路由拦截） */
export function routePermission() {
  1. 路由权限（路由拦截）
}
```
