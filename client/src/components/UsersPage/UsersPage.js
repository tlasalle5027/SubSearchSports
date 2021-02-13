import React from 'react';
import './UsersPage.css';

import UserList from './UserList/UserList';
import apiCalls from '../../utils/apiCalls';

class UsersPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount(){
        apiCalls.getUsers().then(users => {
            if(users){
                this.setState({users: users});
            }
        });
    }


    render(){
        return(
            <section className="usersPage">
                <UserList userList={this.state.users}/>
            </section>
        );
    }
}

export default UsersPage;