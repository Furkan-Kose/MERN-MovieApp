import { useRef } from 'react'
import styles from './Movies.module.css'
import MovieCard from '../movieCard/MovieCard';
import { useMovies } from '../../api/moviesApi';
import { MovieType } from '../../types';


const Movies = ({category}: {category?: string}) => {

  const moviesRef = useRef(null);

  const scrollLeft = () => {
    if (moviesRef.current) {
        (moviesRef.current as HTMLDivElement).scrollLeft -= window.innerWidth;
    }
  };

  const scrollRight = () => {
    if (moviesRef.current) {
        (moviesRef.current as HTMLDivElement).scrollLeft += window.innerWidth; 
    }
  };

  const { data: movies, isLoading, error } = useMovies(category);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      {category && movies.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{category}</h2>
            <button className={styles.titleButton}>More</button>
          </div>
          <div className={styles.moviesContainer}>
            <div className={styles.movies} ref={moviesRef}>
              {movies.map((movie: MovieType) => (
                <MovieCard movie={movie} key={movie._id} />
              ))}
            </div>
            <div className={`${styles.scrollArrow} ${styles.scrollLeft}`} onClick={scrollLeft}>
              &lt;
            </div>
            <div className={`${styles.scrollArrow} ${styles.scrollRight}`} onClick={scrollRight}>
              &gt;
            </div>
          </div>
        </div>
      )}

      {!category && (
        <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Movies</h2>
          <button className={styles.titleButton}>More</button>
        </div>
        <div className={styles.moviesContainer}>
          <div className={styles.movies} ref={moviesRef}>
            {movies?.map((movie: MovieType) => (
              <MovieCard movie={movie} key={movie._id} />
            ))}
          </div>
          <div className={`${styles.scrollArrow} ${styles.scrollLeft}`} onClick={scrollLeft}>
            &lt;
          </div>
          <div className={`${styles.scrollArrow} ${styles.scrollRight}`} onClick={scrollRight}>
            &gt;
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Movies