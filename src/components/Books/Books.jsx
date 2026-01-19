import { Component } from "react";
import rawBooks from "./books.txt";

class Books extends Component {
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
      <div
        className="container"
        style={{ marginTop: "2em", marginLeft: "0.5em" }}
      >
        <h1>Books</h1>
        <div>
          <ul>
            {this.state.books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Books;
