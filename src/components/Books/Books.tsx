import { useEffect, useState } from "react";
import "./Books.css";

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


  const fetchBookData = async (title: string, author: string) => {
    const query = `intitle:${encodeURIComponent(title)}${
      author ? `+inauthor:${encodeURIComponent(author)}` : ""
    }`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`
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
      setError("Failed to fetch book information");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setError(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedBook || error) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedBook, error]);

  return (
    <div
      className="container"
      style={{ marginTop: "2em", marginLeft: "0.5em" }}
    >
      <h1>Books</h1>
      <div>
        <ul className="books-list">
          {books.map((book, index) => (
            <li
              key={index}
              className="book-item"
              onClick={() => handleBookClick(book)}
            >
              {book}
            </li>
          ))}
        </ul>
      </div>

      {loading && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="loading">Loading book information...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="error-message">{error}</div>
          </div>
        </div>
      )}

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-body">
              {selectedBook.imageLinks?.thumbnail && (
                <img
                  src={selectedBook.imageLinks.thumbnail.startsWith('http:')
                    ? selectedBook.imageLinks.thumbnail.replace(/^http:/, 'https:')
                    : selectedBook.imageLinks.thumbnail}
                  alt={selectedBook.title}
                  className="book-thumbnail"
                />
              )}

              <div className="book-details">
                <h2>{selectedBook.title}</h2>

                {selectedBook.authors && (
                  <p className="book-authors">
                    by {selectedBook.authors.join(", ")}
                  </p>
                )}

                {selectedBook.description && (
                  <p className="book-description">
                    {selectedBook.description}
                  </p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
