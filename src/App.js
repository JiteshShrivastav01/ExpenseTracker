import Login from "./Components/Login/Login"
import SignUP from "./Components/Login/Signup"
import Main from './Components/Main/Main'
import { Route } from "react-router-dom"
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile"
import ResetPass from "./Components/Login/resetPassword"



const App=()=>{
  return(
    <>
      <Route path='/' exact><Main/></Route>
      <Route path='/login'><Login/></Route>
      <Route path='/signup'><SignUP/></Route>
      <Route path='/update'><UpdateProfile/></Route>
      <Route path='/resetpassword'><ResetPass/></Route>
    </>
  )
}

export default App