import {useState} from 'react'
import styles from "./Search.module.css"
import { useMovies } from '../../api/moviesApi'
import { Link } from 'react-router-dom'


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: searchResults } = useMovies(undefined, searchTerm);

    const handleSearch = () => {
        if (searchResults && searchResults.length > 0) {
            const firstSearchResult = searchResults[0]; 
            setSearchTerm("");
            window.location.href = `/movies/${firstSearchResult._id}`; 
        }
    }
    
  return (
    <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
            <input 
                type="text" 
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
        </div>

        { searchTerm && searchResults && searchResults.length > 0 && (
        <div className={styles.results}>
            {searchResults?.map((movie: any) => (
                <Link to={`/movies/${movie._id}`} key={movie._id} onClick={() => setSearchTerm("")}>
                    <div className={styles.result}>
                        <img src={movie.image} alt={movie.name} />
                        <h3>{movie.name}</h3>
                    </div>
                </Link>
            ))}
        </div>
        )}

    </div>
  )
}

export default Search