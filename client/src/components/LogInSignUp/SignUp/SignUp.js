import React from 'react';
import './SignUp.css';

class SignUp extends React.Component{

    render(){
        return(
            <div className="SignUp">
                <form>                    
                    <input type="text" name="firstName" placeholder="First Name" /><br></br>
                    <input type="text" name="lastName" placeholder="Last Name" /><br></br>
                    <input type="text" name="username" placeholder="UserName"/><br></br>
                    <input type="password" name="password" placeholder="Password" /><br></br>
                    <input type="password" name="password_confirm" placeholder="Confirm Password" /><br></br>
                    <button className="signUpButton">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;