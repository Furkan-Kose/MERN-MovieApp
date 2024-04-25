import styles from "./AdminCategories.module.css"
import { Link } from "react-router-dom";
import { useCategories, useDeleteCategory } from "../../../api/categoryApi";
import { CategoryType } from "../../../types";


const AdminCategories = () => {

  const { data: categories } = useCategories();

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = async (categoryId: string) => {
    deleteCategory(categoryId);
    window.location.reload();
  }

  return (
    <div className={styles.adminCategories}>
      <div className={styles.top}>
        <h1 className={styles.title}>Admin Categories</h1>
        <Link to="/admin/categories/add">
          <button className={styles.add}>Add Category</button>
        </Link>
      </div>
      <div className={styles.movies}>
        {categories?.map((category: CategoryType) => (
          <div className={styles.movie} key={category._id}>
            <div className={styles.info}>
              <h3>{category.name}</h3>
            </div>
            <div>
              <Link to={`/admin/categories/${category._id}`}>
                <button className={styles.edit}>Edit</button>
              </Link>
              <button className={styles.delete} onClick={() => handleDelete(category._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminCategories