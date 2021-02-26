import React from 'react';
import apiCalls from '../../../utils/apiCalls';
import helpers from '../../../utils/helpers';
import './AdPage.css';

class AdPage extends React.Component{
    constructor(props){
        super(props);

        this.state = 
        {   
            ad: [],
            datePosted: '',
            dateNeeded: '',
            sportName: '',
            userName: '' 
        };

        this.createGoogleMapsLink = this.createGoogleMapsLink.bind(this);
        this.createProfileLink = this.createProfileLink.bind(this);
    }

    componentDidMount(){
        apiCalls.getAd(this.props.match.params.id).then(ad =>{
            if(ad){                
                this.setState({ 
                    ad: ad[0],
                    datePosted: helpers.formatDate(ad[0].date_posted),
                    dateNeeded: helpers.formatDate(ad[0].date_needed)
                 });
            }
            apiCalls.getUser(this.state.ad.posted_by_id).then(user => {
                if(user){
                    this.setState({ userName: user[0].user_name });                
                }
            });

            apiCalls.getSportName(this.state.ad.sport_needed).then(sport => {
                if(sport){
                    this.setState({ sportName: sport[0].sport_name });                
                }
            });
        });
    }

    createGoogleMapsLink(){
        return `https://maps.google.com/?q=${this.state.ad.location_name}, ${this.state.ad.location_address_one}, ${this.state.ad.location_city} ${this.state.ad.location_state}, ${this.state.ad.location_zip}`;
    }

    createProfileLink(){
        return `/users/${this.state.ad.posted_by_id}`;
    }

    render(){
        return(
            <section className="adPage">
                <h1>{this.state.ad.ad_title}</h1>
                <p>Posted by: <a href={this.createProfileLink()}>{this.state.userName}</a></p>
                <p>Located at: <a href={this.createGoogleMapsLink()}>{this.state.ad.location_name}</a></p>
                <h2>Date Posted: {this.state.datePosted}</h2>
                <h2>Date Needed: {this.state.dateNeeded}</h2>
                <p><span className="bold">Sport:</span> {this.state.sportName} | <span className="bold">Position:</span> {this.state.ad.position_needed}</p>
                <p>{this.state.ad.ad_body}</p>
            </section>
        );
    }
}

export default AdPage;