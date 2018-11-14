import React from 'react'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'
// import App from '../App'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBooks: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      }
    }

  /* Get all books in shelves */
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBooks) => {
      // console.log(allBooks);
      this.setState({ myBooks: allBooks });
    // console.log(this.state.myBooks);
    });
  }

  /* Moving books between shelves */
  moveBook = (book, shelf) => {
    /* Run update on books and shelves to compare changes */
    BooksAPI.update(book, shelf)
    .then((newBooks) => {
    /* Create new list of book from running update */
    newBooks = this.state.myBooks;
    /* Check for books on the new list against the one on shelves */
    let selectBook = newBooks.filter(currentBook => currentBook.id === book.id);
    // console.log(selectBook);
    if(selectBook) {
      /* Check if searched books are already a particular shelf */
      selectBook[0].shelf = shelf;
    } else {
      /* Add book to shelf */
      newBooks.concat(book);
    }
    /* Update state with new list */
    this.setState({ myBooks: newBooks});
    });
  }

  render() {
    /* Filter books to the right shelves */
    let currentlyReading = this.state.myBooks.filter(book => book.shelf === "currentlyReading");
    let wantToRead = this.state.myBooks.filter(book => book.shelf === "wantToRead");
    let read = this.state.myBooks.filter(book => book.shelf === "read");
    /* console.log(currentlyReading, wantToRead, read); */

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Create shelves for categories of books */}
            <Shelf shelfName="Currently Reading" myBooks={currentlyReading} moveBook={this.moveBook} />
            <Shelf shelfName="Want to Read" myBooks={wantToRead} moveBook={this.moveBook} />
            <Shelf shelfName="Read" myBooks={read} moveBook={this.moveBook} />
          </div>
        </div>
      </div>
      )
  }

}

export default Home