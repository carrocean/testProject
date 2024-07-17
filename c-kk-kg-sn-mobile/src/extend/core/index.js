
/**
 * @param {*} vm
 */
function initialize(vm) {
  console.log('initialize')
  vm['setProps'] = function (id,data) {
    Object.keys(data).map(function (k) { vm.get(id)?.setState(k, data?.[k]) })
  }
  vm['executeEvent'] = function (id, event, callback) {
    vm?.on(`${id}_${event}`, function (param) {
      callback(param)
    })
  }
}

export {
  initialize
}
