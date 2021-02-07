import React from 'react';
import './Homepage.css';

import Instruction from './Instruction/Instruction';

import apiCalls from '../../utils/apiCalls';

class Homepage extends React.Component{
    constructor(props){
        super(props);

        this.state = { }
    }

    componentDidMount(){
        apiCalls.getUserCount().then(count => {
            if(count){
                this.setState({userCount: count});
            }
        });

        apiCalls.getSportCount().then(count => {
            if(count){
                this.setState({sportsCount: count});
            }
        });
    }

    render(){
        return (
            <section className="homePage">            
                <section className="intro">
                    <h1>Welcome to Sub Search Sport!</h1>
                    <p>Getting started with our system is as easy as...</p>
                    <Instruction />
                </section>
                <section className="userCount">
                    <p>We have about <span className="countNumber">{this.state.userCount}</span> users </p>
                    <p>Looking to play or looking for players!</p>
                    <p>In about <span className="countNumber">{this.state.sportsCount}</span> different sports</p>
                </section>
                <section>
                    <h1>JOIN US TODAY! GET OUT AND PLAY!</h1>
                    <button className="logInButton">Log In/Sign Up</button>
                </section>                               
            </section>
        );
    }
}

export default Homepage;