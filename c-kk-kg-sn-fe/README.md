# MDF 4.1

## 1. 使用文档

1. 文档地址：https://www.yuque.com/yonbip
2. 新工程请使用此MDF4.1脚手架，原有旧工程升级统一Node和去IFrame请移步：[《性能优化去除iframe脚手架升级方案》](https://www.yuque.com/docs/share/8ec6edc7-20a4-42ca-8c33-1dae26cd52ed?#)

## 2. 安装

1. 需要安装`ynpm`工具使用内网镜像源进行安装私有包`@mdf/xxx`

```bash
$ npm install ynpm-tool -g
```
2. 内网执行`ynpm install`安装即可

## 3. 扩展机制
1. 扩展脚本在`src/business`中扩展

2. 扩展组件在`src/client/web|mobile/components`中扩展

3. 扩展reducers在`src/client/mobile/redux/reducers.jsx`中扩展

4. 扩展路由在`src/client/mobile/routes/index.jsx`中扩展

5. 扩展样式在`src/client/mobile/styles`中扩展

6. 扩展Action`src/client/common/biz/actions.js`中扩展

7. 在`src/client/web|mobile.jsx`中还可以注入多语资源和变量

## 4. 环境配置
1. `src/common/config.env.js` 修改启动接口地址

## 5. 调试、部署

- MDF4.1启动两个服务、前端和后端node.js部分，命令整合之后可以启动一套命令；
- MDF4.1部署方式有两种，一种是独立Node、另一种则是统一Node，官方`强烈建议`使用统一Node；
- 如果流水线和统一Node启用了扩展资源上传OSS，则只需要启动前端debug:extend命令即可，详细请移步：[《领域前端构建过程优化指南》](https://www.yuque.com/docs/share/54e291d8-8681-4777-bea6-5a4f34b61b11?#)
- 统一Node中内置了大量的变量可配置，如：是否使用异步导出、是否开启缓存、是否开启UI模板，详细请移步：[《统一Node配置项说明》](https://www.yuque.com/docs/share/fa55133c-ffe8-4923-963d-cb9b157b0472?#)；

**用户可根据部署环境不同，自由扩展；需要在`src/common/config.env.js`中配置对应的服务地址**

本地调试启动：

```bash
# 1. 启动默认调试，会开启前后端服务，默认接口为src/web/common/config.env.js中的daily
npm run debug

# 2. 单独启动前端工程
npm run debug:extend

# 3. 单独启动后端node.js服务
npm run debug:server
```

部署上线服务：

```bash
# 1. 构建web端部署
npm run build

# 2. 启动服务
npm run start
```

## 6. 开发注意事项
**请遵守如下规范：**

1、为减小构建产物体量，组件包不再单独引入，如果需要使用metaui-web或metaui-mobile中的组件，可通过控制台打印cb.components查看支持的内容，引入示例如下：

```bash
1）组件依赖
PC端：
const { Form, Button, Card } = window.TinperNext; // 不需要单独引入TinperNext
const { TreeRefer, Label, Input } = require('mdf-metaui-web').basic; // 不需要单独引入@mdf/metaui-web
移动端：
import { Button, DatePicker } from '@mdf/baseui-mobile'; // 需要单独引入@mdf/baseui-mobile
const { Refer } = require('mdf-metaui-mobile').basic; // 不需要单独引入@mdf/metaui-mobile

2）脚本依赖
const { setMode, getWebUrl } = viewmodel.biz.action().common; // 不需要单独引入@mdf/cube
```

2、修改package.json中的domainKey为本领域

3、访问单据

```bash
移动端访问简易门户（PC无）：
测试环境： http://mdf-node.test.app.yyuap.com
日常环境： https://mdf-server-daily.yyuap.com
预发和生产：用 window.__MDF_NODE_SERVER__ 在控制台打印出来就是

访问统一Node单据页面（PC和移动通用）：
示例：https://mdf-server-daily.yyuap.com/meta/voucherlist/st_purchaseorderlist?domainKey=upu

访问本地单据页面（PC和移动通用）：
示例：http://local.yyuap.com:3003/meta/voucherlist/st_purchaseorderlist
```

4、调试本地扩展代码

- 方式1：在url上添加 `scriptUrl=http://localhost:3004/static` 参数即可加载本地扩展代码
- 方式2：通过`Resource Override`替换线上资源，详情请移步：[《去Iframe后领域本地调试指南》](https://www.yuque.com/docs/share/0d5a9746-b5f5-4e2e-81b6-05d55a2270b4 )

5、独立Node配置框架版本（统一Node不需要）

```bash
process.env.MDF_RESOURCE_VERSION
process.env.MDF_MOBILE_RESOURCE_VERSION
```
独立Node需要在package.json或流水线环境变量中配置框架版本，以上具体变量值请向MDF框架开发团队索取

## 7. 常见问题

1、加载不到扩展代码

如果控制台信息中报` call... `字样的错误，则说明是MANIFEST版本不对
此时应注意区分，调试本地Node中的代码用`npm run debug:extend`，调试线上Node中的代码应该用`npm run debug:extend:prod`
两个命名的区分就是MANIFEST不一样

2、扩展代码语法错误

此问题应先排查是否问题1导致的，判断依据就是刷新整个浏览器，再打开单据看控制台有无` call... `字样的错误
如果不是上面的问题，则就一定是扩展代码有真正的语法错误，此时还是找控制台报错信息，一定会有其它的报错信息
再有就是排查扩展脚本第一行`cb.define`的第一个参数是否`process.env.__DOMAINKEY__`