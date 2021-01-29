import React from 'react';
import logo from '../../resources/img/SSS_Logo_Transparent.png';
import './Header.css';

import SearchBar from '../SearchBar/SearchBar';

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = { loggedIn: false };
    }

    render(){
        return (
            <nav class="navigation-bar">
                <img alt="Sub Search Sport Logo" class="logo" src={logo} />
                <ul>
                    <li><SearchBar /></li>
                    <li>Ads</li>
                    <li>Users</li>
                    <li>{this.state.loggedin ? 'Messages' : ''}</li>
                    <li><button className="logInButton">{this.state.loggedIn ? 'Log Out' : 'Log In/Sign Up'}</button></li>
                </ul>
            </nav>
        );
    }

}

export default Header;