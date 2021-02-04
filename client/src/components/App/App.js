import './App.css';
import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Homepage from '../Homepage/Homepage';

class App extends React.Component{
  render(){
    return(
      <body>
        <Header />
        <Homepage />
        <Footer />
      </body>
    )
  }
}

export default App;
