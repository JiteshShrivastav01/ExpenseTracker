import Login from "./Components/Login/Login"
import SignUP from "./Components/Login/Signup"
import Main from './Components/Main/Main'
import { Route } from "react-router-dom"



const App=()=>{
  return(
    <>
       <Route path='/' exact><Main/></Route>
      <Route path='/login'><Login/></Route>
      <Route path='/signup'><SignUP/></Route>
    </>
  )
}

export default App