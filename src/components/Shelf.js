import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
  render() {
  	return (
  	  <div className="bookshelf">
  	      {/* Change h2 heading dynamically */}
	      <h2 className="bookshelf-title">{this.props.shelfName}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	          <Book />
	          
	        </ol>
	      </div>
	    </div>
  	  )
  }

}

export default Shelf