const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.nameValue} onChange={props.nameHandler} />
    </div>
    <div>
      number: <input value={props.numberValue} onChange={props.numberHandler} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

export default PersonForm