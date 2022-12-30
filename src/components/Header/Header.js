import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFolderOpen,
  faBook,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand className="link">Jacob Pomeranz</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          <FontAwesomeIcon icon={faUser} />
          <span className="link">About</span>
        </Nav.Link>
        <Nav.Link
          active={false}
          href="/resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <span className="link">Resume</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/books">
          <FontAwesomeIcon icon={faBook} />
          <span className="link">Books</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/contact">
          <FontAwesomeIcon icon={faPhone} />
          <span className="link">Contact</span>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
