export const initialState = {
    todos: [], 
    loginEmail: "", 
    loginPassword:"", 
    loading: false, 
    authToken: "", 
    selectedFilter: "All",
    filteredNotes: [],
    authenticationStatus: false,
    token: ""
}


export default function TodoReducer (state, action) {

    switch(action.type){
        case "FETCH_TODO":
        return {...state, todos: [...state.todos, ...action.payload]}
        case "ADD_TO_DO": 
        console.log(111, action.payload)
        return {...state, todos: [...state.todos, action.payload]}
        case "DELETE_TODO": 
        return {...state, todos: state.todos.filter((todoItem)=>(todoItem.id!== action.payload))}
        case "EDIT_TODO": 
        return {...state, todos: []}
        case "UPDATE_TODO":
        return {...state, todos: state.todos.map((todoItem)=>todoItem.id===action.payload? {...todoItem, isCompleted: true} : todoItem)}    
        case "LOGIN_EMAIL": 
        return {...state, loginEmail: action.payload}
        case "LOGIN_PASSWORD": 
        return {...state, loginPassword: action.payload}
        case "FILTER_DATA":
            console.log(222, action.payload)
        return {...state, filteredNotes : action.payload === "All"
            ? state.todos
            : state.todos.filter((todoItem) => todoItem.isCompleted === action.payload)} 
        case "SET_FILTER":
        return {...state, selectedFilter: action.payload}     
        case "AUTHENTICATION_STATUS":
        return {...state, authenticationStatus: action.payload}      
        case "SET_TOKEN":
        return {...state, token: action.payload}   
        case "SET_MESSAGE":
        return {...state, message: action.payload}     
    }

}