import React from 'react';
import './AdsPage.css';

import AdList from './AdList/AdList';

class AdsPage extends React.Component{


    render(){
        return(
            <section className="adsPage">
                <AdList />
            </section>
        );
    }
}

export default AdsPage;