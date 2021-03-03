import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Homepage from '../Homepage/Homepage';
import AdsPage from '../AdsPage/AdsPage';
import UsersPage from '../UsersPage/UsersPage';
import LogInSignUp from '../LogInSignUp/LogInSignUp';
import AdPage from '../AdsPage/AdPage/AdPage';
import UserProfile from '../UsersPage/UserProfile/UserProfile';
import TermsConditions from '../Policies/TermsConditions/TermsConditions';
import Privacy from '../Policies/Privacy/Privacy';

class App extends React.Component{
  render(){
    return(
      <body>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/ads" component={AdsPage} />
          <Route exact path="/ads/:id" component={AdPage}/>
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/login" component={LogInSignUp} />
          <Route exact path="/terms" component={TermsConditions} />
          <Route exact path="/privacy" component={Privacy} />
        </Switch>          
        <Footer />
      </body>
    )
  }
}

export default App;
