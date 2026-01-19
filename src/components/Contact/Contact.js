import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faSteam } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

function Contact() {
  return (
    <div
      className="container"
      style={{ marginTop: "2em", marginLeft: "0.5em" }}
    >
      <h1>Contact Me</h1>
      <div>
        <div>
          <FontAwesomeIcon icon={faGithub} size="1x" />
          <a
            href="https://github.com/jPomeranz/"
            rel="noopener noreferrer"
            target="_blank"
            className="conLink"
          >
            jPomeranz
          </a>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href="mailto:jrp5kb@virginia.edu" className="conLink">
            jrp5kb@virginia.edu
          </a>
        </div>
        <div>
          <FontAwesomeIcon icon={faSteam} size="sm" />
          <a
            href="https://steamcommunity.com/id/00n/"
            rel="noopener noreferrer"
            target="_blank"
            className="conLink"
          >
            /id/00n
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
