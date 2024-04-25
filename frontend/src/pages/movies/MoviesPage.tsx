import {useRef} from 'react'
import styles from "./MoviesPage.module.css"
import Movies from '../../components/movies/Movies';
import { Link } from 'react-router-dom';
import { useCategories } from '../../api/categoryApi';
import { CategoryType } from '../../types';

const MoviesPage = () => {

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

  const { data: categories } = useCategories();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movies</h2>

      <h3>Categories</h3>
      <div className={styles.categoriesContainer}>
        <div className={styles.categories} ref={moviesRef}>
          {categories?.map((category: CategoryType) => (
            <Link to={`/movies/category/${category.name}`} className={styles.category} key={category._id}>
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
        <div className={`${styles.scrollArrow} ${styles.scrollLeft}`} onClick={scrollLeft}>
          &lt;
        </div>
        <div className={`${styles.scrollArrow} ${styles.scrollRight}`} onClick={scrollRight}>
          &gt;
        </div>    
      </div>

      <div className={styles.movies}>
        {categories?.map((category: CategoryType) => (
          <Movies category={category.name} key={category._id} />
        ))}
      </div>

    </div>
  )
}

export default MoviesPage