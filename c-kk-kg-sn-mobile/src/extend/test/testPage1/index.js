/**
 * 初始化
 * @param {*} vm
 */
import './test.less'

const init = (vm) => {
  console.log('test1 init')
}
/**
 * 数据加载完成
 */
const afterLoadData = (vm) => {
  console.log('test1 afterLoadData')
}

export default {
  afterLoadData,
  init
}