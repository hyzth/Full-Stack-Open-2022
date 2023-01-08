const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgray',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className='notification' style={style}>{message}</div>
  )
}

export default Notification