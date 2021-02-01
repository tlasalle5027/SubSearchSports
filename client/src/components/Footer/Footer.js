import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <p>&copy; 2021 <a href="http://www.cfmsoftware.com/">CFM Software</a></p>
                <p>Icons courtesy of <a href="https://icons8.com">Icons8</a></p>
            </footer>            
        );
    }
}

export default Footer;