import { useRef, useContext, useEffect ,useState} from "react"
import classes from './UpdateProfile.module.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AuthContext from "../Context/AuthContext"
import Navbar from "../Header/Navbar"



const UpdateProfile=()=>{
    const history=useHistory()
    const [userData,setUserData]=useState([])
    const ctx=useContext(AuthContext)
    const Name=useRef()
    const Photo=useRef()


    useEffect(()=>{
      async function showData(){
        try{
          const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
                idToken : ctx.token,
            }),
            headers:{
                'Content-Type': 'application/json' 
            }
        })
        const data=await res.json()
        setUserData(data.users[0])
        }
        catch(err){
          alert(err)
        }
      }
      showData()
    },[])

    const SubmitHandler=(e)=>{
        e.preventDefault()
        const name=Name.current.value 
        const photo=Photo.current.value 

        const res=fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
                idToken : ctx.token,
                displayName : name ,
                photoUrl : photo,
                returnSecureToken : false
            }),
            headers:{
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
            console.log('data : ' , data)
            history.push('/')
            console.log('profile Updated Successfully.')
          })
          .catch((error) => {
            alert(error.message);
          });
        
        Name.current.value=''
        Photo.current.value=''
    }

    return(
        <>
          <Navbar/>
          <div className={classes.container}>
          <form onSubmit={SubmitHandler} className={classes.form}>
            <h2 className={classes.h2}>Contact Details</h2><br /><br />
            <label className={classes.label}>Full Name </label>
            <input className={classes.input} type="text" ref={Name} value={userData.displayName} />
            <label className={classes.label}>Profile Photo URL </label>
            <input className={classes.input} type="text" ref={Photo} value={userData.photoUrl}/>
            <button className={classes.btn} type="submit">Update Profile</button>
          </form>
          </div>
        </>
    )
}

export default UpdateProfile