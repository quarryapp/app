import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Feed from './Feed';

const AppContainer = styled.div`

`;

export default function App () {
    return (
        <AppContainer>
            <NavBar/>
            <Feed/>
        </AppContainer>
    );
}