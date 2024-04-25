import styles from './UpdateUser.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserById, updateUser } from '../../../api/userApi'
import { useEffect } from 'react';

const UpdateUser = () => {

    const { id } = useParams();

    const { data: user } = useUserById(id ?? "");

    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await updateUser({ ...data, _id: id });
            toast.success("User updated successfully");
            navigate("/admin/users");
        } catch (error) {
            toast.error("Failed to update user");
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('password', user.password);
            setValue('image', user.image);
        }
    }, [user, setValue]);

  return (
    <div className={styles.updateUser}>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="username">Name</label>
                <input type="text" id="username" defaultValue={user?.username} {...register("username")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" defaultValue={user?.email} {...register("email")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="year" defaultValue={user?.password} {...register("password")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" defaultValue={user?.image} {...register("image")}/>
            </div>
            <button type="submit">Update User</button>
        </form>
    </div>
  )
}

export default UpdateUser