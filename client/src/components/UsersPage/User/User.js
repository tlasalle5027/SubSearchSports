import React from 'react';
import './User.css';

import helpers from '../../../utils/helpers';

class User extends React.Component{
    constructor(props){
        super(props);

        this.createProfileLink = this.createProfileLink.bind(this);
    }

    createProfileLink(){
        return `/users/${this.props.user.user_id}`;
    }

    render(){
        return(
            <section className="user">
                <a href={this.createProfileLink()}><h1>{this.props.user.user_name}</h1></a>
                <h2>{this.props.user.first_name}</h2>
                <p>Member Since: {helpers.formatDate(this.props.user.member_since)}</p>                
            </section>
        );
    }
}

export default User;