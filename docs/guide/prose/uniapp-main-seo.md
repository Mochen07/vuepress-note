# uniapp主包优化

## 背景

> 开发过程中无感，功能提测主包>2M构建失败❗️。出现比较频繁解决相对耗时。

## 关于小程序分包

- 整个小程序所有分包大小不超过 20M
- 单个分包/主包大小不能超过 2M
- 主包/分饱组件不能使用分包组件 (分包异步化除外, 目前uni不支持)，导致组件逐渐流落到主包
ps: 页面可以异步化使用分包组件（官方未提及，但是可以使用，估计是uni特定的编译带上的），用法如下

```javascript
// pages.json
{
  "pages": [
    {
      "path": "pages/main",
      "style": {
        // ...
        "componentPlaceholder": {
          "base-info": "view",
        }
        // ...
      }
    },
    // ...
  ],
  "subPackages": [
    {
      "root": "pages/addReason",
      "pages": [
        {
          "path": "main",
          "style": {
            // ...
            "componentPlaceholder": {
              "base-info": "view",
            }
            // ...
          }
        }
        // ...
      ]
    }
    // ...
  ]
}
```

## 小程序现有的打包优化

1. @babel/plugin-transform-runtime避免重复引入问题，效果明显。

```javascript
// babel.config.js
const plugins = [
    // ...
    if (process.env.UNI_PLATFORM !== 'h5') {
      plugins.push(['@babel/plugin-transform-runtime', {version: '7.19.6'}])
    }
    // ...
]
```

2. uniapp编译后vendor.js内容分析， 看看是不是有什么特殊的写法，导致分包里面的代码编译到vendor.js里面了。（`/dist/build/mp-weixin/common/vendor.js`）
3. 调整项目文件的目录结构, 统一组件与页面在同一个分包里面, 避免组件出现在主包里面
4. 将一些静态资源上传, 用链接形式获取

## 为便于后续主包优化, 项目开发建议

1. 路径使用绝对路径，尽量不要使用相对路径，方便后续结构调整。

```javascript
import Input from "@/base/components/input.vue" ✅
import Input from  "../../../base/components.vue" ❌
```

2. 不要轻易注册全局组件。因为uniapp的编译模式，全局组件不仅会影响程序的打开速度/增加主包大小， 后续也难以拆分出来。(使用相关全局组件的页面/组件均未引用，拆分中每一个使用此组件的页面/组件都需要引入此组件)
3. 开发时绝对独立的功能直接分包，尽量组件与引用组件的页面放在同一个分包，尽量避免流入主包跨分包调用。
4. 关注uniapp编译时一些合理的建议(如图)

<img height="100" src="http://doc.int.kzl.com.cn/uploads/technology-research/images/m_c7fdf978c62ed858d412d6cac7cf7404_r.png"/>

## 后续主包大小优化解决方案

1. 持续调整项目文件的目录结构
2. uniapp编译后vendor.js内容分析
3. 自定义tabbar，抽离全部的tabbar页面，进入小程序跳转分包页面
4. [分包异步化](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html)。微信提供跨分包引用组件的解决方案，可以在主包异步引入分包组件，可以直接实现组件分包，跨包异步获取
不过现在`uniapp还不支持`可以持续关注[issues](https://github.com/dcloudio/uni-app/issues/2934) 或者引入[构建脚本](https://ask.dcloud.net.cn/article/39622)的方式

官方文档分包相关 [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html) [UniApp](https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages)
