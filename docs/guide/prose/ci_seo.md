# ci打包优化

> 1. 最开始的想法和遇到的问题。单独拉master分支复原记录一下。
> 2. 更具问题，如何解决的，当时又是怎么想的，为什么会这么想。
> 3. 下次遇到同样的问题，是不是可以归纳一下具体会有哪些问题的出现。
> 4. 总结经验与上一条类似。

## 前言

经过这次的构建优化，对package.json有了更深的认识。也消除了一些之前对`npm install`的误解，包括并不限于`node_modules`、`npm cache clean --force`、`fnm`、`webpack的编译与压缩插件`的理解。

## 关于node(v20.11.1)的npm install

问题1:

```javascript
npm ERR! code 1
npm ERR! git dep preparation failed
npm ERR! command /Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/bin/node /Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/bin/npm-cli.js install --force --cache=/Users/mochen/.npm --prefer-offline=false --prefer-online=false --offline=false --no-progress --no-save --no-audit --include=dev --include=peer --include=optional --no-package-lock-only --no-dry-run
npm ERR! npm WARN using --force Recommended protections disabled.
npm ERR! npm WARN old lockfile 
npm ERR! npm WARN old lockfile The package-lock.json file was created with an old version of npm,
npm ERR! npm WARN old lockfile so supplemental metadata must be fetched from the registry.
npm ERR! npm WARN old lockfile 
npm ERR! npm WARN old lockfile This is a one-time fix-up, please be patient...
npm ERR! npm WARN old lockfile 
npm ERR! npm WARN old lockfile vue-loader-v16: No matching version found for vue-loader-v16@16.8.3.
npm ERR! npm WARN old lockfile     at module.exports (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/npm-pick-manifest/lib/index.js:209:23)
npm ERR! npm WARN old lockfile     at RegistryFetcher.manifest (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/pacote/lib/registry.js:119:22)
npm ERR! npm WARN old lockfile     at async Array.<anonymous> (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/build-ideal-tree.js:727:24)
npm ERR! npm WARN old lockfile  Could not fetch metadata for vue-loader-v16@16.8.3 vue-loader-v16: No matching version found for vue-loader-v16@16.8.3.
npm ERR! npm WARN old lockfile     at module.exports (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/npm-pick-manifest/lib/index.js:209:23)
npm ERR! npm WARN old lockfile     at RegistryFetcher.manifest (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/pacote/lib/registry.js:119:22)
npm ERR! npm WARN old lockfile     at async Array.<anonymous> (/Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/build-ideal-tree.js:727:24) {
```

我还无法判断得到是admin-ui包的依赖产生的问题！但是在我解决了admin-ui的package.json里面node（v20.11.1）安装依赖的报错之后问题就解决了。

问题2:

```javascript
npm ERR! code 1
npm ERR! path /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/node-sass
npm ERR! command failed
npm ERR! command sh -c node scripts/build.js
npm ERR! Building: /Users/mochen/Library/Application Support/fnm/node-versions/v20.11.1/installation/bin/node /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/node-gyp/bin/node-gyp.js rebuild --verbose --libsass_ext= --libsass_cflags= --libsass_ldflags= --libsass_library=
npm ERR! gyp info it worked if it ends with ok
```

这是一个node-sass的问题，现在官方推荐使用sass去替换node-sass的依赖。因为高版本的node并不支持node-sass的依赖。所以我找了对应版本的sass与sass-loader。如下

```javascript
"sass": "1.32.13",
"sass-loader": "10.5.2",
```

问题3:

当我npm run serve 或者 npm run docs:dev的时候运行却出现问题了

```javascript
mochen@mochendeMac-mini admin-ui % npm run serve

> admin-ui@1.1.5 serve
> vue-cli-service serve

Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
 INFO  Starting development server...
10% building 2/4 modules 2 active /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/hot/dev-server.jsError: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:68:19)
    at Object.createHash (node:crypto:138:10)
    at module.exports (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at runSyncOrAsync (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:130:11)
    at iterateNormalLoaders (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:232:2)
    at Array.<anonymous> (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
node:internal/crypto/hash:68
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:68:19)
    at Object.createHash (node:crypto:138:10)
    at module.exports (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at Array.<anonymous> (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
    at /Users/mochen/Documents/work/beizeng/xiangmu/admin-ui/node_modules/graceful-fs/graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read/context:68:3) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```

我无法理解这样的错误，但是我得到的答案是升级对应的依赖，就成功运行了。如下

```javascript
"vue": "2.7.16",
"vue-template-compiler": "2.7.16",
```

解决了以上的问题，成功的安装依赖并运行，node升级到v20.11.1完。

## 关于项目打包的优化

我在网上找到了[掘金的文章](https://juejin.cn/post/7236670763272798266)很好的指出了打包速度的问题，并且我在后续找到了关于[打包优化的github仓库](https://github.com/privatenumber/minification-benchmarks)。目前使用了swc的js编译，以及esbuild-loader的压缩，打包速度由原来的6min降到了现在的3min，提升率50%+。当然加上node由v14升级到v20，编译提升了30%左右，现在的打包速度应该在2min以内（这个是我估计的还没有实践，毕竟是ci环境，需要切换node版本，等代码到master之后，再试试看）。还有就是我在本地的打包速度要远高于ci的速度，不管是mac上，还是mac上的linux虚拟机，大概会快上1倍左右，也就是说是前面提到的时间的一半。

## 关于fnm

fnm的安装在github上面有很好的说明，只能说没有好好的看吧，导致了各种走弯路。建议直接在github上面的搜索对应平台的安装方式，一个个的试总能成功的。在安装成功的时候注意查看提示的配置环境变量的对应路径。比如

```javascript
export PATH="$HOME/.cargo/bin:$PATH"
eval "$(fnm env --use-on-cd)"
```

具体在哪个文件里面，看github上面的说明。我的是`~/.bashrc`

然后还可以有一些配置，就比如说清华的镜像，虽然说我也不知道怎么来的哈哈哈，清华的镜像里面有很多的好东西，如果说网络下载困难可以去里面翻一翻，注意查看安装的提示，比如说`brew`现在不支持在mac m2芯片上面安装。

```javascript
export FNM_NODE_DIST_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/
```

(完)

居然花了快2小时，预计1小时...
