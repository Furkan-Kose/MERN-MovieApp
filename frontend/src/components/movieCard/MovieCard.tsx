import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'
import { MovieType } from '../../types'

const MovieCard = ({movie}: {movie: MovieType}) => {
  return (
    <Link to={`/movies/${movie._id}`} className={styles.movie} key={movie._id}>
        <img src={movie.image} alt="movie" />
        <div className={styles.movieInfo}>
            <h3>{movie.name.substring(0,20)}</h3>
            <p>{movie.year}</p>
        </div>
    </Link>
  )
}

export default MovieCard