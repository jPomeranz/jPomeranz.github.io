import { useEffect, useState } from "react";
import "./Books.css";
import Modal from "./Modal/Modal";

interface BookData {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  infoLink?: string;
}

const parseBook = (bookString: string) => {
  const parts = bookString.split(" by ");
  return {
    title: parts[0].trim(),
    author: parts[1]?.trim() || "",
  };
};

const Books = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetch("/books.txt");
      const bookText = await response.text();
      setBooks(bookText.split("\n").filter((book) => book.trim()));
    };
    loadBooks();
  }, []);

  const fetchBookData = async (title: string, author?: string) => {
    const query = `intitle:${encodeURIComponent(title)}${
      author ? `+inauthor:${encodeURIComponent(author)}` : ""
    }`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`,
    );
    const data = await response.json();
    return data.items?.[0]?.volumeInfo || null;
  };

  const handleBookClick = async (bookString: string) => {
    const { title, author } = parseBook(bookString);
    setLoading(true);
    setError(null);

    try {
      const bookData = await fetchBookData(title, author);
      if (bookData) {
        setSelectedBook(bookData);
      } else {
        setError("Book information not found");
      }
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      setError(`Failed to fetch book information: ${errMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setError(null);
  };

  const isModalOpen = loading || !!error || !!selectedBook;

  const modalContent = loading ? (
    <div className="loading">Loading book information...</div>
  ) : error ? (
    <div className="error-message">{error}</div>
  ) : selectedBook ? (
    <div className="modal-body">
      {selectedBook.imageLinks?.thumbnail && (
        <img
          src={
            selectedBook.imageLinks.thumbnail.startsWith("http:")
              ? selectedBook.imageLinks.thumbnail.replace(/^http:/, "https:")
              : selectedBook.imageLinks.thumbnail
          }
          alt={selectedBook.title}
          className="book-thumbnail"
        />
      )}

      <div className="book-details">
        <h2>{selectedBook.title}</h2>

        {selectedBook.authors && (
          <p className="book-authors">by {selectedBook.authors.join(", ")}</p>
        )}

        {selectedBook.description && (
          <p className="book-description">{selectedBook.description}</p>
        )}

        {selectedBook.infoLink && (
          <a
            href={selectedBook.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-link"
          >
            View on Google Books →
          </a>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div className="books-page">
      <div
        className="container"
        style={{ marginTop: "2em", marginLeft: "0.5em" }}
      >
        <h1>Books</h1>
      </div>

      <ul className="books-list">
        {books.map((book, index) => {
          const { title, author } = parseBook(book);
          return (
            <li
              key={index}
              className="book-item"
              onClick={() => handleBookClick(book)}
            >
              <span className="book-title">{title}</span>
              {author && <span className="book-author">by {author}</span>}
            </li>
          );
        })}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Books;
