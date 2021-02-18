import React from 'react';
import './UserProfile.css';

import apiCalls from '../../../utils/apiCalls';

class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = 
        { 
            user: [],
            profileInfo: [],
            sportNameOne: '',
            sportNameTwo: '',
            sportNameThree: '' 
        };

        this.createMailToLink = this.createMailToLink.bind(this);
        this.createGoogleMapsLink = this.createGoogleMapsLink.bind(this);
        this.createSportSquares = this.createSportSquares.bind(this);
    }

    componentDidMount(){
        apiCalls.getUser(this.props.match.params.id).then(user => {
            if(user){
                this.setState({ user: user[0] });
            }
        });

        apiCalls.getUserProfile(this.props.match.params.id).then(profile =>{
            if(profile){                
                this.setState({ profileInfo: profile[0] });
            }            

            apiCalls.getSportName(this.state.profileInfo.sport_01).then(sport => {
                if(sport){
                    this.setState({ sportNameOne: sport[0].sport_name });
                }
            });

            if(this.state.profileInfo.sport_02 != null){
                apiCalls.getSportName(this.state.profileInfo.sport_02).then(sport => {
                    if(sport){
                        this.setState({ sportNameTwo: sport[0].sport_name });
                    }
                });                
            }

            if(this.state.profileInfo.sport_03 != null){
                apiCalls.getSportName(this.state.profileInfo.sport_03).then(sport => {
                    if(sport){
                        this.setState({ sportNameThree: sport[0].sport_name });
                    }
                });                
            }
        });
    }

    createGoogleMapsLink(){
        return `https://maps.google.com/?q=${this.state.profileInfo.user_city} ${this.state.profileInfo.user_state}, ${this.state.profileInfo.user_zip}`;
    }

    createMailToLink(){
        return `mailto:${this.state.user.email}?subject=I found you on Sub Search Sport`;
    }

    createSportSquares(){
        console.log(this.state.profileInfo);
        if(this.state.profileInfo.sport_02 == null){
            return (
                <section className="sportsSquares">
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameOne}</p>
                        <p>Positions: {this.state.profileInfo.sport_01_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_01_skill} skill level</p>
                    </div>
                </section>
            );
        } else if(this.state.profileInfo.sport_03 == null){
            return (
                <section className="sportsSquares">
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameOne}</p>
                        <p>Positions: {this.state.profileInfo.sport_01_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_01_skill} skill level</p>
                    </div>
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameTwo}</p>
                        <p>Positions: {this.state.profileInfo.sport_02_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_02_skill} skill level</p>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="sportsSquares">
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameOne}</p>
                        <p>Positions: {this.state.profileInfo.sport_01_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_01_skill} skill level</p>
                    </div>
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameTwo}</p>
                        <p>Positions: {this.state.profileInfo.sport_02_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_02_skill} skill level</p>
                    </div>
                    <div className="sportSquare">
                        <p>I play {this.state.sportNameThree}</p>
                        <p>Positions: {this.state.profileInfo.sport_03_positions}</p>
                        <p>On a scale of 1-10, I am a {this.state.profileInfo.sport_03_skill} skill level</p>                        
                    </div>
                </section>
            );
        }
    }

    render(){
        return(
            <section className="userProfile">
                <section className="userInfo">
                    <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
                    <h2>{this.state.user.user_name}</h2>
                    <p>Located in: <a href={this.createGoogleMapsLink()}>{this.state.profileInfo.user_city}, {this.state.profileInfo.user_state}</a></p>
                    <p>{this.state.profileInfo.profile_bio}</p>
                </section>
                {this.createSportSquares()}
                <section className="contact">                    
                    <a href={this.createMailToLink()}><button className="contactPlayer">E-mail this User</button></a>
                </section>
            </section>
        );
    }
}

export default UserProfile;