import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import rawBooks from "./books.txt";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  async componentDidMount() {
    const bookText = await (await fetch(rawBooks)).text();
    this.setState({ books: bookText.split("\n") });
  }

  render() {
    return (
      <Container style={{ marginTop: "2em", marginLeft: "0.5em" }}>
        <h1>Books</h1>
        <Col>
          <ul>
            {this.state.books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </Col>
      </Container>
    );
  }
}

export default Books;
