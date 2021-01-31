import React from 'react';
import './Homepage.css';

import Header from '../Header/Header';
import Instruction from './Instruction/Instruction';

class Homepage extends React.Component{

    render(){
        return (
            <body>
                <Header />
                <section className="intro">
                    <h1>Welcome to Sub Search Sport!</h1>
                    <p>Getting started with our system is as easy as...</p>
                    <Instruction />
                </section>
            </body>
        );
    }
}

export default Homepage;