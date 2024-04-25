import Movies from '../../components/movies/Movies'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.container}>

      <div className={styles.bgImage}>
        <div className={styles.overlay}></div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <h1>Welcome to FilmWatch</h1>
            <p>
            Welcome to FilmWatch! Explore and enjoy all kinds of movies. You're in the right place for unlimited entertainment!
            </p>
            <Link to="/movies">
              <button>Movies</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.moviesContainer}>
        <Movies/> 
      </div>
    </div>
  )
}

export default Home