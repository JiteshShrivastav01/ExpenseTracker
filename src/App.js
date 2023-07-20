import Login from "./Components/Login/Login"
import SignUP from "./Components/Login/Signup"
import Main from './Components/Main/Main'
import { Route, Redirect, Switch } from "react-router-dom"
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile"
import ResetPass from "./Components/Login/resetPassword"





const App=()=>{
  return(
    <Switch>
      <Route path='/' exact><Main/></Route>
      <Route path='/login'><Login/></Route>
      <Route path='/signup'><SignUP/></Route>
      <Route path='/update'><UpdateProfile/></Route>
      <Route path='/resetpassword'><ResetPass/></Route>
      <Route path='*'><Redirect path='/'/></Route>
    </Switch>
  )
}

export default App