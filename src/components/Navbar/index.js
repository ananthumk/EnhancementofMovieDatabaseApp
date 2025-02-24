import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const onChangeSearchValue = event => {
    setSearchInput(event.target.value)
  }

  const handleSearch = () => {
    if (searchInput) {
      history.push(`/search?query=${searchInput}`)
    }
  }

  return (
    <div className="navbar-container">
      <div className="nav-main">
        <h1 className="navbar-heading">movieDB</h1>
        <div className="search-container">
          <input
            className="search-bar"
            type="textbox"
            value={searchInput}
            onChange={onChangeSearchValue}
            placeholder="Search movies..."
          />
          <button type="button" className="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="nav-category">
        <ul className="movie-category-container">
          <li className="movie-category">
            <Link to="/" className="Navigation-links">
              Popular
            </Link>
          </li>
          <li className="movie-category">
            <Link to="/top-rated" className="Navigation-links">
              Top Rated
            </Link>
          </li>
          <li className="movie-category">
            <Link to="/upcoming" className="Navigation-links">
              Upcoming
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
