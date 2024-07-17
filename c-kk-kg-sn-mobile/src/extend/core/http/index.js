

import axios from "axios";

const getOrigin = () => window.location.origin

function request({ url, method, data, headers, params, needCookie = false, timeout = 30000, responseType = "json", paramsType = 1 }, callback) {
  const _url = getOrigin() + url
  return mtl?.request({
    url: _url, method, data, headers, params, needCookie, timeout, responseType, paramsType,
    success: function (res) {
      //mtl处理成功回调
    },
    fail: function (err) {
      //mtl处理过的错误回到
    },
    complete: function (res) {
      // 当前使用这个错误失败都返回的回调
      if (res.code == 200) {
        callback(parseRes(res.data))
      } else {
        callback(res)
      }

    }
  })

}
//暂时用axios
function get(url, callback) {
  axios
      .get(`${url}`)
      .then((response) => {
        if(response.status == 200){
          callback(parseRes(response.data))
        }
      })
  // return request({ url, method: 'get' }, callback)
}
function post(url, data, callback) {
  return request({ url, data, method: 'post' }, callback)
}

const parseRes = (res) => {
  return res?.code == 200 ? res?.data : res?.message
}
function Post(url, params, headers) {
  return new Promise((resolve, reject) => {
    request({url, params, headers, method: 'post'},(res) =>{
      if(res) {
        resolve(res)
      } else {
        reject(res?.message)
      }
    })
  })
}
function Get(url, params, headers ) {
  return new Promise((resolve, reject) => {
    request({url, params, headers, method: 'get'},(res) =>{
      if(res) {
        resolve(res)
      } else {
        reject(res?.message)
      }
    })
  })
}
export {
  get,
  post,
  Post,
  Get,
  request,
  parseRes
}
