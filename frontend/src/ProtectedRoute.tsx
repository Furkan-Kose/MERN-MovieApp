import { PropsWithChildren, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

type ProtectedRouteProps = PropsWithChildren

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const { currentUser } = useContext(AuthContext) 

    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser.isAdmin) {
            navigate("/login", {replace: true})
        }
    }, [currentUser, navigate])

  return children
}

export default ProtectedRoute