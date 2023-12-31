import {useRef} from "react"
import Navbar from '../Header/Navbar'
import classes from './Login.module.css'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { AuthActions } from "../../store/Auth"
import { useDispatch } from "react-redux"




const Login=()=>{
    const Email=useRef()
    const Password=useRef()
    const history=useHistory()
    const dispatch = useDispatch()

    const SubmitHandler=(e)=>{
        e.preventDefault()
        const email=Email.current.value 
        const password=Password.current.value

        const URL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews'

        fetch(URL,{
            method:'POST',
            body:JSON.stringify({
                email : email ,
                password : password ,
                returnSecureToken : true
            }),
            headers :{
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
             return res.json()
            } else {
              return res.json().then((data) => {
                const error = 'Authentication Error';
                throw new Error(error);
              });
            }
          })
          .then((data) => {
            dispatch(AuthActions.login({token : data.idToken, email : data.email}))
            console.log('login Sucessfully')
            history.push('/')
          })
          .catch((error) => {
            alert(error.message);
          });
        

        Email.current.value=''
        Password.current.value=''
    }


    return (
       <>
       <Navbar/>
       <div className={classes.container}>
        <form onSubmit={SubmitHandler} className={classes.form}>
            <h2 className={classes.h2}>Login</h2><br/>
            <label htmlFor="Email" className={classes.label}>Email </label>
            <input type="Email" ref={Email} className={classes.input} required/>
            <label htmlFor="Password" className={classes.label}>Password</label>
            <input type="Password" ref={Password} className={classes.input} minLength='7' required/>
            <div className={classes.btn}>
              <button type="submit" className={classes.button}>
                Login
              </button><br />
            </div>
            <div className={classes.fbtn}>
              <button className={classes.forgotPass}> 
                <Link to='/resetPassword'>Forgot Password</Link>
              </button>
            </div>
            
        </form><hr />
        <button className={classes.btn2}>
            <Link to='/signup'>Create New Account</Link>
        </button>
       </div>
       </>
    )
}

export default Login