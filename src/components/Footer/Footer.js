import React from "react";
import "./Footer.css";

function Footer() {
  const date = new Date();
  return <div className="footer">{`© Copyright ${date.getFullYear()}.`}</div>;
}

export default Footer;
