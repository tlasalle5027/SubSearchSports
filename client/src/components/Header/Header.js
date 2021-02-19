import React from 'react';
import './Header.css';

import SearchBar from '../SearchBar/SearchBar';

import logo from '../../resources/img/SSS_Logo_Transparent.png';
import headerBaseball from '../../resources/img/Header/baseball-diamond-37200.png';
import headerHockey from '../../resources/img/Header/hockey-rink.jpg';
import headerSoccer from '../../resources/img/Header/soccer-field.png';
import headerFootball from '../../resources/img/Header/football-field.jpg';

class Header extends React.Component {
    constructor(props){
        super(props);        

        this.state = { loggedIn: false };
    }    

    componentDidMount(){
        const bgImages = [headerBaseball, headerHockey, headerSoccer, headerFootball];
        const random = Math.floor(Math.random() * bgImages.length);
        this.setState({bgImage: bgImages[random]});
    }

    render(){
        return (
            <nav className="navigation-bar" style={{backgroundImage: `url(${this.state.bgImage})`}}>
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