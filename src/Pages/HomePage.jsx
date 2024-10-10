import { useContext, useEffect, useState } from "react"
import { CreateTodoContext } from "../main"
import { useNavigate } from "react-router";
import { addTodoRemote, fetchTodos } from "../RemoteApis";

export default function HomePage(){

    const { todos, dispatch,  filteredNotes } = useContext(CreateTodoContext);

    const navigate = useNavigate();

    const [todoTitle, setTodoTitle] = useState("")
    const [todoDescription, setTodoDescription] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("All")


    useEffect(()=>{fetchTodos(dispatch)}, [])


    const savedTodos = sessionStorage.setItem("todos", JSON.stringify(todos));
    console.log(111, JSON.parse(sessionStorage.getItem("todos")))
    
    const addTodo = () =>{
        const todoItem = {id: todos.length+1, title: todoTitle, description: todoDescription, isEdiatable: false, isCompleted: false}

        const isTitleValid = validateTitle(todoTitle);

        const isDescriptionValid = validateDescription(todoDescription);

        if(isTitleValid && isDescriptionValid){
        dispatch({type: "ADD_TO_DO", payload: todoItem })
        addTodoRemote(todoItem, dispatch)
         }
        setTodoDescription("")
        setTodoTitle("") 
    }

    const createTodo = () =>{
        //It will open a modal or unhide the add to do form or open a new page to enter to do. 
    }

    function validateTitle(title){
     if(title.length<=0){
        console.log("Sorry, Your Todo title is empty")
     }
     else if(title.length<20){
        console.log("Title should be atleast 20 characters long")
     }
     else if(title.length>50){
        console.log("Title can not be greater than 50 characters long")
     }
     else{
        return "success";
     }
    }

    function validateDescription(description) {
        if(description.length<=0){
            console.log("Sorry, Your Todo Description is empty")
         }
         else if(description.length<50){
            console.log("Description should be atleast 50 characters long")
         }
         else if(description.length>100){
            console.log("Description can not be greater than 100 characters long")
         }
         else{
            return "success";
         }
    }

    const editATodo = (id) =>{

    }

    const deleteATodo = (id) =>{
        console.log(555, id)
        dispatch({type: "DELETE_TODO", payload: id})
    }

    const markComplete = (id) =>{
        dispatch({type: "UPDATE_TODO", payload:  id})
    }

    let notes = [];
    if(selectedFilter==="All"){
     notes = todos;
    }
    else if(selectedFilter==="Completed"){
     notes = [...todos].filter((todoItem)=>todoItem.isCompleted===true)
    }
    else if(selectedFilter==="Incomplete"){
     notes = [...todos].filter((todoItem)=>todoItem.isCompleted===false)
    }

    // const setSelectedFilter = (selectedValue) =>{
    //     dispatch({type: "SET_FILTER", payload: selectedFilter})
    //     dispatch({type: "FILTER_DATA",  payload: selectedValue})
    // }

    const logoutOnButtonClick = () =>{
        dispatch({type: "AUTHENTICATION_STATUS", payload: false})
        dispatch({type: "SET_TOKEN", payload: ""})
        sessionStorage.removeItem("authToken");
        sessionStorage.setItem("authStatus", false);
        navigate("/login")
    }

    console.log(777, notes, filteredNotes)

    return(
        <div> 
            <h3>Filter Todos</h3>
            <label>
            <input type="radio" checked={selectedFilter==="All"} onChange={()=>setSelectedFilter("All")}/>
            All </label>
            <label>
            <input type="radio" checked={selectedFilter==="Completed"} onChange={()=>setSelectedFilter("Completed")}/>
            Completed </label>
            <label>
            <input type="radio" checked={selectedFilter==="Incomplete"} onChange={()=>setSelectedFilter("Incomplete")}/>
            Incomplete </label>
            <h1>My Todos</h1>
           {
            notes.length===0? <h2> No todo to display </h2> : notes.map((todo)=>(
                <li key = {todo.id}>{todo.id}-{todo.title} 
                {/*Clicking should show description in modal/ */}
                <button onClick={()=>editATodo(todo.id)}>Edit</button>
                <button onClick={()=>deleteATodo(todo.id)}>Delete</button>
                Status: {todo.isCompleted ? "Completed" : <button onClick={()=>markComplete(todo.id)}>Mark Complete</button>}
                </li>
            ))
           }
           <h2>Add A New Todo</h2>
        
        <div class="flex flex-col justify-center items-center h-92 bg-gray-100">
        <div class="flex flex-col h-48 w-full">  
        <p>Todo Title
            <input type="text" value={todoTitle} placeholder="Name your Todo..." onChange={(e)=>{setTodoTitle(e.target.value)}}/>
        </p>
        </div> 
        <label>Todo Description
            <input type="text" value={todoDescription} placeholder= "Provide Description..." onChange={(e)=>{setTodoDescription(e.target.value)}}/>
        </label>
          <button onClick={addTodo}>Save To Do</button>
        </div>
           
           <button onClick={()=>createTodo()}>Add To Do</button>
           <button onClick={logoutOnButtonClick}>Logout</button>
        </div>
    )
}