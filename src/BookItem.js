import React from "react";

const BookItem = ({ book, updateBookShelf }) => {
  // Do not render books with missing thumbnails
  if (!book.imageLinks) return null;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(e) => updateBookShelf(book, e.target.value)}
            value={book.shelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors &&
          book.authors.map((author) => (
            <span key={book.id + author}>{author}</span>
          ))}
      </div>
    </div>
  );
};

export default BookItem;
