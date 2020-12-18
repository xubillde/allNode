
// 每有一个state就增加一个方法

// withState

const addCounting = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0)
  })
)


// withStateHandlers
const Counter = withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter,
  }),
  {
    incrementOn: ({ counter }) => (value) => ({
      counter: counter + value,
    }),
    decrementOn: ({ counter }) => (value) => ({
      counter: counter - value,
    }),
    resetCounter: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter,
    }),
  }
)(
  ({ counter, incrementOn, decrementOn, resetCounter }) =>
    <div>
      <Button onClick={() => incrementOn(2)}>Inc</Button>
      <Button onClick={() => decrementOn(3)}>Dec</Button>
      <Button onClick={resetCounter}>Dec</Button>
    </div>
)