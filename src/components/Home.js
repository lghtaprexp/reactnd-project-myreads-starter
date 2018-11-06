import React from 'react'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  myBooks: [],
  	  currentlyReading: [],
 	  wantToRead: [],
  	  read: []

  	}
  }
  
  // Get all books current in shelves
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBook) => {
      // console.log(allBook);
      this.setState({ myBooks : allBook });
      // console.log(this.state.myBooks);
      // Filter books to the shelves they belong to
      let currentlyReading = this.state.myBooks.filter((book) => book.shelf === "currentlyReading");
 	  let wantToRead = this.state.myBooks.filter((book) => book.shelf === "wantToRead");
  	  let read = this.state.myBooks.filter((book) => book.shelf === "read");
  	  console.log(currentlyReading, wantToRead, read);
    });
  }

  render() {
  	return (
  	  <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf shelfName="Currently Reading" myBooks={this.state.currentlyReading} />
            <Shelf shelfName="Want to Read" myBooks={this.state.wantToRead}/>
            <Shelf shelfName="Read" myBooks={this.state.read}/>
          </div>
        </div>
      </div>
  	  )
  }

}

export default Home