import * as basic from './basic';              // 用于扩展基础组件（一般是表单组件）
import * as formatter from './formatter';      // 用于扩展表格格式化列组件
import * as home from './home';                // 用于扩展首页组件
import * as meta from './meta';                // 用于扩展业务组件（一般是容器组件）
import * as modal from './modal';              // 用于扩展弹窗组件
import * as popover from './popover';          // 用于扩展弹出菜单组件
import portal from './portal';                // 用于扩展门户组件
import * as toolbar from './toolbar';

import deepmerge from 'deepmerge';
// 下推按钮的扩展组件
import yonbuilderMdfExtend from 'yonbuilder-mdf-extend/lib/unify'

const originExtend = {
    basic,
    formatter,
    home,
    meta,
    modal,
    popover,
    portal,
    toolbar
}
export default deepmerge(originExtend, yonbuilderMdfExtend);
