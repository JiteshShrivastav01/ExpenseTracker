import { useRef } from 'react'
import classes from './Login.module.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'




const SignUP=()=>{
    const history=useHistory()
    const Email=useRef()
    const Password=useRef()
    const ConfirmPassword=useRef()


    const SubmitHandler= (e)=>{
        e.preventDefault()
        const email=Email.current.value 
        const password=Password.current.value
        const confirmPassword=ConfirmPassword.current.value

        const URL='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews'

        if(password===confirmPassword){
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
                    const error = 'Authentication login';
                    throw new Error(error);
                  });
                }
              })
              .then((data) => {
                console.log('singup sucessfully.')
                history.push('/')
              })
              .catch((error) => {
                alert(error.message);
              });
    
        }
        else{
            console.log('Enter valid Password.')
            alert('Enter valid password.')
        }
        Email.current.value=''
        Password.current.value=''
        ConfirmPassword.current.value=''
    }

    return(
        <div className={classes.container}>
        <form onSubmit={SubmitHandler} className={classes.form}>
            <h2 className={classes.h2}>Create Account</h2><br/>
            <label htmlFor="Email" className={classes.label}>Email </label>
            <input type="Email" ref={Email} className={classes.input} required/>
            <label htmlFor="Password" className={classes.label}>Password</label>
            <input type="Password" ref={Password} className={classes.input} required/>
            <label htmlFor="ConfirmPassword" className={classes.label}>Confirm Password</label>
            <input type="Password" ref={ConfirmPassword} className={classes.input} required/>
            <div className={classes.btn}>
              <button type="submit" className={classes.button1}>Create Account</button>
            </div>
        </form><hr />
        <button className={classes.btn2}>
            <Link to='/login'>Login With Existing account </Link>
        </button>
       </div>
    )
}

export default SignUP