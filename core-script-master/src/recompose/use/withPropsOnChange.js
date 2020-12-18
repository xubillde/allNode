export default `withPropsOnChange(
  ['a', 'b'], // shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean
  ({ a, b, ...props }) => {
    return {
      ...props,
      foobar: a + b,
    }
  }
),`