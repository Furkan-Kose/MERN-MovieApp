import styles from './AddCategory.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddCategory } from '../../../api/categoryApi';

const AddCategory = () => {

    const { mutate: AddCategory } = useAddCategory();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            AddCategory(data);
            toast.success('Category added successfully');
            navigate('/admin/categories');
        } catch (error) {
            toast.error('An error occurred');
            console.log(error);
        }
    }

  return (
    <div className={styles.addCategory}>
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")} />
            </div>
            <button type="submit">Add Category</button>
        </form>
    </div>
  )
}

export default AddCategory