export default `withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter,
  }),
  // (state:Object, props:Object) => (...payload: any[]) => Object
  {
    incrementOn: ({ counter }) => (value) => ({
      counter: counter + value,
    }),
    decrementOn: ({ counter }) => (value) => ({
      counter: counter - value,
    }),
    resetCounter: (state, { initialCounter = 0 }) => () => ({
      counter: initialCounter,
    })
  }
)`