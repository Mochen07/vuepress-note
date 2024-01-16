# kzl-v3合并优化

## 开发说明

1. 现在v3整合的v2文件在v2_files的文件加里面，不建议在现有v3的基础上去使用v2_files的代码了，方便后续优化、迁移、删除废弃的代码、删除插件等。

1. v2全局组件名称统一加上了`V2`，避免与v3组件重名（本是同源，分离之后各有造诣）。

1. v2的vuex部分名称有更改，引入store，详见`@/store/index.js`, 不建议在现有v3的基础上去使用v2的module，方便后续优化删除对应module。

1. v2的router没有更改，引入store，详见`@/router/index.js`，因为登陆、路由在v2，所以现在路由的拦截、权限、守卫都在v2，引入到了v3。

1. 登陆之后的v2数据转v3数据的方法封装，详见`import {initV3GlobalData} from '@/v2_files/utils/v2_add_v3_info.js'`。

1. 样式这一块，屏蔽了element的主题设置（项目构建warning的警告（6个）是由于element-ui过低，目前是2.4.1，需要升级到2.15.7（参考），跨度太大目前暂不升级。），v2的全局样式全局引入在了v3，解决类名与v3重复的问题。后续v3写样式的时候也需要稍微注意一下，避免v2全局样式的影响，方便后续优化。

1. iframe的交互方式修改成发布订阅的模式。存在4种交互：v2的发布/订阅；v3的发布/订阅。

## 开发的注意事项

### 安装依赖失败

v3的webpack版本升级后安装依赖报错，需要python环境，可以到[python官网下载](https://www.python.org/downloads/release/python-2716/)对应的版本安装。

如果python默认不是需要的版本需要手动配置一下。

```bash
# 查看系统环境变量定义目录中的可执行文件路径
which python2
# 配置当前node版本npm的配置项
npm config set python /usr/local/bin/python2
```

### ci构建ETIMEDOUT

跨年后，在ci构建过程中出现出现了`ETIMEDOUT`的情况。

本地通过删除node_modules以及npm cache clean --force，复现。

解决方法：

- 删除package-lock.json
- npm install // 拉取依赖成功
- 保存package-lock.json // ci构建成功

## 优化点

### 第一阶段

> 解决后续开发问题、运行性能问题

1. 梳理现有全局数据（v2、v3）两套，两者处于脱节的状态，可能会出现数据不同步的情况，对后续开发造成困扰，需要统一维护起来。
  <img
    src="https://gitee.com/Mochen_7/draw_io/raw/main/vuepress_note/v3_vuex.drawio.svg"
    onerror="this.src='https://raw.githubusercontent.com/Mochen07/draw_io/e42cbc208012e9c708513d50381e65f56190625e/vuepress_note/v3_vuex.drawio.svg'"
    alt="vuex全局状态"
  />

   1. 用户/连锁/品牌/门店数据接口定义。
   2. 封装获取的数据model.ts逻辑。
   3. vuex调用model.js生成数据，以及维护全局数据（后续维护起来，确保数据的准确性）。
   4. 用现在有的vuex数据基础上去兼容之前的v3以及v2的全局数据，确保更新后v3与v2的数据也能更新。
   5. 在现有vuex状态维护的基础上制定本地缓存方案。确保刷新/新页面/多窗口门店切换数据的准确性。

1. package.json里面去除v2不需要的依赖或者替换掉，具体增加了有哪些可以参考[这次的提交](http://git.int.kzl.com.cn/k/wzl-cater-h5/commit/232cbdf9f08f40a44667cef3a0e7e9d7c3b08fec)。

1. 清理旧版本iframe交互（v2与v3的交互全局去除）。消除不必要的性能/内存泄漏影响，合并后的项目已经没有再用了。

1. 关于v2_files里面main.js里面的优化，比如：删除未使用的全局定义、一两个页面使用的就不使用全局定义了改为局部引用等等。

1. 关于v2_files里面一些没有用的文件。比如`_copy`命名的文件、无用图片、静态的文件、未使用的页面文件、遗弃的方法/样式 等等。

1. 关于v2新增的static看一下是否可以干掉，可以参考[这次的提交](http://git.int.kzl.com.cn/k/wzl-cater-h5/commit/99602ff13484d5a865c5dce0accf6c5cff9753bd)。

1. 关于iframe交互兼容的改写（$emit、$on）优化。目前项目合并在一起一些通讯是没有必要的。比如：直接引用组件、操作方法就好。

1. 清除代码中无用的console.log。

1. v3的ci构建打包优化。这里可能会对后续的优化给出一些建议。

1. 解决控制台waning.

### 第二阶段

> 消除v2_files文件夹，解决v2、v3文件分割的情况。

1. [v2页面的迁移v3方案](#v2页面的迁移v3的方案)。目标就是让v2_files这个文件夹消失。

    1. 具体有哪些页面需要迁移，包括子页面。
    2. 迁移v2的router、vuex。
    3. 页面迁移的先后顺序，以及分配尽量避免页面之间的冲突。

2. 梳理路由/权限/菜单以及跳转逻辑，统一维护起来。（现在已经很难维护了，建议重构，还有单词错误的坑）

   1. 问题：
      1. 当前使用的是假路由。挂载了所有的路由，在通过路由拦截跳转页面。
      2. 菜单维护了连锁/门店两套，权限值也是两套。
      3. layout里面也有拦截，还有iframe的渲染交互。
   2. 解决思路：
      1. 直接挂在所有路由。
      2. 菜单单独维护一套逻辑（参考方法 getMenuFunc）。
      3. 通过菜单筛选菜单页面 路由拦截决定页面跳转（参考数据 allowPathList）。
      4. layout重构，梳理交互逻辑，现在是鱼龙混杂。

3. 组件合并方案。梳理项目中的组件，有些类似的就给合并了。

   1. 优惠券弹窗的替换。之前v2与v3使用的是两种优惠券弹窗逻辑。
   2. 选择门店、选择品牌等。
   3. 关于一些基础组件的封装比如说input就有好几种。

### 第三阶段

> 项目代码优化

1. 前端目录维护方案。
2. 开发规范。
3. 前端数据的维护方案，现在每个迭代一套数据。

## v2页面的迁移v3的方案

### 页面整理收集

[excel整理](https://w4ib2x4t86.feishu.cn/sheets/L4pEssEBkhvZN1tHDk4cVhXon4d)后台所有的路由，包括有**v2后台以及v3后台的页面主路由**。

**开发前**，在`开发人员`写上自己的大名（避免出现多人迁移一个页面的情况）。

路由名称保持不变。改变对应的component引用路径。根据v3项目规范来。

### router

先全部搬过来再进行整理，特定的文件夹。

### vuex

先全部搬过来再进行整理，特定的文件夹。

### 规则

> 优先处理登陆页面和layout页面。

#### 路由页面

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
// v2
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

#### 页面组件

页面组件（保持原有的样子就好了）

```javascript
// v2
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

#### 组件/全局组件（统一放在v2文件夹里面）

```javascript
// v2
- src
  - components
    - Modal
      - account_recharge_pay.vue
```

```javascript
// v3
- src
  - components
    - v2
      - modal
        - account_recharge_pay.vue  // 统一使用下划线拼接
```
