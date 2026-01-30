import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFolderOpen,
  faBook,
  faPhone,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Jacob Pomeranz</div>
      <div className={`navbar-nav ${isMenuOpen ? "show" : ""}`}>
        <Link
          to="/"
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="link">About</span>
        </Link>
        <a
          href="/resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <span className="link">Resume</span>
        </a>
        <Link
          to="/books"
          className={`nav-link ${isActive("/books") ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faBook} />
          <span className="link">Books</span>
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faPhone} />
          <span className="link">Contact</span>
        </Link>
      </div>
      <ThemeToggle />
      <button
        className="navbar-toggler"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
}

export default Header;
