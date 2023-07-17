import Navbar from "../Header/Navbar"
import AuthContext from "../Context/AuthContext";
import { useContext ,useState} from "react";


const Main=()=>{
    const ctx=useContext(AuthContext)
    const [userData, setUserData]=useState([])
    const [showData,setShowData]=useState(false)

    const LoadData=()=>{
        const res=fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB2B4txBmWbj7nOJi7zyym2kuveqd3iews',{
            method:'POST',
            body:JSON.stringify({
                idToken : ctx.token,
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
            console.log(data.users)
            setUserData(data.users)
            setShowData(true)
            console.log('Load Successfully.')
          })
          .catch((error) => {
            alert(error.message);
          });
    }

    return(
        <>
          <Navbar/>
          <button onClick={LoadData} style={{marginTop:'5rem', padding:'0.5rem 1rem',borderRadius:'1rem',marginLeft:'3rem'}}>Load data</button>

          {showData &&
            <div>
                <li>{userData[0].displayName}</li>
                <li>{userData[0].email}</li>
                <li>{userData[0].photoUrl}</li>
            </div>            
          }
        </>
    )
}

export default Main