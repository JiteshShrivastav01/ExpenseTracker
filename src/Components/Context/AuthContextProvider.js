import { useState } from 'react'
import AuthContext from './AuthContext'



const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const initialEmail=localStorage.getItem('email')
    const [Token , setToken]=useState(initialToken)
    const [email,setEmail]=useState(initialEmail)
    const isLoggedIn = !!Token

    const LoginHandler=(token,email)=>{
        localStorage.setItem('token',token)
        localStorage.setItem('email',email)
        setToken(token)
        setEmail(email)
    }

    const LogoutHandler=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        setToken(null)
        setEmail(null)
    }

    const value={
       email : email ,
       token : Token ,
       isLoggedIn : isLoggedIn ,
       onLogin : LoginHandler,
       onLogout : LogoutHandler
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider