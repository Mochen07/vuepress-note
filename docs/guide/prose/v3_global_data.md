# kzl-后台全局数据

## 用户信息

更新用户信息

```typescript
userInfoUpdate(data: Partial<UserInfo>): boolean {
}
```

获取用户信息

```typescript
type UserInfoProperty = UserInfo[keyof UserInfo] | UserInfo | undefined

userInfoGet(key?: string): UserInfoProperty {
  const userInfo = userInfoGet()
  return data
}
```

删除用户信息

从localStorage恢复store用户信息(页面登陆持久化使用)

```typescript
userInfoLocEcho(): boolean {}
```

是否登陆

## 机构信息

删除机构信息

```typescript
informationInfoDelete(): boolean {}
```

从localStorage恢复store机构信息

是否是连锁

是否是门店

### 连锁信息

更新连锁信息

获取连锁信息

从接口更新连锁配置信息

获取连锁配置信息

### 品牌信息

获取品牌信息

从接口更新品牌列表信息

获取品牌列表信息

### 门店信息

更新门店信息

获取门店信息

从接口更新门店配置信息

获取门店配置信息

## 路由信息

更新路由信息

获取路由信息

路由拦截方法
