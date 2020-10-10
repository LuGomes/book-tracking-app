import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    filteredBooks: { currentlyReading: [], wantToRead: [], read: [] },
  };

  getfilteredBooksFromIds = (filteredBookIds) => {
    const filteredBooks = { currentlyReading: [], wantToRead: [], read: [] };
    for (const shelf in filteredBookIds) {
      for (let id of filteredBookIds[shelf]) {
        const book = this.state.allBooks.filter((book) => book.id === id)[0];
        book.shelf = shelf;
        filteredBooks[shelf].push(book);
      }
    }
    return filteredBooks;
  };

  updateBookShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then((filteredBookIds) => {
      const filteredBooks = this.getfilteredBooksFromIds(filteredBookIds);
      this.setState({ filteredBooks });
    });
  };

  filterByShelf = (allBooks, shelf) => {
    const books = allBooks.filter((book) => book.shelf === shelf);
    return books;
  };

  sortBooksByShelves = (allBooks) => {
    const currentlyReading = this.filterByShelf(allBooks, "currentlyReading");
    const wantToRead = this.filterByShelf(allBooks, "wantToRead");
    const read = this.filterByShelf(allBooks, "read");
    this.setState({
      allBooks,
      filteredBooks: { currentlyReading, wantToRead, read },
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => this.sortBooksByShelves(allBooks));
  }

  render() {
    const { filteredBooks } = this.state;
    return (
      <>
        <Route
          exact
          path="/"
          render={() => (
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf
                      title="Currently Reading"
                      books={filteredBooks.currentlyReading}
                      updateBookShelf={this.updateBookShelves}
                    />
                    <BookShelf
                      title="Want to Read"
                      books={filteredBooks.wantToRead}
                      updateBookShelf={this.updateBookShelves}
                    />
                    <BookShelf
                      title="Read"
                      books={filteredBooks.read}
                      updateBookShelf={this.updateBookShelves}
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
          )}
        />
        <Route path="/search" component={SearchPage} />
      </>
    );
  }
}

export default BooksApp;
