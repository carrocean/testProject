# 一、准备工作
## 1. 下载专业版脚手架
## 2. 上传专业版配置
以下是例子，`hrcloud-staff-mgr`为专业版`domainKey`
```javascript
'hrcloud-staff-mgr': {
    base_url: '/yonbip-hr-staff',
    submit_url: '/iuap-apcom-workflow',
    preview_domain: 'hrcloud-staff-mgr',
    extends: [
      '/iuap-yonbuilder-designer/iuap-front/ide/extcenter/library/getFileIdByLibraryCode?code=hr_mgr'
    ],
  },
```
# 二、编写入口文件
入口文件是`extend`文件夹下的`index.js`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22552623/1652784700442-19d9f3e7-4c5b-4b1b-a4a2-6a1c39b0d1f8.png#clientId=uf8ce084f-7051-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=824&id=u3a589099&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1030&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100428&status=done&style=none&taskId=ue55031cc-48c8-428c-b2b0-e4900e30a10&title=&width=1536)
在此文件里注册`domainKey`下的脚本，注册方式如下
```javascript
import testPage1 from './test/testPage1/index'
import testPage2 from './test/testPage2/index'

const extendScripts = {
  应用编码_页面billnum1_VM: { ...testPage1 },
  应用编码_页面billnum2_VM: { ...testPage2 }
}
// dep的格式: 应用编码/应用编码_页面billnum_VM.Extend.js
cb.extend.registerScripts('domainkey', function (dep) {
  // 从dep中截取出《应用编码_页面billnum1_VM》部分
  const js = dep?.split('应用编码/')?.[1]?.split('.Extend.js')?.[0] || ''

  return {
    doAction: function (name, viewmodel) {
      if (this[name]) this[name](viewmodel);
    },
    init: function (viewModel) {
      // 在init中调用extendScripts对象中对应页面的init方法
      extendScripts?.[js]?.init?.(viewModel)
      viewModel.on('afterLoadData', function () {
        // 在afterLoadData中调用extendScripts对象中对应页面的afterLoadData方法
        extendScripts?.[js]?.afterLoadData?.(viewModel)
      });
    }
  }
})
```
  
① 创建某页面的扩展脚本文件，文件中导出`init`和`afterLoadData`，写法参考第三步
② 在总的入口文件`extends/index.js`中导入写的扩展脚本，加入到`extendScripts`对象中，`key`为页面的唯一标识，格式建议写成`应用编码_页面billnum_VM`
③ 使用`registerScripts`方法注册`domainkey`下的脚本，参数`dep`是当前打开页面请求的扩展脚本路径，格式为`应用编码/应用编码_页面billnum_VM.Extend.js`
④ 处理参数`dep`，截取页面的唯一标识，在`init`和`afterLoadData`中执行`extendScripts`对象中对应的唯一标识的脚本的方法即可
# 三、编写某页面的扩展脚本
格式如下，其中`vm`为页面的`viewmodel`模型
```javascript
const init = (vm) => {
  // init执行的内容
}

const afterLoadData = (vm) => {
  // afterLoadData执行的内容
}

export default {
  init,
  afterLoadData  
}
```
# 四、构建扩展脚本并在工程中引入
写完扩展脚本后，先执行`ynpm i`安装依赖，之后执行`npm run build`，执行完之后会在`build/javascripts`路径下生成`mobile.extend.js`文件，上传到固定地址，然后在第一步的专业版配置的`extends`数组中加入这个固定地址即可
