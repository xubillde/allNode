

// 一定要定义好组件的接口 https://facebook.github.io/react/docs/typechecking-with-proptypes.html

// ptr
{
  list: PropTypes.arrayOf(PropTypes.shape({

    id: PropTypes.string.isRequired,

    pages: PropTypes.number.isRequired,

    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),

  })).isRequired
}