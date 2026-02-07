import { useEffect, useState } from "react";
import "./Books.css";
import Modal from "./Modal/Modal";

interface BookData {
  title: string;
  authors?: string[];
  thumbnail?: string;
  infoLink: string;
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
    const query = author
      ? `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
      : `title=${encodeURIComponent(title)}`;
    const response = await fetch(
      `https://openlibrary.org/search.json?${query}&fields=key,title,author_name,cover_i&limit=1`,
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    const book = data.docs?.[0];

    if (!book) return null;

    return {
      title: book.title,
      authors: book.author_name,
      thumbnail: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : undefined,
      infoLink: `https://openlibrary.org${book.key}`,
    };
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
      {selectedBook.thumbnail && (
        <img
          src={
            selectedBook.thumbnail.startsWith("http:")
              ? selectedBook.thumbnail.replace(/^http:/, "https:")
              : selectedBook.thumbnail
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

        {selectedBook.infoLink && (
          <a
            href={selectedBook.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-link"
          >
            View on Open Library →
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
