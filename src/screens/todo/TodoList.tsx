import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { addTodo, toggleTodo, deleteAsyncTodo } from '../../store/todoSlice'
import InfinityList from '../../components/infinityList/InfinityList'
import TodoInput from '../../components/input/TodoInput'
import './Todo.scss'

interface Props {
  filter: string
}

const TodoList: React.FC<Props> = ({ filter }) => {
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()
  const inputValue = useRef('')
  const todoScrollBlock = useRef<HTMLDivElement>(null)

  const addTodoHandler = () => {
    if (inputValue.current.trim() !== '') {
      dispatch(addTodo(inputValue.current))
      if (todoScrollBlock.current) {
        const firstListItem = todoScrollBlock.current.querySelector(
          '.block-todo-wrapper'
        )
        if (firstListItem) {
          firstListItem.scrollTop = 0
        }
      }
    }
  }

  const toggleTodoHandler = (id: number) => {
    dispatch(toggleTodo(id))
  }
  const reviewTodoHandler = (id: number) => {
    //@ts-ignore
    dispatch(deleteAsyncTodo(id))
  }

  const filteredTodos =
    filter === '/deleted' ? todos.filter((todo) => todo.deleted) : todos

  const infinityScrollHeight = window.innerHeight - 100
  return (
    <div className='block-todo' ref={todoScrollBlock}>
      {filter === '/all' ? (
        <TodoInput
          addTodoHandler={addTodoHandler}
          callBack={(value) => (inputValue.current = value)}
        />
      ) : (
        <div className='block-empty'></div>
      )}
      <InfinityList
        classParent='block-todo-wrapper'
        itemHeight={36}
        windowHeight={infinityScrollHeight}
      >
        {filteredTodos.map((todo) => {
          return (
            <span
              key={todo.id}
              onClick={(e) => {
                if (filter === '/deleted') {
                  e.currentTarget.classList.remove('deleted')
                  reviewTodoHandler(todo.id)
                  return
                }
                toggleTodoHandler(todo.id)
              }}
              className={`${todo.deleted ? 'deleted' : ''}`}
            >
              {todo.text}
            </span>
          )
        })}
      </InfinityList>
    </div>
  )
}

export default TodoList
