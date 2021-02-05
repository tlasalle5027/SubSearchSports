import React from 'react';
import './AdList.css';

import Ad from '../Ad/Ad';

class AdList extends React.Component{


    render(){
        return(
            <section className="adList">
                <Ad />
                <Ad />
                <Ad />
                <Ad />
            </section>
        );
    }
}

export default AdList;