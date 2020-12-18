

withHandlers({
  onChange: props => event => {
    props.updateValue(event.target.value)
  },
  onSubmit: props => event => {
    event.preventDefault()
    submitForm(props.value)
  }
})