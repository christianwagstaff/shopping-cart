import { NavLink } from "react-router-dom";
import "../styles/navbar.css"

const NavBar = () => {
  return (
    <nav>
      <h3 className="logo">Planty</h3>
      <ul className="nav-links">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/shop">
          <li>Shop</li>
        </NavLink>
        <NavLink to="/cart">
          <li>Cart</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
