// import Auth from "./Auth";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


const initialToken=localStorage.getItem('token')
const initialEmail=localStorage.getItem('email')
const isLoggedIn = !!initialToken 


const initialAuthState = {
    token : initialToken ,
    email : initialEmail ,
    isLoggedIn : isLoggedIn,
    total : 0,
}

const Auth = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state , action ){
            console.log(action.payload)
            const {token , email} = action.payload
            console.log('token :',token , 'email :' ,email )
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
        },
        totalAmount(state,action){
            state.total = action.payload
            console.log(state.total)
        }
    }
})

export const AuthActions = Auth.actions

const store = configureStore({
    reducer : { auth : Auth.reducer}
})

export default store