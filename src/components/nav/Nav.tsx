import { NavLink } from 'react-router-dom'
import { NavItem } from '../../App'
import './Nav.scss'
interface NavProps {
  nav: NavItem[]
}
const Nav = ({ nav }: NavProps) => {
  return (
    <nav className='nav'>
      <ul>
        {nav.map(({ path, name }, i) => (
          <li key={i}>
            <NavLink to={path}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
