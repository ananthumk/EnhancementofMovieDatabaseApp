import {Component} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import Navbar from '../Navbar'
import './index.css'

class SearchResults extends Component {
  state = {
    searchResults: {
      totalPages: 0,
      totalResults: 0,
      results: [],
    },
    query: '',
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async (page = 1) => {
    const {location} = this.props
    const query = new URLSearchParams(location.search).get('query')

    if (query) {
      const apiKey = '033dfd07196d3fcc71583638b8fc1b20'
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`

      const response = await fetch(url)
      if (response.ok) {
        const fetchData = await response.json()

        const updatedData = {
          totalPages: fetchData.total_pages,
          totalResults: fetchData.total_results,
          results: fetchData.results.map(result => ({
            id: result.id,
            title: result.original_title,
            posterPath: result.poster_path,
            releaseDate: result.release_date,
            votingAvg: result.vote_average,
          })),
        }
        console.log(updatedData)
        this.setState({
          searchResults: updatedData,
          query,
        })
      }
    }
  }

  renderSearchResults = () => {
    const {searchResults} = this.state
    const {results} = searchResults
    return (
      <div className="movie-container">
        {results.map(eachMovie => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${eachMovie.posterPath}`
          const rating = Math.round((eachMovie.votingAvg * 100) / 10)
          return (
            <div className="movie-card" key={eachMovie.id}>
              <img
                src={imageUrl}
                alt={eachMovie.title}
                className="movie-poster-image"
              />
              <div className="release-and-rating-container">
                <h1 className="movie-title">{eachMovie.title}</h1>
                <div className="rating-container">
                  <p className="movie-rating">{`${rating}%`}</p>
                </div>
              </div>
              <div className="release-and-rating-container">
                <p className="release-date">{eachMovie.releaseDate}</p>
                <Link
                  to={`/movies/${eachMovie.id}`}
                  className="Navigation-links"
                  key={eachMovie.id}
                >
                  <button type="button" className="view-btn">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const {query, searchResults} = this.state
    return (
      <>
        <Navbar />
        <h2 className="sub-heading">{`Search Results for ${query}`}</h2>
        <div className="movie-page">
          {this.renderSearchResults()}
          <Pagination
            apiCallBack={this.getSearchResults}
            totalPage={searchResults.totalPages}
          />
        </div>
      </>
    )
  }
}

export default SearchResults
