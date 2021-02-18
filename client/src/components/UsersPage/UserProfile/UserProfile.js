import React from 'react';
import './UserProfile.css';

import apiCalls from '../../../utils/apiCalls';

class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = 
        { 
            user: [],
            profileInfo: [] 
        };

        this.createMailToLink = this.createMailToLink.bind(this);
        this.createGoogleMapsLink = this.createGoogleMapsLink.bind(this);
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
        });
    }

    createGoogleMapsLink(){
        return `https://maps.google.com/?q=${this.state.profileInfo.user_city} ${this.state.profileInfo.user_state}, ${this.state.profileInfo.user_zip}`;
    }

    createMailToLink(){
        return `mailto:${this.state.user.email}?subject=I found you on Sub Search Sport`;

    }

    render(){
        return(
            <section className="userProfile">
                <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
                <h2>{this.state.user.user_name}</h2>
                <p>Located in: <a href={this.createGoogleMapsLink()}>{this.state.profileInfo.user_city}, {this.state.profileInfo.user_state}</a></p>
                <p>{this.state.profileInfo.profile_bio}</p>
                <a href={this.createMailToLink()}><button className="contactPlayer">E-mail this User</button></a>
            </section>
        );
    }
}

export default UserProfile;