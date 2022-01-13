import logo from '../img/header-logo.png';
import { NavLink } from "react-router-dom";
import HeaderMenu from './HeaderMenu';
import HeaderControls from './HeaderControls';

const Header = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/diploma-react/">
              <img src={logo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <HeaderMenu/>
              <HeaderControls/>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;