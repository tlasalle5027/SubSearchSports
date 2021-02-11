import React from 'react';
import './LogIn.css';

class LogIn extends React.Component{

    render(){
        return(
            <div className="Login">
                <form>
                    <input type="text" name="username" placeholder="UserName"/><br></br>
                    <input type="password" name="password" placeholder="Password" /><br></br>
                    <button className="logInButton">LogIn</button>
                </form>
            </div>
        )
    }
}

export default LogIn;