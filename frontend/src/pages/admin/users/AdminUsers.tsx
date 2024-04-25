import styles from "./AdminUsers.module.css"
import { useUsers, useDeleteUser } from "../../../api/userApi";
import { Link } from "react-router-dom";
import { UserType } from "../../../types";


const AdminUsers = () => {

  const { data: users } = useUsers();

  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = async (userId: string) => {
    deleteUser(userId);
    window.location.reload();
  }

  return (
    <div className={styles.adminUsers}>
      <div className={styles.top}>
        <h1 className={styles.title}>Admin Users</h1>
        <Link to="/admin/users/add">
          <button className={styles.add}>Add User</button>
        </Link>
      </div>
      <div className={styles.movies}>
        {users?.map((user: UserType) => (
          <div className={styles.movie} key={user._id}>
            <div className={styles.info}>
              <img src={user.image || "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"} alt="" />
              <h3>{user.username}</h3>
            </div>
            <div>
              <Link to={`/admin/users/${user._id}`}>
                <button className={styles.edit}>Edit</button>
              </Link>
              <button className={styles.delete} onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsers