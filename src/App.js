import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MyLibrary from "./MyLibrary";
import * as _ from "lodash";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    sortedBooks: { currentlyReading: [], wantToRead: [], read: [] },
    filteredBooks: [],
  };

  searchBooks = (searchTerm) => {
    if (!this.debouncedSearch) {
      this.debouncedSearch = _.debounce((searchTerm) => {
        if (searchTerm) {
          BooksAPI.search(searchTerm).then((filteredBooks) => {
            this.setState({ filteredBooks });
          });
        } else {
          this.setState({ filteredBooks: [] });
        }
      }, 200);
    }
    this.debouncedSearch(searchTerm);
  };

  addBookToMyLibraryAndUpdateBookShelves = (book, shelf) => {
    const newFilteredBooks = this.state.filteredBooks.slice();
    const index = newFilteredBooks.findIndex((b) => b.id === book.id);
    newFilteredBooks.splice(index, 1);
    book.shelf = shelf;
    newFilteredBooks.push(book);
    this.setState(
      (prevState) => ({
        allBooks: [...prevState.allBooks, book],
        filteredBooks: newFilteredBooks,
      }),
      () => this.updateBookShelves(book, shelf)
    );
  };

  updateFilteredBooksShelves = (book, shelf) => {
    const newFilteredBooks = this.state.filteredBooks.slice();
    const index = newFilteredBooks.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      newFilteredBooks[index].shelf = shelf;
      return newFilteredBooks;
    } else {
      return null;
    }
  };

  getfilteredBooksFromIds = (filteredBookIds) => {
    const sortedBooks = { currentlyReading: [], wantToRead: [], read: [] };
    for (const shelf in filteredBookIds) {
      for (let id of filteredBookIds[shelf]) {
        const book = this.state.allBooks.find((book) => book.id === id);
        book.shelf = shelf;
        sortedBooks[shelf].push(book);
      }
    }
    return sortedBooks;
  };

  updateBookShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then((sortedBooksIds) => {
      const sortedBooks = this.getfilteredBooksFromIds(sortedBooksIds);
      const filteredBooks = this.updateFilteredBooksShelves(book, shelf);
      this.setState({ sortedBooks, ...(filteredBooks && { filteredBooks }) });
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
      sortedBooks: { currentlyReading, wantToRead, read },
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => this.sortBooksByShelves(allBooks));
  }

  render() {
    const { sortedBooks, filteredBooks } = this.state;
    return (
      <>
        <Route
          exact
          path="/"
          render={() => (
            <MyLibrary
              sortedBooks={sortedBooks}
              updateBookShelves={this.updateBookShelves}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              filteredBooks={filteredBooks}
              searchBooks={this.searchBooks}
              addBookToMyLibraryAndUpdateBookShelves={
                this.addBookToMyLibraryAndUpdateBookShelves
              }
            />
          )}
        />
      </>
    );
  }
}

export default BooksApp;
