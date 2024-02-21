# 全局数据的分层

```typescript
- logics
  - user
    - helpers // 常量
    - model // 数据源
    - service // 业务方法
    - typings // interface 或 type 或 enum
```

## 数据拆分逻辑

UserService提供了根据不同业务去操作数据或者获取数据。比如：getUId()、getBId()、getGId()...。数据源来源于静态私有变量userModel`(new UserModel())`。

UserModel提供了基本的数据操作方法以及获取方法，比如：数据源user、设置setUserObj方法、从服务器获取数据（reqUserGroupList、reqUserBrandList...）等。同时具备数据持久化功能，(`数据源user`、`localStorage`、`vuex`)数据始终是保持同步的。

对应数据获取方法，如下：

`数据源user -> UserService下的this.userModel.user`

`localStorage -> localStore.getItem(USER_LOCAL_STORAGE)`

`vuex -> this.$store.state.global_data_v3`

<img
  src="https://gitee.com/Mochen_7/draw_io/raw/main/vuepress_note/global_data.drawio.svg"
  onerror="this.src='https://raw.githubusercontent.com/Mochen07/draw_io/2980c0eb53b1ec7fa61ada753976c9a91c8e3280/vuepress_note/global_data.drawio.svg'"
  alt="全局数据"
/>

## UserService

> service提供的功能，注意区分同步与异步方法

用户

1. loginInit
   1. 直接塞了用户信息数据，没有区分登陆业务，后续可做优化。
   2. 机构信息初始化，默认获取当前用户集团列表的第一个，有连锁设置取连锁设置，没有连锁设置取品牌列表第一个的品牌，的门店列表的第一个。
2. getUId
3. isLogin
4. logout
   1. 退出登陆

集团

1. selectGroup
   1. 选择集团，有连锁设置取连锁设置，没有连锁设置取品牌列表第一个的品牌，的门店列表的第一个。
2. isGroup
3. isChain
   1. 同isGroup
4. getGId
5. isControl
   1. 是否开启管辖范围控制
6. isCloud
   1. 是否开启云音响管理

品牌

1. selectBrand
   1. 选择品牌
2. selectBrandGroup
   1. 集团下切换品牌（连锁设置下，页面里面的品牌切换）
3. getBId
4. getBrandList
   1. 获取当前集团下的品牌列表（不分页）

门店

1. selectStore
   1. 选择门店
2. getSId
3. isStore
4. getPrintVersion
   1. 当前门店的打印版本
5. isPrintVersion1Hide
   1. 是否是版本升级后，v1需要隐藏的内容

路由

1. getAccessPermissionKeys
   1. 获取当前用户所拥有的权限值

## UserModel

> model提供的功能

1. initData
   1. 提供初始值
2. get user
   1. 提供数据
   2. 数据本地持久化
3. set user
   1. 更新数据（内存、localStage、vuex）
4. clear方法
   1. 清除缓存以及内存数据初始化
5. setUserObj
   1. 设置user对象下key（userInfo、groupInfo...）的值，类似于Object.assign
6. resetUserObj
   1. 与setUserObj方法类似，作用初始化user对象下key的值
7. syncVuex
   1. 同步vuex用的
8. getReqHeaders
   1. 提供请求头数据（uid,sid,bid,gid）
9. reqUserGroupList
   1. 集团-获取用户集团列表
10. [GroupApiFuncName.reqControlConfig]
    1. 集团-管辖范围控制的接口请求处理
11. [GroupApiFuncName.reqCloudConfig]
    1. 集团-云音响的接口请求处理
12. reqUserBrandList
    1. 获取用户品牌列表
13. [BrandApiFuncName.reqUserBrandListAll]
    1. 品牌-接口获取当前用户的品牌列表
14. reqUserStoreList方法
    1. 获取用户门店列表
15. [StoreApiFuncName.reqStoreDetail]
    1. 门店-接口获取当前门店详情
16. getRouterPermissionKeys
    1. 获取当前用户的菜单权限值

## 已经实现的功能点

> 植入后台项目全局数据联动。

1. 登陆后默认选中当前用户对应的机构信息，获取菜单路由权限。
2. 右上角切换集团、品牌、门店 数据联动。（集团下切换品牌@龙辉）。
3. 菜单生成。
4. 业务设置（云音响管理切换、新老版本打印切换）菜单数据联动。
5. 后台跨窗口数据同步。

## 未实现的功能点

1. 右上角切换集团、品牌、门店 数据联动仍然需要刷新同步老数据，需要兼容。
   1. 清理老的，不需要的数据。
   2. 整理v2、v3全局数据与现有数据的映射关系。（在设置新数据的同时，需要去兼容老数据，后续逐步替换成新的）
2. 登陆业务区分（扫码登陆、账号密码登陆），现在是直接塞了用户登陆成功后的信息。（低优先级）
3. 页面老的全局数据，局部替换。（打算页面在页面迁移的时候统一弄）
