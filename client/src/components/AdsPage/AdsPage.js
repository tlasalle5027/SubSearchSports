import React from 'react';
import './AdsPage.css';

import AdList from './AdList/AdList';
import apiCalls from '../../utils/apiCalls';

class AdsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ads: []
        };
    }

    componentDidMount(){
        apiCalls.getAds().then(ads => {
            if(ads){
                this.setState({ads: ads});
            }
        });
    }


    render(){
        return(
            <section className="adsPage">
                <AdList adList={this.state.ads}/>
            </section>
        );
    }
}

export default AdsPage;