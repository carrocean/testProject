// 打包入口
cb.extend.loadExtendResource(process.env.__DOMAINKEY__, import('./mobile'));

// 引入扩展样式
import './mobile/styles';