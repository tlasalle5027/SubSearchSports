import React from 'react';
import './Instruction.css';

class Instruction extends React.Component{
    render(){
        return (
            <section>
                <section className="instruction">
                    <div className="instTable">
                        <div className="tr">
                            <span className="numberCircle">1 </span><h1>Register</h1>
                            <span className="numberCircle">2</span><h1>Post/Respond</h1>
                            <span className="numberCircle">3</span><h1>PLAY!</h1>
                        </div>
                        <div className="iconRow">
                            <img
                                alt="Input Form"
                                className="icon" 
                                src="https://img.icons8.com/dotty/80/ffffff/text-input-form.png"/>
                            <img
                                alt="Communication"
                                className="icon" 
                                src="https://img.icons8.com/wired/64/ffffff/communication.png"/>
                            <img
                                alt="Sports Icon"
                                className="icon" 
                                src="https://img.icons8.com/ios-filled/100/ffffff/hockey.png"/>
                        </div>
                        <div className="tr">
                            <p>Register an account and fill out your profile</p>
                            <p>Post an Ad looking for players, or respond to one</p>
                            <p>Join your new teammates and get out and PLAY!</p>
                        </div>
                    </div>
                </section>
            </section>            
            
        );
    }
}

export default Instruction;