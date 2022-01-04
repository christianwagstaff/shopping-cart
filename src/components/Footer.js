import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <Link to="/admin">Admin</Link>
      <div className="horizontal footer-info">
        <p>Made By Christian Wagstaff</p>
        <a href="https://github.com/christianwagstaff">
          <img
            alt="github icon"
            src="https://img.icons8.com/ios/50/ffffff/github--v1.png"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
