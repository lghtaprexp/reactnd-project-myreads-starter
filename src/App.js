import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  // state = {
  //   *
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
     
  //   showSearchPage: false
  // }

  render() {
    return (
      <div className="app">
        {/* Create route to main page or search page */}
        <Route exact path="/" component={ Home } />
        <Route exact path="/search" component={ Search } />
        <div className="open-search">
          {/* Change a tag to Link tag to make use of
              react router link navigation */}          
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp