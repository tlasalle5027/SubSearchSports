import React from 'react';
import './Ad.css';

class Ad extends React.Component{

    render(){
        return(
            <section className="ad">
                <section className="adInfo">
                    <h1>Ad Title</h1>
                    <p>Posted By: </p>
                    <a href="http://maps.google.com">Ad Location</a>
                    <p>Date Posted: 02/04/2021 | Date Needed: 02/14/2021</p>
                </section>
                <section className="sportIcon">
                    <img
                        alt="Baseball"
                        className="sportNeeded"
                        src="https://img.icons8.com/wired/64/000000/bowling.png"/>
                </section>

            </section>
        );
    }
}

export default Ad;