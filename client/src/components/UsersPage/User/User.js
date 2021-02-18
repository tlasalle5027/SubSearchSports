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
                <section className="userInfo">
                    <a href={this.createProfileLink()}><h1>{this.props.user.user_name}</h1></a>
                    <p>{this.props.user.first_name + " " + this.props.user.last_name}</p>
                    <p>Member Since: {helpers.formatDate(this.props.user.member_since)}</p>
                </section>
            </section>
        );
    }
}

export default User;