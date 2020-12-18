

// except the new props are only created when one of the owner props specified by shouldMapOrKeys changes
withPropsOnChange(
  ['a', 'b'], // shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean
  ({ a, b, ...props }) => {
    return {
      ...props,
      foobar: a + b,
    }
  }
)

withProps(props => {

  return {}
})