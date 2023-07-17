import Navbar from "../Header/Navbar"
import AuthContext from "../Context/AuthContext";
import { useContext ,useState} from "react";


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
        
        {!verify && <button onClick={verifyEmail} style={{marginTop:'5rem', padding:'0.5rem 1rem',borderRadius:'1rem',marginLeft:'3rem'}}>Verify Email</button>}
          
        </>
    )
}

export default Main