import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar">
      <span className="navbar-title">Task Tracker</span>
      <NavLink to="/projects">Projects</NavLink>
    </nav>
  )
}

export default NavBar
