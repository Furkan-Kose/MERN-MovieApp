import styles from './CategoryPage.module.css'
import { useParams } from 'react-router-dom'
import MovieCard from '../../components/movieCard/MovieCard';
import { useMovies } from '../../api/moviesApi';
import { useState } from 'react';
import { MovieType } from '../../types';

const CategoryPage = () => {

  const { data: movies, isLoading, error } = useMovies("");
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState('default');

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  const selectedCategory = category ?? ''; 

  let catMovies = movies.filter((movie: MovieType) => movie.category.includes(selectedCategory));

  if(sort === "new") {
    catMovies = catMovies.sort((a: MovieType, b: MovieType) => b.year - a.year);
  } else if(sort === "old") {
    catMovies = catMovies.sort((a: MovieType, b: MovieType) => a.year - b.year);
  }

  if (catMovies.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.title}>No movies found in this category.</h2>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{selectedCategory} Movies</h2>
      <div className={styles.sort}>
        <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="new">New to Old</option>
          <option value="old">Old to New</option>
        </select>
      </div>
      <div className={styles.movies}>
        {catMovies.map((movie: MovieType) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage