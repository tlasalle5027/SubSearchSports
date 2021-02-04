import React from 'react';
import './Homepage.css';

import Instruction from './Instruction/Instruction';

class Homepage extends React.Component{

    render(){
        return (
            <body>            
                <section className="intro">
                    <h1>Welcome to Sub Search Sport!</h1>
                    <p>Getting started with our system is as easy as...</p>
                    <Instruction />
                </section>
                <section className="userCount">
                    <p>We have about <h1>0</h1> users </p>
                    <p>Looking to play or looking for players!</p>
                    <p>In about <h1>15</h1> different sports</p>
                </section>
                <section>
                    <h1>JOIN US TODAY! GET OUT AND PLAY!</h1>
                    <button className="logInButton">Log In/Sign Up</button>
                </section>                               
            </body>
        );
    }
}

export default Homepage;