const BASE_URL = "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/"
const LOGIN_ENDPOINT = "login"
const REGISTRATION_ENDPOINT = "signup"
const GET_TODOS_ENDPOINT = "todos"
const POST_TODOS_ENDPOINT = "todos"
const DELETE_TODOS_ENDPOINT = "todos"
const UPDATE_TODOS_ENDPOINT ="todos"
const EDIT_TODOS_ENDPOINT= "todos"


export async function loginUser(email, password, dispatch){
    try{
     const url = `${BASE_URL}${LOGIN_ENDPOINT}`   
     const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
     })

    const data = await response.json();
    console.log(777, data, data.details, data.details.token, data.details.id)
    sessionStorage.setItem("authToken", data.details.token)
    sessionStorage.setItem("userId", data.details.id)
    dispatch({type: "SET_TOKEN", payload: data.details.token})
    if(data.details.token){
    dispatch({type: "AUTHENTICATION_STATUS", payload: true})
    }
    dispatch({type: "SET_MESSAGE", payload: data.details.message})
    }
    catch(error){
        console.error(error)
    }
}

export async function registerUser(email, password, dispatch){
    try{
     const url = `${BASE_URL}${REGISTRATION_ENDPOINT}`   
     const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
     })

   

    const data = await response.json();
    sessionStorage.setItem("authToken", data.token)
    console.log(3333, data)
    dispatch({type: "SET_TOKEN", payload: data.token})
    if(data.token){
    dispatch({type: "AUTHENTICATION_STATUS", payload: true})
    }
    dispatch({type: "SET_MESSAGE", payload: data.message})
    }
    catch(error){
        console.error(error)
    }
}


export async function addTodoRemote(todoItem, dispatch){
    try{
     const title = todoItem.title;
     const description = todoItem.description;
     const id = todoItem.id;
     const userId = sessionStorage.getItem("userId")
     console.log(12356, userId, title, description, id)
     
     const url = `${BASE_URL}${POST_TODOS_ENDPOINT}` 
     const token =   sessionStorage.getItem("authToken")
     const response = await fetch(url, {
        method: "POST", 
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({userId, id, title, description})
     })
    const data = await response.json();
    console.log(3333, data)
    //dispatch({type: "ADD_TO_DO", payload: todoItem})
    }
    catch(error){
        console.error(error)
    }
}

export async function fetchTodos(dispatch){
    try{  
     const url = `${BASE_URL}${GET_TODOS_ENDPOINT}` 
     const token =   sessionStorage.getItem("authToken")
     console.log("Token", token) 
     const response = await fetch(url, {
        method: 'GET', 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });


    const data = await response.json();
    console.log(3333, data, data.data)
    dispatch({type: "FETCH_TODO", payload: data.data})
 
    }
    catch(error){
        console.error(error)
    }
}


export async function deleteTodo(id, dispatch){
    try{
     const url = `${BASE_URL}${DELETE_TODOS_ENDPOINT}/${id}` 
     const token =   sessionStorage.getItem("authToken")
     const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

  

    const data = await response.json();
    console.log(3333, data)
 
    }
    catch(error){
        console.error(error)
    }
}

export async function updateTodo(id, dispatch){
    try{
     const url = `${BASE_URL}${UPDATE_TODOS_ENDPOINT}/${id}` 
     const token =   sessionStorage.getItem("authToken")
     const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });


    const data = await response.json();
    console.log(3333, data)
 
    }
    catch(error){
        console.error(error)
    }
}
