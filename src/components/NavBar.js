import { Link } from "react-router-dom";
import "../styles/navbar.css"

const NavBar = () => {
  return (
    <nav>
      <h3>Planty</h3>
      <ul className="nav-links">
        <Link to="/home">
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
