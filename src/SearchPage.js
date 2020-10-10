import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookItem from "./BookItem";
import * as _ from "lodash";

class SearchPage extends Component {
  state = { searchTerm: "", filteredBooks: [] };
  search = (event) => {
    let searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      if (searchTerm) {
        BooksAPI.search(searchTerm).then((filteredBooks) => {
          this.setState({ filteredBooks });
        });
      } else {
        this.setState({ filteredBooks: [] });
      }
    });
  };
  render() {
    const { searchTerm, filteredBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={this.search}
            />
          </div>
        </div>
        {filteredBooks.length && (
          <div className="search-books-results">
            <ol className="books-grid">
              {filteredBooks.map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
