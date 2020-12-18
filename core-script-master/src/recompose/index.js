

export default [
  {
    class: 'Props',
    // mapProps or withProps, which will create new handlers every time when it get updated
    children: [
      {
        key: 'mapProps',
        comment: '映射所有props' 
      },
      {
        key: 'withProps',
        comment: '带上新的props'
      },
      {
        key: 'withPropsOnChange',
        comment: '传入新的props(当指定的prop-keys更新后才会重新计算)' 
      },
      {
        key: 'defaultProps',
        comment: '' 
      }
    ]
  },
  {
    class: 'State - Handler',
    children: [
      {
        key: 'withHandlers',
        comment: '传入处理方法 - immutable' 
      },
      {
        key: 'withState',
        comment: '传入状态' 
      },
      {
        key: 'withStateHandlers',
        comment: '传入状态和复杂处理方法' 
      }
    ]
  },
  {
    class: 'Common',
    children: [
      {
        key: 'setPropTypes',
        comment: '' 
      },
      {
        key: 'setDisplayName',
        comment: '' 
      }, 
      {
        key: 'lifecycle',
        comment: '' 
      }, 
      {
        key: 'compose',
        comment: '组合方法' 
      },
      {
        key: 'nest',
        comment: '嵌套方法' 
      }
    ]
  }
]
