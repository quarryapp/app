// @flow

import React from 'react';
import styled from 'styled-components';

// type NavBarProps = {};

const NavBarContainer = styled.nav`
display:flex;
height:4.8rem;
flex-direction:row;
align-items:center;

h1 {
    font-family: 'Space Mono', monospace;
    font-weight:bold;
    text-align:center;
    flex-grow:1;
    font-size:2.4rem;
}
`;

const NavBar = () => (
    <NavBarContainer>
        <h1>app</h1>
    </NavBarContainer>
);

export default NavBar;