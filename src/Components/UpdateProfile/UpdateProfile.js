import { useRef, useEffect ,useState} from "react"
import classes from './UpdateProfile.module.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Navbar from "../Header/Navbar"
import { useSelector } from "react-redux"



const UpdateProfile=()=>{
    const history=useHistory()
    const [userData,setUserData]=useState([])
    const Name=useRef()
    const Photo=useRef()
    const Token = useSelector(state => state.auth.token)


    useEffect(()=>{
      async function showData(){
        try{
          const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
                idToken : Token,
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
    },[Token])

    const SubmitHandler=(e)=>{
        e.preventDefault()
        const name=Name.current.value 
        const photo=Photo.current.value 

        const res=fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
                idToken : Token,
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
        console.log(res)
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