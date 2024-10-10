import { createContext, useReducer } from "react";
import TodoReducer, { initialState } from "../Reducers/TodoAppReducer";


export const CreateTodoContext = createContext()


export default function TodoAppDataProvider({children}){
    
    const [state, dispatch] = useReducer(TodoReducer, initialState)


    const handleLogin = () =>{

    }

    const handleSignUp = () =>{

    }


    const setLoading = () =>{

    }

    return(
        <CreateTodoContext.Provider 
        value={{todos: state.todos, dispatch, 
            loginEmail: state.loginEmail, loginPassword : state.loginPassword,
            loadingState: state.loading, authToken: state.authToken, selectedFilter: state.selectedFilter,
            filteredNotes: state.filteredNotes,
            authenticationStatus : state.authenticationStatus}}>{children}</CreateTodoContext.Provider>
        )
}