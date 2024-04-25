import styles from './AddUser.module.css'
import { useAddUser } from '../../../api/userApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const { mutate: addUser, isPending } = useAddUser();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        addUser(data, {
            onSuccess: () => {
                toast.success("User added successfully");
                navigate("/admin/users")
            },
            onError: (error) => {
                console.log(error);
                toast.error("Error adding user");
            }
        });
    }

  return (
    <div className={styles.addUser}>
        <h1>Add User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register("email")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" {...register("image")}/>
            </div>
            <button type="submit">Add User</button>
        </form>
    </div>
  )
}

export default AddUser