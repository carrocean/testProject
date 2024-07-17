const common = require('@mdf/create-app/lib/webpack.common');
const parts = require('@mdf/create-app/lib/webpack.parts');

const configEnv = require("./src/common/config.env");

const domainDefine = parts.domainDefine({
  domainKey: configEnv.DOMAIN_KEY // 领域domainKey
})

module.exports = parts.uniquePlugin(common, domainDefine)
