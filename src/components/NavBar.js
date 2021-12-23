import { Link } from "react-router-dom";
import "../styles/navbar.css"

const NavBar = () => {
  return (
    <nav>
      <h3 className="logo">Planty</h3>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
