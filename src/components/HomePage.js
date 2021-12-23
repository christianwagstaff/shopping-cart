import "../styles/homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="top">
        <h1 className="logo">Planty</h1>
      </div>
      <div className="bottom">
        <Link to="shop">
          <button className="start-shopping">Find Your Perfect Plant</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
