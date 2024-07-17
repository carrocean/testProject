/**
 * @param {*} bill 
 * @param {*} mode 
 * @param {*} id 
 * @description 跳转页面
 */
const openPage = (bill, mode = 'browse', id='', tplid='')=>{
  cb.route.pushPage(`/view/yyarchive/${bill}MobileArchive?terminalType=3&mode=${mode}``${id? '&id=' : ''}${tplid? '&tplid=' : ''}`)
}

/**
 * @param {*} url 
 * @returns 地址上的参数转化为对象
 */
const parseQueryString = (url) => {
  let reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      arr_url = reg_url.exec(url),
      ret = {}

  if (arr_url && arr_url[1]) {
      var str_para = arr_url[1],
          result;
      while ((result = reg_para.exec(str_para)) != null) {
          ret[result[1]] = result[2];
      }
  }
  return ret
};

module.exports = {
  openPage,
  parseQueryString
}
