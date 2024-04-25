import styles from './Dashboard.module.css'
import { useMovies } from '../../../api/moviesApi'
import { useCategories } from '../../../api/categoryApi'
import { useUsers } from '../../../api/userApi'
import { Link } from 'react-router-dom'


const Dashboard = () => {

  const { data: movies } = useMovies();
  const { data: categories } = useCategories();
  const { data: users } = useUsers();

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <table>
        <tbody>
          <tr>
            <td>Total number of users:</td>
            <td>{users?.length}</td>
          </tr>
          <tr>
            <td>Total number of movies:</td>
            <td>{movies?.length}</td>
          </tr>
          <tr>
            <td>Total number of categories:</td>
            <td>{categories?.length}</td>
          </tr>
        </tbody>
      </table>
      <h2>Pages</h2>
      <div className={styles.links}>
        <Link to="/admin/movies">Movies</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/users">Users</Link>
      </div>
    </div>
  )
}

export default Dashboard