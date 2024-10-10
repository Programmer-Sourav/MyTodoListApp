import { useContext } from "react";
import { loginUser } from "../RemoteApis";
import { CreateTodoContext } from "../main";
import { useNavigate, useNavigation } from "react-router";

export default function LoginPage(){

    const { loginEmail, loginPassword, dispatch, authenticationStatus } = useContext(CreateTodoContext);
    const navigate = useNavigate();

    console.log(321, authenticationStatus)

    if(authenticationStatus){
        console.log(44455, authenticationStatus)
        sessionStorage.setItem("authStatus", true);
        navigate("/home")
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
       

        const isEmailValid = validateEmail(loginEmail);
        if(!isEmailValid){
            console.log("Please enter valid email!")
        }
        const isValid = checkIfValidPassword(loginPassword);
        if(isValid && isEmailValid){
            loginUser(loginEmail, loginPassword, dispatch)
            //navigate
            setLoginEmail("")
            setLoginPassword("")
        }
        else{
            setLoginPassword("")
            console.log("Password should be at least 6 characters long!")
        }
      
    }

    const setLoginEmail = (emailValue) =>{
        dispatch({type: "LOGIN_EMAIL", payload: emailValue})
    }

    const setLoginPassword = (emailPassword) =>{
        dispatch({type: "LOGIN_PASSWORD", payload: emailPassword})
    }

    function checkIfValidPassword(password) {
        console.log(444, password.length, loginPassword)
          if(password.length<6){
            return false;
          }
          else{
            return true;
          }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

   


    return(
       <form onSubmit={handleSubmit}>
        <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div class="flex flex-col h-32 w-full">  
        <label class="block">Email
            <input type="text" value={loginEmail} placeholder="Enter your email..." onChange={(e)=>{setLoginEmail(e.target.value)}}/>
        </label>
        </div> 
        <label>Password
            <input type="password" value={loginPassword} placeholder= "Enter your password..." onChange={(e)=>{setLoginPassword(e.target.value)}}/>
        </label>
       
        <input type="submit"/>
        </div>
       </form>
    )
}