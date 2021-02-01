import React from 'react';
import './Instruction.css';

class Instruction extends React.Component{
    render(){
        return (
            <section>
                <section className="instruction">
                    <table className="center">
                        <tr>
                            <td><num className="numberCircle">1</num><h1>Register</h1></td>
                            <td><num className="numberCircle">2</num><h1>Post/Respond</h1></td>
                            <td><num className="numberCircle">3</num><h1>PLAY!</h1></td>
                        </tr>
                        <tr>
                            <td><p>Register an account and fill out your profile</p></td>
                            <td><p>Post an Ad looking for players, or respond to one</p></td>
                            <td><p>Join your new teammates and get out and PLAY!</p></td>
                        </tr>
                    </table>
                </section>
            </section>            
            
        );
    }
}

export default Instruction;