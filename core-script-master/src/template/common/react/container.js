
export default ({ key }) => `
const ${key} = (props) => {

  return (
    <div className="${key}">
      <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
    </div>
  )
}

export default compose(

)(${key})
`