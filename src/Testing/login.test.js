import { render, screen } from "@testing-library/react";
import Login from "../Components/Login/Login";
import SignUP from "../Components/Login/Signup";

describe('<Login /> test : ' , ()=>{
    test('test for login page ', ()=>{
        render(<Login/>)

        const LoginElement=screen.getByText('Login')
        expect(LoginElement).toBeInTheDocument()
    })
})

describe('<SignUP /> test : ' , ()=>{
    test('test for SignUP page ', ()=>{
        render(<SignUP/>)

        const SignUPElement=screen.getByText('Create Account' , {exact : false})
        expect(SignUPElement).toBeInTheDocument()
    })
})