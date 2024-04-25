import styles from './LogoutButton.module.css';
import { useLogout } from '../../api/authApi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const LogoutButton = () => {

  const { mutate: logout, isPending } = useLogout();

  const { updateUser } = useContext(AuthContext);
  
  const handleLogout = async () => {
    try {
      await logout();
      updateUser(null);
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isPending} className={styles.logout}>
      {isPending ? 'Logout...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
