import React from 'react';
import './UserList.css';

import User from '../User/User';

class UserList extends React.Component{

    render(){
        return(
            <section className="userList">
                {
                    this.props.userList.map(user => {
                        return <User user={user} />
                    })
                }
            </section>
        );
    }
}

export default UserList;