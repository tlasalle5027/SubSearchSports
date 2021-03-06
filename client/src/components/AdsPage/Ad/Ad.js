import React from 'react';
import apiCalls from '../../../utils/apiCalls';
import helpers from '../../../utils/helpers';
import './Ad.css';

class Ad extends React.Component{
    constructor(props){
        super(props);

        this.state = { userInfo: [] };

        this.createAdLink = this.createAdLink.bind(this);
        this.createGoogleMapsLink = this.createGoogleMapsLink.bind(this);
        this.createProfileLink = this.createProfileLink.bind(this);
        this.createSportIcon = this.createSportIcon.bind(this);
    }

    componentDidMount(){
        apiCalls.getUser(this.props.ad.posted_by_id).then(user => {
            if(user){
                this.setState({ userInfo: user[0] });                
            }
        });
    }

    createAdLink(){
        return `/ads/${this.props.ad.ad_id}`;
    }

    createGoogleMapsLink(){
        return `https://maps.google.com/?q=${this.props.ad.location_name}, ${this.props.ad.location_address_one}, ${this.props.ad.location_city} ${this.props.ad.location_state}, ${this.props.ad.location_zip}`;
    }

    createProfileLink(){
        return `/users/${this.props.ad.posted_by_id}`;
    }
    
    createSportIcon(){
        switch(this.props.ad.sport_needed){
            case 1:
                return(<img
                    alt="Baseball"
                    className="sportNeeded"
                    src="https://img.icons8.com/ios/100/000000/baseball.png"/>);                
            case 9:
                return(<img
                    alt="Ice Hockey"
                    className="sportNeeded"
                    src="https://img.icons8.com/office/80/000000/hockey.png"/>);
            default:
                break;
        }

    }

    render(){
        return(
            <section className="ad">
                <section className="adInfo">
                    <a href={this.createAdLink()}><h1>{this.props.ad.ad_title}</h1></a>
                    <p>Posted By: <a href={this.createProfileLink()}>{this.state.userInfo.user_name}</a></p>
                    <a href={this.createGoogleMapsLink()}>{this.props.ad.location_name}</a>
                    <p>Date Posted: {helpers.formatDate(this.props.ad.date_posted)}</p>
                    <p>Date Needed: {helpers.formatDate(this.props.ad.date_needed)}</p>
                </section>
                <section className="sportIcon">
                    {this.createSportIcon()}
                </section>
            </section>
        );
    }
}

export default Ad;