import styles from './UpdateMovie.module.css'
import { updateMovie } from '../../../api/moviesApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useMovieById } from '../../../api/moviesApi'
import { useEffect } from 'react';


const UpdateMovie = () => {

    const { id }: any = useParams();

    const { data: movie } = useMovieById(id ?? "");

    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await updateMovie({ ...data, _id: id });
            toast.success("Movie updated successfully");
            navigate("/admin/movies");
        } catch (error) {
            toast.error("Failed to update movie");
            console.log(error);
        }
    }

    useEffect(() => {
        if (movie) {
            setValue('name', movie.name);
            setValue('description', movie.description);
            setValue('image', movie.image);
            setValue('category', movie.category);
            setValue('year', movie.year);
        }
    }, [movie, setValue]);
   
    
  return (
    <div className={styles.updateMovie}>
        <h1>Update Movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={movie?.name} {...register("name")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" defaultValue={movie?.description} {...register("description")}></textarea>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" defaultValue={movie?.image} {...register("image")}/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <input type="text" id="category" defaultValue={movie?.category} {...register("category")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="year">Year</label>
                <input type="number" id="year" defaultValue={movie?.year} {...register("year")} />
            </div>
            <button type="submit">Update Movie</button>
        </form>
    </div>
  )
}

export default UpdateMovie