import React from 'react';
import NavBar from './NavBar';
import Feed from './Feed';
import Messages from './Messages';
import Onboarding from './Onboarding';
import { MuiThemeProvider } from 'material-ui/styles';
import muiTheme from '../constants/muiTheme';

export default function App () {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <div>
                <NavBar/>
                <Messages/>
                <Feed/>
                <Onboarding/>
            </div>
        </MuiThemeProvider>
    );
}