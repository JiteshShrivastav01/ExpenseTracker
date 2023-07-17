import { useState } from 'react'
import AuthContext from './AuthContext'



const AuthContextProvider=(props)=>{
    const [Token , setToken]=useState(null)
    const [email,setEmail]=useState(null)
    const isLoggedIn = !!Token

    const LoginHandler=(token,email)=>{
        setToken(token)
        setEmail(email)
    }

    const LogoutHandler=()=>{
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