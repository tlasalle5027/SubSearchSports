import React from 'react';
import apiCalls from '../../../utils/apiCalls';
import './SignUp.css';

class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event){
        if(this.state.password === this.state.password_confirm){
            apiCalls.registerUser(this.state.username, 
                                  this.state.password,
                                  this.state.email,
                                  this.state.firstName,
                                  this.state.lastName,
                                  this.state.hideLocation).then(user => {
                if(typeof(user) === 'number'){
                    alert(`Registration successful! ${user}`);
                } else {
                    alert(user);
                }
            });
        } else {
            alert('Passwords do not match');
        }
        
    event.preventDefault();

    }

    render(){
        return(
            <div className="SignUp">
                <form onSubmit={this.handleSubmit}>                    
                    <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange}/><br></br>
                    <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange}/><br></br>
                    <input type="text" name="username" placeholder="UserName" value={this.state.username} onChange={this.handleInputChange}/><br></br>
                    <input type="text" name="email" placeholder="E-Mail" value={this.state.email} onChange={this.handleInputChange}/><br></br>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/><br></br>
                    <input type="password" name="password_confirm" placeholder="Confirm Password" value={this.state.password_confirm} onChange={this.handleInputChange}/><br></br>
                    <input type="checkbox" name="hideLocation" checked={this.state.hideLocation} onChange={this.handleInputChange}/>
                    <label for="hideLocation">Hide my Location from users (this can be changed)</label><br></br>
                    <button className="signUpButton">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;