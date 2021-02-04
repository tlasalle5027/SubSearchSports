import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Homepage from '../Homepage/Homepage';
import AdsPage from '../AdsPage/AdsPage';

class App extends React.Component{
  render(){
    return(
      <body>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/ads" component={AdsPage} />
        </Switch>          
        <Footer />
      </body>
    )
  }
}

export default App;
