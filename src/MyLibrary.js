import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class MyLibrary extends React.Component {
  render() {
    const { sortedBooks, updateBookShelves } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                title="Currently Reading"
                books={sortedBooks.currentlyReading}
                updateBookShelf={updateBookShelves}
              />
              <BookShelf
                title="Want to Read"
                books={sortedBooks.wantToRead}
                updateBookShelf={updateBookShelves}
              />
              <BookShelf
                title="Read"
                books={sortedBooks.read}
                updateBookShelf={updateBookShelves}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default MyLibrary;
