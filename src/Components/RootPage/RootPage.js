import Navbar from "../Header/Navbar"

const RootPage=(props)=>{
    return(
        <>
           <Navbar/>
           {props.children}
        </>
    )
}

export default RootPage