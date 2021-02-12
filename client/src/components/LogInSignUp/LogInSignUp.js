import React from 'react';
import './LogInSignUp.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';

class LogInSignUp extends React.Component{

    render(){
        return (
            <section className="logInSignUp">
                <Tabs>
                    <TabList>
                        <Tab>Log In</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>

                    <TabPanel>                        
                        <h1>You are just a click away from</h1>
                        <h1>finding a rec sports team to PLAY with!</h1>
                        <LogIn />                        
                    </TabPanel>
                    <TabPanel>                        
                        <h1>You are just a click away from</h1>
                        <h1>finding a rec sports team to PLAY with!</h1>
                        <SignUp />
                    </TabPanel>
                </Tabs>
            </section>
        )
    }

}

export default LogInSignUp;