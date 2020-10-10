import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookItem from "./BookItem";

class SearchPage extends Component {
  state = { searchTerm: "", filteredBooks: [] };

  onSearch = (event) => {
    event.persist();
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => this.props.searchBooks(searchTerm));
  };

  addBookToMyLibraryAndUpdateBookShelves = (book, shelf) => {
    this.props.addBookToMyLibrary(book, shelf);
    this.props.updateBookShelves(book, shelf);
  };

  render() {
    const { searchTerm } = this.state;
    const { filteredBooks } = this.props;
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
              onChange={this.onSearch}
            />
          </div>
        </div>
        {filteredBooks.length && (
          <div className="search-books-results">
            <ol className="books-grid">
              {filteredBooks.map((book) => (
                <BookItem
                  key={book.id}
                  book={book}
                  updateBookShelf={this.addBookToMyLibraryAndUpdateBookShelves}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
