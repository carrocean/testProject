const packageJson = require('../../package.json');

/**
 * 1. 全局配置的环境变量
 * 2. DOMAIN_KEY 领域应用的domainKey
 * 3. HTTP_SERVICE_BASEURL Java服务地址(仅本地调试和独立Node需要配置)
 * 4. HTTP_MAIN_ORIGIN 主站域名（仅本地调试需要配置）
 */
const config = {
  DOMAIN_KEY: packageJson.domainKey || '',
  // HTTP_SERVICE_BASEURL: '', // 本地调试和独立Node时必输
  // HTTP_MAIN_ORIGIN: '' // 本地调试必输
}
module.exports = config;
