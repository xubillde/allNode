
import { graphql } from 'react-apollo'

// 发现过一个bug, 若这行在最上面，则报错 无法找到该 module
// file://Users/kunsam/web/order-pay-system/api/graphQl/query/xxxxxx.js
import xxxxxx from 'api/graphQl/query/xxxxxx' 

import xxxxxx from 'api/graphQl/mutation/xxxxxx' // file://Users/kunsam/web/order-pay-system/.assist/apollo/graphql/query-config.js


export default graphql(xxxxxx)

// [query配置说明] file://Users/kunsam/web/order-pay-system/.assist/apollo/graphql/query-config.js

// [mutation使用说明] file://Users/kunsam/web/order-pay-system/.assist/apollo/graphql/mutation-config.js

// [使用示例] file://Users/kunsam/web/order-pay-system/.assist/apollo/graphql/use.js