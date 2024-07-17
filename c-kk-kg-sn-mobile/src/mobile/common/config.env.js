/*
* 全局配置的环境变量
*
* @param HTTP_SERVICE_BASEURL
* 请求的后台地址，需要配置
* 根据工程环境配置不通变量
*
* @param HTTP_PRINT_SERVER
* 打印地址，需配置
*
* @param HTTP_SERVER_PORT
* node 服务端口号
*
* @param HTTP_USER_LOGIN
* 用户登陆接口，用于前端调试，获取token，需要配置
*
* @param USER_LOGIN_PARAMS
* 配置登陆的参数，用于前端调试，获取token，需要配置
*
* @param AUTH_WHITELIST
* 不做token校验的白名单，接口，页面等，需要配置
*
* @param HTTP_CONTENT_TYPE
* 接口请求的content-type类型，可扩展，内置 XLS JSON PDF FORM
*
*
* @param IS_REDIRECT_LOGIN
* BOOLEAN token失效是否重定向登陆页
* */

/* 根据不同的环境，配置地址 */
let preview_domain = '.noconfig.env.index.jsx';
let base_url = '';
let workflow_url = ''; // 审批url
let print_url = '';
let tpl_url = '';
let hpapaas_url = '';
let submit_url = '';
let upload_url='';
const config_env = process.env.SERVER_ENV;
const sessionStorage = window.sessionStorage
if (window.location?.search) {
  const domainKeyTemp = window.location.search.split('domainKey=')
  if (domainKeyTemp && domainKeyTemp.length > 1) {
    const domainKey = domainKeyTemp[1].split('&')[0]
    if (domainKey && domainKey !== 'developplatform') {
      sessionStorage.setItem('domainKey', domainKey);
      console.log('xxx setconfig domainKey: ', domainKey)
    }
  }
}

const a = window.location.host
const b = a.split('.com')[0]
const c = b.split('.')
const d = c[c.length - 1] ? c[c.length - 1] : 'yyuap'
const domain = '.' + d + '.com'

const origin = window.location.origin
switch (config_env) {
  case '2020':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break;
  case 'pre':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break;
  case 'production':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break;
  case 'yonbip':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain= domain;
    break;
  case 'sandbox':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break;
  case 'daily':
    base_url =  '/c-kk-kg-sn-be';                //业务接口
    tpl_url =  '/c-kk-kg-sn-be';                 //ui模板
    print_url = '';                             //暂时不用
    workflow_url =  '';                         //暂时不用
    hpapaas_url = '/iuap-yonbuilder-mobile';    //设计器
    submit_url = '/iuap-apcom-workflow';        //审批流
    upload_url = '/iuap-apcom-file';            //协同附件
    preview_domain = domain;
    break;
  case 'test':
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break
  default:
    base_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    tpl_url =  'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    print_url = 'https://bizadplm.yybip.cn/c-kk-kg-sn-be';
    workflow_url =  'https://bizadplm.yybip.cn';
    hpapaas_url = '/iuap-yonbuilder-mobile';
    submit_url = '/iuap-apcom-workflow';
    upload_url = '/iuap-apcom-file';
    preview_domain = domain;
    break;
}


export default {
  HTTP_UPLOAD_URL: upload_url,
  HTTP_HPAPAAS_URL: hpapaas_url,
  HTTP_SUBMIT_URL: submit_url,
  HTTP_PREVIEW_DOMAIN: preview_domain,
  HTTP_SERVICE_BASEURL: base_url,
  HTTP_TPL_SERVER_URL: tpl_url,
  HTTP_PRINT_SERVER: print_url,
  HTTP_SERVER_PORT: 3003,
  HTTP_WORKFLOW_SERVER: workflow_url,
  HTTP_USER_LOGIN: '/user/authorize',
  USER_LOGIN_PARAMS: {
    username: 'u8c_vip@163.com',
    password: '',
  },
  AUTH_WHITELIST: ['/demo', '/menu'],

  HTTP_CONTENT_TYPE: {
    // JSON: 'application/json',
  },
  IS_REDIRECT_LOGIN: true,
  excludeToken: true
}
