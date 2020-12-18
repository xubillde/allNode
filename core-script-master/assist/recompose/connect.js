// compose 与 connect的例子
/* ┌────────────────────────────────────────────────────────────────────────────┐  */
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

// [引入事件] file://Users/kunsam/web/order-pay-system/actions/index.js
// import { addCount } from 'actions'

// [引入selector] ipsl
// file://Users/kunsam/web/order-pay-system/selectors/index.js

compose(

  connect(createSelector(
    // api-selector slf${api.shortcut} / slr${api.shortcut} 注意引入
    selectLight(),
    (
      light
    ) => ({
      light
    })
  ), {  }), // addCount

)
/*  └────────────────────────────────────────────────────────────────────────────┘ */


// multiple selectors

connect(
  (state) => ({
    workflow: selectFetchGetFlowRes()(state),
    projectModel: selectFetchGetProjectmodelRes()(state)
  })
)




