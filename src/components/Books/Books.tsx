import { Component } from "react";

interface BooksState {
  books: string[];
}

class Books extends Component<Record<string, never>, BooksState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { books: [] };
  }

  async componentDidMount() {
    const response = await fetch("/books.txt");
    const bookText = await response.text();
    this.setState({
      books: bookText.split("\n").filter((book) => book.trim()),
    });
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
