import React from 'react';
import './AdsPage.css';

import AdList from './AdList/AdList';

class AdsPage extends React.Component{


    render(){
        return(
            <body>
                <AdList />
            </body>
        );
    }
}

export default AdsPage;