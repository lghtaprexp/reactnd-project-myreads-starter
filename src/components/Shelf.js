import React from 'react'
import Book from './Book'
// import Home from './Home'

class Shelf extends React.Component {
  // Check props that were given
  // componentDidMount() {
  // 	console.log(this);
  // }

  render() {
  	return (
  	  <div className="bookshelf">
  	      {/* Change h2 heading dynamically */}
	      <h2 className="bookshelf-title">{this.props.shelfName}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	          {/* Check if book exist*/}
	          {
				this.props.myBooks.map((book, key) => (<Book book={book} key={book.id} />))
	          }
	          <Book / >
	        </ol>
	      </div>
	    </div>
  	  )
  }

}

export default Shelf