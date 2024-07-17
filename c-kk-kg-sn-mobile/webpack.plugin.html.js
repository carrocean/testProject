const fs = require('fs')
const { resolve } = require('path');

const html = `<!DOCTYPE html>
<html>
<body>
  <script src="./mobile.extend.min.js" ></script>
  <script src="./mobile.custom.min.js" ></script>
</body>
</html>`

module.exports = class TemplateWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap('TemplateWebpackPlugin', () => {
      const { domainKey } = this.options;
      const filepath = resolve(`build/${domainKey}/javascripts/index.html`)
      fs.writeFileSync(filepath, html)
    });
  }
};
