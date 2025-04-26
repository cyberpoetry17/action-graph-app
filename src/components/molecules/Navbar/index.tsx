import { NavLink } from "react-router";
import "./index.css";
import HomeIcon from "../../atoms/HomeIcon";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navbar-link active-link" : "navbar-link"
        }
      >
        <HomeIcon className="navbar-icon" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
