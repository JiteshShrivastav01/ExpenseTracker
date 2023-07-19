import Navbar from "../Header/Navbar"
import {useState} from "react";
import classes from './Main.module.css'
import Expenses from "../Expenses/Expenses";
import { useSelector } from "react-redux";

const Main=()=>{
    const Token = useSelector(state => state.auth.token)
    const TotalAmount = useSelector(state => state.auth.total)
    const [verify , setVerify]=useState(false)

    const showSubBtn = TotalAmount>10000 ? true : false 


    const verifyEmail=async ()=>{
        try{
          const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
              requestType : 'VERIFY_EMAIL',
              idToken : Token
            })
          })
          const data=await res.json()
          console.log(data)
          setVerify(true)
        }
        catch(err){
          alert(err)
        }
    }

    return(
      <>
        <Navbar/>
        {showSubBtn && <button className={classes.subscriptionBtn}>Prime Subscription</button>}
        <div className={classes.container}>
          {!verify && <button onClick={verifyEmail} className={classes.verifyBtn}>Verify Email</button>}
        </div>
        <Expenses/>       
      </>
    )
}

export default Main