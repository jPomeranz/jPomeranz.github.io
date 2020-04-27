import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <Container style={{ marginTop: "2em" }}>
      <Row>
        <p>
          Hey there! This is my personal website for testing out new
          technologies and occasionally rambling about personal projects. In my
          free time I enjoy hiking, reading, gardening, lifting weights,
          motorcycling, and wasting time on the interwebs.
        </p>
      </Row>
    </Container>
  );
}

export default Home;
