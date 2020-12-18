



import findIndex from 'lodash/findIndex'
import {
  compose,
  withStateHandlers,
  withPropsOnChange
} from 'recompose'


 const withSort = (comp, orders, defaultOrder) => compose(
  withPropsOnChange(
    ['orders'],
    () => ({ orders })
  ),
  withStateHandlers(
    ({ initial = defaultOrder }) => ({ currentOrder: initial }),
    {
      setOrder: ({ currentOrder }) => (key) => ({ currentOrder: key }),
      changeOrder: ({ currentOrder }) => () => {
        const _orderIndex = findIndex(orders, order => (order.key === currentOrder))
        const nextIndex = _orderIndex === orders.length - 1 ? 0 : _orderIndex + 1
        return {
          currentOrder: orders[nextIndex].key
        }
      },
      resetOrder: (_, { initial = defaultOrder }) => () => ({
        currentOrder: defaultOrder
      }),
    }
  )
)(comp)



export default withSort