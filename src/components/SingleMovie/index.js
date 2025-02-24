import {Component} from 'react'

import Navbar from '../Navbar'
import './index.css'

class SingleMovie extends Component {
  state = {
    movieDetails: {
      genres: [],
    },
    castDetails: [],
  }

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {movieId} = params

    const apiKey = '033dfd07196d3fcc71583638b8fc1b20'
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedData = {
        name: fetchData.title,
        posterPath: fetchData.poster_path,
        runtime: fetchData.runtime,
        rating: Math.round(fetchData.vote_average * 10),
        genres: fetchData.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        releaseDate: fetchData.release_date,
        overview: fetchData.overview,
      }
      this.setState({
        movieDetails: updatedData,
      })
    } else {
      this.setState({isloadingm: false, failedToFetchm: true})
    }

    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    const castResponse = await fetch(castUrl)
    if (castResponse.ok) {
      const castFetchedData = await castResponse.json()
      const castUpdatedData = castFetchedData.cast.map(eachCast => ({
        character: eachCast.character,
        name: eachCast.name,
        profilePath: eachCast.profile_path,
      }))
      this.setState({
        castDetails: castUpdatedData,
      })
    }
  }

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const imageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`
    return (
      <div className="movie-bg-container">
        <img src={imageUrl} alt={movieDetails.name} className="movie-poster" />
        <div className="movie-details">
          <h1 className="movie-name">{movieDetails.name}</h1>
          <ul className="release-genre-time-container">
            <li className="movie-rgt-lists">{movieDetails.releaseDate}</li>
            {movieDetails.genres.map(eachGenre => (
              <li key={eachGenre.id} className="movie-rgt-lists">
                {eachGenre.name}
              </li>
            ))}
            <li className="movie-rgt-lists">{`${movieDetails.runtime}m`}</li>
          </ul>
          <div className="rating-container">
            <p className="movie-rating">{`${movieDetails.rating}%`}</p>
          </div>
          <p className="movie-overview">{movieDetails.overview}</p>
        </div>
      </div>
    )
  }

  renderCastDetails = () => {
    const {castDetails} = this.state

    return (
      <div className="cart-container">
        {castDetails.map(eachCast => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${eachCast.profilePath}`
          return (
            <div className="cart-card" key={eachCast.name}>
              <img
                src={imageUrl}
                alt={eachCast.name}
                className="cast-profile"
              />
              <h1 className="cast-name">{eachCast.name}</h1>
              <p className="cast-character">{eachCast.character}</p>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="single-movie-container">
        <Navbar />
        {this.renderMovieDetails()}
        <h2 className="cast-heading">Cast</h2>
        {this.renderCastDetails()}
      </div>
    )
  }
}

export default SingleMovie
