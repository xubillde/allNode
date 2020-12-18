
// 选择项目列表数据 选择其它相关数据
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { pure, compose, setDisplayName, setPropTypes, withProps } from 'recompose'

import { addCount } from 'actions'
import { selectLight } from 'selectors'
import {
  fetchGetCommentsSuccess,
} from 'selectors/list/fetchGetComments.js'

import projectTable from 'constants/table/project.js'
import ProjectListContainer from 'containers/Project/list'

//ipslap{api.shortcut} import { fetchApolloAllReviews } from 'selectors/apollo/list/allReviews.js'

const DATA_FIELD_MAP = {
  [projectTable.columnKeys.index]: 'index',
  [projectTable.columnKeys.name]: 'name',
  [projectTable.columnKeys.pages]: 'pages',
  [projectTable.columnKeys.comps]: 'components',
  [projectTable.columnKeys.events]: 'events',
  [projectTable.columnKeys.bugs]: 'bugs',
  [projectTable.columnKeys.desc]: 'description',
}

export default compose(
  setDisplayName('ProjectListParser'),
  setPropTypes({
    title: PropTypes.string,
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
