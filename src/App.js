import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import BookItem from "./BookItem";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => this.setState({ books }))
      .then(() => console.log(this.state.books));
  }
  render() {
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
                {this.state.books.length && (
                  <div className="list-books-content">
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <BookItem book={this.state.books[0]} />
                            </li>
                            <li>
                              <BookItem book={this.state.books[1]} />
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <BookItem book={this.state.books[2]} />
                            </li>
                            <li>
                              <BookItem book={this.state.books[3]} />
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <BookItem book={this.state.books[4]} />
                            </li>
                            <li>
                              <BookItem book={this.state.books[5]} />
                            </li>
                            <li>
                              <BookItem book={this.state.books[6]} />
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
