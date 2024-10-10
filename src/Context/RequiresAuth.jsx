import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { CreateTodoContext } from "./TodoAppContext"

export function RequiresAuth({ children }){
    let location = useLocation()

    const {authenticationStatus} = useContext(CreateTodoContext)
    console.log(5533, authenticationStatus)
    return authenticationStatus ? (children) : (<Navigate to="/login" state={{ from: location }} />
    )
}