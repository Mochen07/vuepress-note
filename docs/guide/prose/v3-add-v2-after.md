# kzl-v3合并总结

## 开发说明

1. 现在v3整合的v2文件在v2_files的文件加里面，不建议在现有v3的基础上去使用v2_files的代码了，方便后续优化、迁移、删除废弃的代码、删除插件等。

1. v2全局组件名称统一加上了`V2`，避免与v3组件重名（本是同源，分离之后各有造诣）。

1. v2的vuex部分名称有更改，引入store，详见`@/store/index.js`, 不建议在现有v3的基础上去实用v2的module，方便后续优化删除对应module。

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

1. 梳理现有全局数据（v2、v3）两套，两者处于脱节的状态，可能会出现数据不同步的情况，对后续开发造成困扰，如何维护。![vuex全局状态](../../../draw/v3_vuex.drawio.svg)

   1. 用户/连锁/品牌/门店数据定义。
   2. 封装获取的数据model.ts逻辑。
   3. vuex调用model.ts生成数据，以及维护全局数据（并在后续维护起来，确保数据的准确性）。
   4. 用现在有的vuex数据基础上去兼容之前的v3以及v2的全局数据，确保更新后v3与v2的数据也能更新。

2. package.json里面去除v2不需要的依赖或者替换掉，具体增加了有哪些可以参考[这次的提交](http://git.int.kzl.com.cn/k/wzl-cater-h5/commit/232cbdf9f08f40a44667cef3a0e7e9d7c3b08fec)。

3. 关于iframe的v2与v3的交互全局去除。消除不必要的性能影响，合并后的项目已经没有再用了。

4. 关于v2_files里面main.js里面的优化，比如：删除未使用的全局定义、一两个页面使用的就不使用全局定义了改为局部引用等等。

5. 关于v2_files里面一些没有用的文件。比如`_copy`命名的文件、无用图片、静态的文件、未使用的页面文件、遗弃的方法/样式 等等。

6. 关于v2新增的static看一下是否可以干掉，可以参考[这次的提交](http://git.int.kzl.com.cn/k/wzl-cater-h5/commit/99602ff13484d5a865c5dce0accf6c5cff9753bd)。

7. 清除代码中无用的console.log。

8. v3的ci构建打包优化。

### 第二阶段

1. 页面的迁移方案。

2. 组件合并方案。梳理项目中的组件，有些类似的就给合并了，全局组件。

   1. 优惠券弹窗的替换。之前v2与v3使用的是两种优惠券弹窗逻辑。
   2. ...

3. 关于iframe交互兼容的改写。目前使用
