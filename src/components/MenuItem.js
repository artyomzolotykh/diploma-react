import { NavLink } from "react-router-dom";

const MenuItem = ({link, text}) => {
  return (
      <li className="nav-item">
        <NavLink className="nav-link" to={link}>{text}</NavLink>
      </li>
  )
}

export default MenuItem;