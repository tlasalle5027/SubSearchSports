import React from 'react';
import './AdList.css';

import Ad from '../Ad/Ad';

class AdList extends React.Component{

    render(){
        return(
            <section className="adList">
                {
                    this.props.adList.map(ad => {
                        return <Ad ad={ad} key={ad.ad_id} />
                    })
                }
            </section>
        );
    }
}

export default AdList;