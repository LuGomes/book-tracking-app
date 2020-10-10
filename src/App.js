import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    shelves: { currentlyReading: [], wantToRead: [], read: [] },
  };

  filterByShelf = (allBooks, shelf) => {
    return allBooks.filter((book) => book.shelf === shelf);
  };
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      const currentlyReading = this.filterByShelf(allBooks, "currentlyReading");
      const wantToRead = this.filterByShelf(allBooks, "wantToRead");
      const read = this.filterByShelf(allBooks, "read");
      this.setState({
        allBooks,
        shelves: { currentlyReading, wantToRead, read },
      });
    });
  }
  render() {
    const { shelves } = this.state;
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
                      books={shelves.currentlyReading}
                    />
                    <BookShelf
                      title="Want to Read"
                      books={shelves.wantToRead}
                    />
                    <BookShelf title="Read" books={shelves.read} />
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
