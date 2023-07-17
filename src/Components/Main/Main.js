import Navbar from "../Header/Navbar"
import AuthContext from "../Context/AuthContext";
import { useContext ,useState} from "react";
import classes from './Main.module.css'
import Expenses from "../Expenses/Expenses";


const Main=()=>{
    const ctx=useContext(AuthContext)
    const [verify , setVerify]=useState(false)


    const verifyEmail=async ()=>{
        try{
          const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
              requestType : 'VERIFY_EMAIL',
              idToken : ctx.token
            })
          })
          const data=await res.json()
          setVerify(true)
        }
        catch(err){
          alert(err)
        }
    }

    return(
      <>
        <Navbar/>
        <div className={classes.container}>
          {!verify && <button onClick={verifyEmail} className={classes.verifyBtn}>Verify Email</button>}
        </div>
        <Expenses/>       
      </>
    )
}

export default Main