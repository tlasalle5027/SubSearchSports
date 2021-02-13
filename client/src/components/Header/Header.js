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
            <nav className="navigation-bar">
                <a href="/"><img alt="Sub Search Sport Logo" className="logo" src={logo} /></a>
                <span className="SearchBar"><SearchBar /></span>
                <ul>                    
                    <li><a href="/ads">Ads</a></li>
                    <li><a href="/users">Users</a></li>
                    <li><a href="/login"><button className="logInButton">{this.state.loggedIn ? 'Log Out' : 'Log In/Sign Up'}</button></a></li>
                </ul>
            </nav>
            
        );
    }
}

export default Header;