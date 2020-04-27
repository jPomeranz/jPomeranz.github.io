import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faSteam } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

function Contact() {
  return (
    <Container style={{ marginTop: "2em" }}>
      <h1>Contact Me</h1>
      <Col>
        <Row>
          <FontAwesomeIcon icon={faGithub} />
          <a
            href="https://github.com/jPomeranz/"
            rel="noopener noreferrer"
            target="_blank"
            className="conLink"
          >
            jPomeranz
          </a>
        </Row>
        <Row>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href="mailto:jrp5kb@virginia.edu" className="conLink">
            jrp5kb@virginia.edu
          </a>
        </Row>
        <Row>
          <FontAwesomeIcon icon={faSteam} />
          <a
            href="https://steamcommunity.com/id/00n/"
            rel="noopener noreferrer"
            target="_blank"
            className="conLink"
          >
            /id/00n
          </a>
        </Row>
      </Col>
    </Container>
  );
}

export default Contact;
