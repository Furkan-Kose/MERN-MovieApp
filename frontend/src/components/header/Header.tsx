import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import LogoutButton from '../logoutButton/LogoutButton'
import Search from '../search/Search'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { MdMenu } from "react-icons/md";

const Header = () => {

  const { currentUser} = useContext(AuthContext);
  const [open, setOpen] = useState(false)
 
  return (
    <div className={styles.container}>
      
        <div className={styles.left}>
            <Link to="/" className={styles.logo}>FilmWatch</Link>
            <NavLink to="/" className={styles.link}>Home</NavLink>
            <NavLink to="/movies" className={({isActive}) => isActive ? styles.active  : styles.link }>Movies</NavLink>
        </div>
        <div className={styles.right}>
          <div className={styles.searchContainer}>
            <Search />
          </div>
          {currentUser ? (
            <>
            <div className={styles.profile}>
            {currentUser.username}
            <LogoutButton /> 
            </div>
            </>
            )
            : (
              <Link to="/login" className={styles.login}>Login</Link>
            )
          }
        </div>

        <div className={styles.mobileMenu}>
          <button 
            onClick={() => setOpen((prev) => !prev)}  
          >
            <MdMenu />
          </button>
          {open && (
            <div className='mobileMenuContent'>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/movies" className={styles.link}>Movies</Link>
              {currentUser ? (
                <>
                <div className={styles.profile}>
                {currentUser.username}
                <LogoutButton /> 
                </div>
                </>
                )
                : (
                  <Link to="/login" className={styles.login}>Login</Link>
                )
              }
            </div>
          )}

        </div>

    </div>
  )
}

export default Header