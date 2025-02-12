import {Component} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import Navbar from '../Navbar'
import './index.css'

class Upcoming extends Component {
  state = {
    upcomingMovie: {
      results: [],
      totalPages: 0,
      totalResults: 0,
    },
  }

  componentDidMount() {
    this.getUpcomingMovieDetails()
  }

  onRetryBtn = () => {
    this.setState({isloading: true}, this.getUpcomingMovieDetails)
  }

  getUpcomingMovieDetails = async (page = 1) => {
    const apiKey = '033dfd07196d3fcc71583638b8fc1b20'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
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
      this.setState({
        upcomingMovie: updatedData,
      })
    }
  }

  renderUpcomingMovie = () => {
    const {upcomingMovie} = this.state
    const {results = []} = upcomingMovie

    if (!results) {
      return null
    }

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
                  <p className="movie-vote-average">{eachMovie.votingAvg}</p>
                </div>
              </div>
              <div className="release-and-rating-container">
                <p className="release-date">{eachMovie.releaseDate}</p>
                <Link
                  to={`/movies/${eachMovie.id}`}
                  className="Navigation-links"
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
    const {upcomingMovie} = this.state
    return (
      <>
        <Navbar />
        <h2 className="sub-heading">Upcoming</h2>
        <div className="movie-page">
          {this.renderUpcomingMovie()}
          <Pagination
            apiCallBack={this.getUpcomingMovieDetails}
            totalPage={upcomingMovie.totalPages}
          />
        </div>
      </>
    )
  }
}

export default Upcoming
