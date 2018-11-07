import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  myBooks: [],
  	  search: "",
  	  searchResults: []
  	  }
  	}

  // Get all books in shelves
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBooks) => {
      // console.log(allBooks);
      this.setState({ myBooks: allBooks });
 	  // console.log(this.state.myBooks);
    });
  }

// Get an updated search result
queueResult = (query) => {
  // Returns nothing when search bar is empty
  if (this.state.search === '') {
    return this.setState({ searchResults: [] });
  } else {
  	  this.setState({ search : query});
  	  // console.log(this.state.search);
  }

}

displayResults = () => {
  BooksAPI.search(this.state.search)
  .then((result) => {
  	if(result === undefined) {
  	  return this.setState({ searchResults: [] });
  	} else {
  		result = this.state.searchResults;
  		for(let r of result) {
  		  let bookFound = this.state.myBooks.filter(pickBook => pickBook.id === r.id);
  		  if(bookFound) {
  			r[0].shelf = bookFound[0].shelf;
  			// console.log(r[0].shelf);
  			// console.log(bookFound[0].shelf);  				
  		  } else {
  			this.setState({ searchResults : result});
  			}
  		}  		
  	}  	  
  });
}

// https://reactjs.org/docs/forms.html
// Allow user to select the different options to
// move books between shelves
// handleChange = (event) => {
  // this.props.moveBook(this.props.book, event.target.value)
  // console.log(event.target.value);
// }

// Moving books between shelves
  moveBook = (book, shelf) => {
  // Run update on books and shelves to compare changes
  BooksAPI.update(book, shelf)
  .then((newBooks) => {
  // Create new list of book from running update
  newBooks = this.state.myBooks;
  // Check for books on the new list against the one on shelves
  let selectBook = newBooks.filter(currentBook => currentBook.id === book.id);
  // console.log(selectBook);
  if(selectBook) {
  selectBook[0].shelf = shelf;
  } else {
  // Add book to shelf
  newBooks.concat(book);
  }
  // Update state with new list
  this.setState({ myBooks: newBooks});
  });
}


  render() {
  	return (
  	  <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
             {
               this.state.searchResults.map((book) => (<Book book={book} key={book.id} moveBook={this.props.moveBook} />))
             }
          </ol>
        </div>
      </div>
  	  )
  }

}

export default Search