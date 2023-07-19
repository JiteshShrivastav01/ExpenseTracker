import { createSlice } from "@reduxjs/toolkit";


const initialToken=localStorage.getItem('token')
const initialEmail=localStorage.getItem('email')
const isLoggedIn = !!initialToken 


const initialAuthState = {
    token : initialToken ,
    email : initialEmail ,
    isLoggedIn : isLoggedIn 
}

const Auth = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state , action ){
            const {token , email} = action.payload
            localStorage.setItem('token',token)
            localStorage.setItem('email',email)
            state.token = token
            state.email = email
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            state.token = null
            state.email = null
            state.isLoggedIn = false
        }
    }
})

export const AuthActions = Auth.actions
export default Auth.reducer