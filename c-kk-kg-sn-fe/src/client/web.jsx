// 打包入口
cb.extend.loadExtendResource(process.env.__DOMAINKEY__, import('./web'));

// 引入扩展样式
import './web/styles';
