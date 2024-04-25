import styles from "./AdminMovies.module.css"
import { useMovies, useDeleteMovie } from "../../../api/moviesApi";
import { MovieProps } from "../../../components/movieCard/MovieCard";
import { Link } from "react-router-dom";


const AdminMovies = () => {

  const { data: movies } = useMovies();

  const { mutate: deleteMovie } = useDeleteMovie();

  const handleDelete = async (movieId: string) => {
    deleteMovie(movieId);
    window.location.reload();
  }

  return (
    <div className={styles.adminMovies}>
      <div className={styles.top}>
        <h1 className={styles.title}>Admin Movies</h1>
        <Link to="/admin/movies/add">
          <button className={styles.add}>Add Movie</button>
        </Link>
      </div>
      <div className={styles.movies}>
        {movies?.map((movie: MovieProps) => (
          <div className={styles.movie} key={movie._id}>
            <div className={styles.info}>
              <img src={movie.image} alt="" />
              <h3>{movie.name}</h3>
            </div>
            <div>
              <Link to={`/admin/movies/${movie._id}`}>
                <button className={styles.edit}>Edit</button>
              </Link>
              <button className={styles.delete} onClick={() => handleDelete(movie._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminMovies