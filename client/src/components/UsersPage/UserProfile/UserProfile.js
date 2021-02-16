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

    render(){
        return(
            <section className="userProfile">
                <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
                <h2>{this.state.user.user_name}</h2>
                <p>{this.state.profileInfo.profile_bio}</p>
            </section>
        );
    }
}

export default UserProfile;