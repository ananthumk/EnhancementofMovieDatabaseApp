import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import './index.css'

class Home extends Component {
  state = {
    popularMovie: {
      totalPages: 0,
      totalResults: 0,
      results: [],
    },
  }

  componentDidMount() {
    this.getPopularMovie()
  }

  getPopularMovie = async (page = 1) => {
    const apiKey = '033dfd07196d3fcc71583638b8fc1b20'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
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
          voteAverage: result.vote_average,
        })),
      }
      console.log(updatedData)
      this.setState({
        popularMovie: updatedData,
      })
    }
  }

  renderPopularMovie = () => {
    const {popularMovie} = this.state
    const {results} = popularMovie
    return (
      <div className="movie-container">
        {results.map(eachMovie => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${eachMovie.posterPath}`
          const rating = Math.round((eachMovie.voteAverage * 100) / 10)
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
                  <p className="movie-vote-average">{eachMovie.voteAverage}</p>
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
    const {popularMovie} = this.state
    return (
      <>
        <Navbar />

        <div className="movie-page">
          {this.renderPopularMovie()}
          <Pagination
            apiCallBack={this.getPopularMovie}
            totalPage={popularMovie.totalPages}
          />
        </div>
      </>
    )
  }
}

export default Home
