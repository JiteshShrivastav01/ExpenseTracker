import { useState ,useRef} from "react"
import Navbar from "../Header/Navbar"
import classes from './Login.module.css'


const ResetPass=()=>{
    const [isReset,setIsReset]=useState(false)
    const Email=useRef()
    
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const SubmitHandler=async (e)=>{
        e.preventDefault()
        const email = Email.current.value
        try{
           const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
              method:'POST',
              body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email : email
              }),
              headers:{
                'Content-Type' : 'application/json'
              }
           })
           setIsReset(true)
           await delay(4000)
           setIsReset(false)
        }
        catch(err){
            alert(err)
        }
    }

    return(
        <>
          <Navbar/>
          <div className={classes.container2}>
            <form onSubmit={SubmitHandler} className={classes.form}>
                <h2 className={classes.h2}>Reset Password</h2><br /><br />
                <input type="email" placeholder="Enter Your Email" className={classes.input} ref={Email}/>
                <button type="submit" className={classes.button}>
                    {!isReset ? 'Reset Password' : 'Sending..'}
                </button>
                {isReset && <p>Reset Password link shared to your Mailbox.</p>}
            </form>
          </div>
        </>
    )
}

export default ResetPass