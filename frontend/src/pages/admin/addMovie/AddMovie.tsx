import styles from './AddMovie.module.css'
import { useAddMovie } from '../../../api/moviesApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {

    const { mutate: addMovie } = useAddMovie();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        addMovie(data, {
            onSuccess: () => {
                toast.success("Movie added successfully");
                navigate("/admin/movies")
            },
            onError: (error) => {
                console.log(error);
                toast.error("Error adding movie");
            }
        });
    }

  return (
    <div className={styles.addMovie}>
        <h1>Add Movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register("description")}></textarea>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" {...register("image")}/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <input type="text" id="category" {...register("category")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="year">Year</label>
                <input type="number" id="year" {...register("year")} />
            </div>
            <button type="submit">Add Movie</button>
        </form>
    </div>
  )
}

export default AddMovie