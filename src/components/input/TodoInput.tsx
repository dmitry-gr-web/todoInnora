import { useState, useEffect } from 'react'
import { IconPlus } from '../../assets/Icons'
import './TodoInput.scss'

interface TodoInputProps {
  addTodoHandler: () => void
  callBack?: (string: string) => void
}
const TodoInput: React.FC<TodoInputProps> = ({ addTodoHandler, callBack }) => {
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    callBack && callBack(inputValue)
  }, [inputValue])
  return (
    <div className='block-input'>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodoHandler()
            setInputValue('')
          }
        }}
        placeholder='Введіть назву...'
      />
      <button
        onClick={() => {
          addTodoHandler()
          setInputValue('')
        }}
      >
        <IconPlus />
      </button>
    </div>
  )
}

export default TodoInput
