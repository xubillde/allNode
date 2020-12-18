import path from 'path'
import templateConfig from '../../config'
import { PACKAGE_BASE_PATH } from '../../../src.config'

// todo 后期快捷键配置绑定在这

export default () => `
// [创建元件请配置] <core ccp>
// [补全] file:/${path.join(PACKAGE_BASE_PATH, templateConfig.snippet.help)}
// [引入组件] ipcp [引入高阶组件] iphoc [引入布局] iplo
`