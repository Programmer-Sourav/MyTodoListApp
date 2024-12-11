import "../Stylesheets/login.css"

import { useContext } from "react"
import { CreateTodoContext } from "../main";
import { registerUser } from "../RemoteApis";
import { useNavigate, useNavigation } from "react-router";

export default function RegistrationPage(){

    const { loginEmail, loginPassword, dispatch, authenticationStatus} = useContext(CreateTodoContext);

    const navigate = useNavigate()

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
            registerUser(loginEmail, loginPassword, dispatch)
            if(authenticationStatus){
                navigate("/home")
            }
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
             <div className="login-card">
                <h1>Register Yourself!</h1>
             <label>Email:
             <input type="text" value={loginEmail} placeholder="Enter your Email...." onChange={(e)=>{setLoginEmail(e.target.value)}} className="input-box"/>
            </label>
            <label>Password:
             <input type="password" value={loginPassword} placeholder="Enter your Password...." onChange={(e)=>{setLoginPassword(e.target.value)}} className="input-box"/>
             </label>
             {authenticationStatus ? navigate("/home") : ""}
              <input type="submit" className="submit-btn"/>
             </div>
             </form>
    )
}