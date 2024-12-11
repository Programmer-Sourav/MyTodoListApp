import "../Stylesheets/home.css"

import { useContext, useEffect, useState } from "react"
import { CreateTodoContext } from "../main"
import { useNavigate } from "react-router";
import { addTodoRemote, fetchTodos } from "../RemoteApis";
import AddICon from "../assets/add_icon.png"

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
     else if(title.length<5){
        console.log("Title should be atleast 5 characters long")
     }
     else if(title.length>100){
        console.log("Title can not be greater than 100 characters")
     }
     else{
        return "success";
     }
    }

    function validateDescription(description) {
        if(description.length<=0){
            console.log("Sorry, Your Todo Description is empty")
         }
         else if(description.length<5){
            console.log("Description should be atleast 5 characters long")
         }
         else if(description.length>500){
            console.log("Description can not be greater than 500 characters")
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
            <h1 className="todo-heading">My Todos</h1>
            <div className="todo-filter">
            <label>
            <input type="radio" checked={selectedFilter==="All"} onChange={()=>setSelectedFilter("All")}/>
            All </label>
            <label>
            <input type="radio" checked={selectedFilter==="Completed"} onChange={()=>setSelectedFilter("Completed")}/>
            Completed </label>
            <label>
            <input type="radio" checked={selectedFilter==="Incomplete"} onChange={()=>setSelectedFilter("Incomplete")}/>
            Incomplete </label>
            </div>

        <div className="todo-add-details-holder">
        <div className="todo-add-details">
            <input type="text" value={todoTitle} placeholder="Name your Todo..." onChange={(e)=>{setTodoTitle(e.target.value)}} className="input-todo"/>
            <input type="text" value={todoDescription} placeholder= "Provide Description..." onChange={(e)=>{setTodoDescription(e.target.value)}} className="input-todo"/>
        </div>
        <div className="todo-add-btn">
        <img src={AddICon} onClick={addTodo} alt="add-icon" width={40} height={40} />
        </div>
        </div>
           <div>
           {/* <button onClick={()=>createTodo()}>Add To Do</button> */}
           </div>
          
           <div>
           {
            notes.length===0? <h2> Currently No todo to display </h2> : notes.map((todo)=>(
                <li key = {todo.id}>{todo.id}-{todo.title} 
                {/*Clicking should show description in modal/ */}
                <button onClick={()=>editATodo(todo.id)}>Edit</button>
                <button onClick={()=>deleteATodo(todo.id)}>Delete</button>
                Status: {todo.isCompleted ? "Completed" : <button onClick={()=>markComplete(todo.id)}>Mark Complete</button>}
                </li>
            ))
          
           }
             </div>
             <button onClick={logoutOnButtonClick} className="btn-logout">Logout</button>
        </div>
    )
}