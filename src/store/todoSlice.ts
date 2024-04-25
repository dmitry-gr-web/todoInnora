import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
interface Todo {
  id: number
  text: string
  deleted: boolean
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.unshift(action.payload)
      },
      prepare(text: string) {
        return { payload: { id: +new Date(), text, deleted: false } }
      },
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.deleted = !todo.deleted
      }
    },
    reviewTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.deleted = false
      }
    },
  },
})
export const { reviewTodo } = todoSlice.actions
export const { addTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer

export const deleteAsyncTodo = (
  id: number,
): ThunkAction<void, Todo[], unknown, PayloadAction<number>> => {
  return (dispatch: Dispatch<PayloadAction<number>>) => {
    setTimeout(() => {
      dispatch(reviewTodo(id))
    }, 450)
  }
}
