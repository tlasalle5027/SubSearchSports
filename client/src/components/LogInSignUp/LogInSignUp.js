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
                        <LogIn />                        
                    </TabPanel>
                    <TabPanel>
                        <SignUp />
                    </TabPanel>
                </Tabs>
            </section>
        )
    }

}

export default LogInSignUp;