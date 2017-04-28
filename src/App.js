import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';

const AppContainer = styled.div`
text-align: center;
p {
    font-size: large;
}
`;

const AppLogoSpin = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const AppLogo = styled.img`
animation: ${AppLogoSpin} infinite 20s linear;
height: 80px;
`;

const AppHeader = styled.div`
background-color: #222;
height: 150px;
padding: 20px;
color: white;
`;

class App extends Component {
    render() {
        return (
            <AppContainer>
                <AppHeader>
                    <AppLogo src={logo} alt="logo"/>
                    <h2>Welcome to React</h2>
                </AppHeader>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </AppContainer>
        );
    }
}

export default App;
