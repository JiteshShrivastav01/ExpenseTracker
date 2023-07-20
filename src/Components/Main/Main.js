import Navbar from "../Header/Navbar"
import {useState} from "react";
import classes from './Main.module.css'
import Expenses from "../Expenses/Expenses";
import { useSelector } from "react-redux";



const Main=()=>{
  const lightTheme = {
    name : 'Dark Theme',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  };
  
  const darkTheme = {
    name : 'Light Theme',
    backgroundColor: '#000000',
    textColor: '#ffffff',
  };
    const Token = useSelector(state => state.auth.token)
    const TotalAmount = useSelector(state => state.auth.total)
    const [verify , setVerify]=useState(false)
    const [Theme , setTheme]=useState(lightTheme)
    const showSubBtn = TotalAmount>=10000 ? true : false 

    const ThemeChangeHandler = () =>{
       setTheme(prevTheme => (prevTheme === !lightTheme ? lightTheme : darkTheme))
    }

    

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
      <div className={classes.body} 
           style={{ backgroundColor: Theme.backgroundColor, color: Theme.textColor }}>
        <div className={classes.btn}>
          <button onClick={ThemeChangeHandler} className={classes.themeBtn}>
            {Theme.name}
          </button>
          {showSubBtn && <button className={classes.subscriptionBtn}>Prime Subscription</button>}
          {!verify && <button onClick={verifyEmail} className={classes.verifyBtn}>Verify Email</button>}
        </div>
        <div className={classes.expenselist}>
          <Expenses/>  
        </div>     
      </div>
      </>
    )
}

export default Main