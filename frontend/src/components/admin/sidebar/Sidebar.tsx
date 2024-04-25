import { Link, NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
      <div className={styles.middle}>
        <NavLink to="/admin" className={({isActive}) => isActive ? styles.active : ""}>Dashboard</NavLink> 
        <NavLink to="/admin/movies" className={({isActive}) => isActive ? styles.active : ""}>Movies</NavLink>
        <NavLink to="/admin/categories" className={({isActive}) => isActive ? styles.active : ""}>Categories</NavLink>
        <NavLink to="/admin/users" className={({isActive}) => isActive ? styles.active : ""}>Users</NavLink>
      </div>
      <div className={styles.bottom}>
        <Link to="/">
          <button>Return to Website</button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar