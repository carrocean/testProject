/**
 * 初始化
 * @param {*} vm
 */
 const init = (vm) => {
  console.log('test2 init')
}
/**
 * 数据加载完成
 */
const afterLoadData = (vm) => {
  console.log('test2 afterLoadData')
}

export default {
  afterLoadData,
  init
}