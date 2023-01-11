import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.createNotification(`you created '${content}'`, 5)
  }

  return (
    <>
      <h3>create new</h3>
      <form onSubmit={create}>
        <div>
          <input name='anecdote' type='text' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)