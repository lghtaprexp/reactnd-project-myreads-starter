import React from 'react'
// import * as BooksAPI from '../BooksAPI'
// import Home from './Home'
// import Shelf from './Shelf'

class Book extends React.Component {
  /* Check props that were given */
  // componentDidMount() {
  //  console.log(this);
  // }

  /* Allow user to select the different options to
   * move books between shelves
   */
  handleChange = (event) => {
    this.props.moveBook(this.props.book, event.target.value)
    // console.log(event.target.value);
  }
  
  render() {
    /* Remove hard coded title, author, and image thumbnail
    */
    let title = this.props.book.title;
    let authors = this.props.book.authors;
    let imgUrl = this.props.book.imageLinks;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {/* If no image found for book, set image to blank.
             * Otherwise, set image to image thumbnail
             */}
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${!imgUrl ? "" : imgUrl.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {/* If author has no name, set author's name to Unknown.
           * Otherwise, return the first author's name.
           */}
          <div className="book-authors">{!authors ? "Unknown" : authors[0]}</div>
        </div>
      </li>
      )
  }

}

export default Book