import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import TodoList from './screens/todo/TodoList'
import Nav from './components/nav/Nav'
import './App.scss'
export interface NavItem {
  path: string;
  name: string;
}
const nav:NavItem[] = [
  {path: '/all' ,name: 'Всі'},
  {path: '/deleted',name: 'Видалені'}
]
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='todoapp'>
          <Nav nav={nav}/>
          <Routes>
            {nav.map(({path},i) => <Route key={i} path={path} element={<TodoList filter={path} />}/> )}
            <Route path='*' element={<Navigate to='/all' />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
