/**
 * 需要根据billnum动态引入
 * 相关信息可以从url获取
 * 本地调试调试打包命令
 *
 */
// 需要动态引入
import testPage1 from './test/testPage1'
import testPage2 from './test/testPage2'

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
      // 在init中调用扩展脚本的init方法
      extendScripts?.[js]?.init?.(viewModel)
      viewModel.on('afterLoadData', function () {
        // 在afterLoadData中调用扩展脚本的afterLoadData方法
        extendScripts?.[js]?.afterLoadData?.(viewModel)
      });
    }
  }
})
