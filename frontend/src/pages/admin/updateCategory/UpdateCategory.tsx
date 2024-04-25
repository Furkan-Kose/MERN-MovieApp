import styles from './UpdateCategory.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryById, updateCategory } from '../../../api/categoryApi';
import { useEffect } from 'react';


const UpdateCategory = () => {

    const { id } = useParams();

    const { data: category } = useCategoryById(id ?? "");

    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await updateCategory({ ...data, _id: id });
            toast.success("Category updated successfully");
            navigate("/admin/categories");
        } catch (error) {
            toast.error("Failed to update category");
            console.log(error);
        }
    }

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
        }
    }, [category]);

  return (
    <div className={styles.updateCategory}>
        <h1>Update Category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={category?.name} {...register("name")} />
            </div>
            <button type="submit">Update Category</button>
        </form>
    </div>
  )
}

export default UpdateCategory