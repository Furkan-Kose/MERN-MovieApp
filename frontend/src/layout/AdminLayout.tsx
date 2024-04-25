import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/sidebar/Sidebar"

const AdminLayout = () => {
  return (
    <div className="adminLayout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout