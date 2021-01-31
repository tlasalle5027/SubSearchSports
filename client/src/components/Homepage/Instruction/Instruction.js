import React from 'react';
import './Instruction.css';

class Instruction extends React.Component{
    render(){
        return (
            <section>
                <section className="instruction">
                    <num className="numberCircle">1</num><h1>Register</h1>
                    <num className="numberCircle">2</num><h1>Post/Respond</h1>
                    <num className="numberCircle">3</num><h1>PLAY!</h1>
                </section>
                <section className="instruction">
                    <p>Register an account and fill out your profile</p>
                    <p>Post an Ad looking for players, or respond to one</p>
                    <p>Join your new teammates and get out and PLAY!</p>                    
                </section>
            </section>            
            
        );
    }
}

export default Instruction;