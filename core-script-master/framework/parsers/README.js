
import PropTypes from 'prop-types'

import { pure, compose, setDisplayName, setPropTypes, withProps } from 'recompose'

import ProjectListContainer from 'containers/Project/list'

// ------------------------------------
// 数据容器必引入的模块
// ------------------------------------
// 1. PropTypes 模块  import PropTypes from 'prop-types'
// 2. recompose 模块  import { pure, compose, setDisplayName, setPropTypes, withProps } from 'recompose'
// 3. container 组件容器  e.g. import ProjectListContainer from 'containers/Project/list'

// ------------------------------------
//  数据容器可能引入的模块
// ------------------------------------
// 1. redux-connect 连接数据 import { connect } from 'react-redux'
// 2. reselect 模块 e.g. import { createSelector } from 'reselect' https://github.com/reactjs/reselect
// 3. 自定义selectors e.g. import { selectLight } from 'selectors/~'
// 4. api-selectors e.g. import { fetchXSuccess, selectXState, selectXRes, selectXCount } from 'selectors/list/fetchX.js'
// 5. 固定常量  e.g. import projectTable from 'constants/table/project.js'
// 6. actions 事件方法 e.g. import { addCount } from 'actions'
// 7. lodash 处理模块 import X from 'lodash/X'

// ------------------------------------
//  数据容器中进行的工作
// ------------------------------------
// 1. 引入数据（可能包括服务端初始请求数据、上一层级页面传递的数据、store中的数据、常量配置等）
// 2. 定义数据接口
// 3. 加工需要加工的数据 define\map\filter\concat等等
// 4. 正确输出数据容器 export default 


export default compose(
  setDisplayName('ProjectListParser'),
  setPropTypes({
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      pages: PropTypes.number.isRequired,
      components: PropTypes.number.isRequired,
      events: PropTypes.number.isRequired,
      bugs: PropTypes.number.isRequired
    })).isRequired
  }),
  withProps({
    tableColumns: projectTable.column.map(col => ({ ...col, dataIndex: DATA_FIELD_MAP[col.key] }))
  }),
  connect(createSelector(
    // api-selector slf${api.shortcut} / slr${api.shortcut} 注意引入
    selectLight(),
    (
      light
    ) => ({
      light
    })
  ), { addCount }), // here write dispatch
  pure
)(ProjectListContainer)
