import React from 'react';
import './User.css';

class User extends React.Component{

    render(){
        return(
            <section className="user">
                <section className="userInfo">
                    <h1>{this.props.user.user_name}</h1>
                    <p>{this.props.user.first_name + " " + this.props.user.last_name}</p>
                    <p>Member Since: {this.props.user.member_since}</p>
                </section>
            </section>
        );
    }
}

export default User;