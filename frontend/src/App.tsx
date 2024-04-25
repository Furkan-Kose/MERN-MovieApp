import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home/Home"
import Layout from "./layout/Layout"
import NoviesPage from "./pages/movies/MoviesPage"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import Register from "./pages/register/Register"
import CategoryPage from "./pages/category/CategoryPage"
import AdminLayout from "./layout/AdminLayout"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import AdminMovies from "./pages/admin/movies/AdminMovies"
import AddMovie from "./pages/admin/addMovie/AddMovie"
import UpdateMovie from "./pages/admin/updateMovie/UpdateMovie"
import AdminUsers from "./pages/admin/users/AdminUsers"
import AddUser from "./pages/admin/addUser/AddUser"
import UpdateUser from "./pages/admin/updateUser/UpdateUser"
import ProtectedRoute from "./ProtectedRoute"
import AdminCategories from "./pages/admin/categories/AdminCategories"
import AddCategory from "./pages/admin/addCategory/AddCategory"
import UpdateCategory from "./pages/admin/updateCategory/UpdateCategory"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { 
          path: "/", 
          element: <Home /> 
        },
        { 
          path: "/movies", 
          element: <NoviesPage /> 
        },
        { 
          path: "/movies/category/:category", 
          element: <CategoryPage /> 
        },
        { 
          path: "/movies/:id", 
          element: <Details /> 
        }
      ]
    },
    { 
      path: "/login", 
      element: <Login /> 
    },
    { 
      path: "/register", 
      element: <Register /> 
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { 
          index: true, 
          element: <Dashboard /> 
        },
        { 
          path: "/admin/movies", 
          element: <AdminMovies /> 
        },
        {
          path: "/admin/movies/add",
          element: <AddMovie />
        },
        {
          path: "/admin/movies/:id",
          element: <UpdateMovie />
        },
        {
          path: "/admin/users",
          element: <AdminUsers />
        },
        {
          path: "/admin/users/add",
          element: <AddUser />
        },
        {
          path: "/admin/users/:id",
          element: <UpdateUser />
        },
        {
          path: "/admin/categories",
          element: <AdminCategories />
        },
        {
          path: "/admin/categories/add",
          element: <AddCategory />
        },
        {
          path: "/admin/categories/:id",
          element: <UpdateCategory />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
