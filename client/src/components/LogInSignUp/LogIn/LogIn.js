import React from 'react';
import './LogIn.css';

class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            userName: '',
            password: '',
            error: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    render(){
        return(
            <div className="Login">
                <form>
                    <input type="text" name="username" placeholder="UserName" value={this.state.userName} onChange={this.handleInputChange}/><br></br>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/><br></br>
                    <button className="logInButton">LogIn</button>
                </form>
            </div>
        )
    }
}

export default LogIn;