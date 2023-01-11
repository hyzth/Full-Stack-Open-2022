import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToChange = state.find(a => a.id === id)
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    const anecdotes = state.map(a => a.id === id ? updatedAnecdote : a)
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer