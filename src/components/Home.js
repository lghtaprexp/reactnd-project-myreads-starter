import React from 'react'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  myBooks: [],
  	  }
  	}

  // Get all books current in shelves
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBooks) => {
      // console.log(allBooks);
      this.setState({ myBooks : allBooks });
 	  // console.log(this.state.myBooks);
    });
  }



  render() {
    {/* Filter books to the right shelves */}
  	let currentlyReading = this.state.myBooks.filter(book => book.shelf === "currentlyReading");
    let wantToRead = this.state.myBooks.filter(book => book.shelf === "wantToRead");
    let read = this.state.myBooks.filter(book => book.shelf === "read");
	{/* console.log(currentlyReading, wantToRead, read); */}

  	return (
  	  <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf shelfName="Currently Reading" myBooks={currentlyReading} />
            <Shelf shelfName="Want to Read" myBooks={wantToRead} />
            <Shelf shelfName="Read" myBooks={read} />
          </div>
        </div>
      </div>
  	  )
  }

}

export default Home