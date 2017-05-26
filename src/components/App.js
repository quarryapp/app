import React from 'react';
import NavBar from './NavBar';
import Feed from './Feed';
import Messages from './Messages';

export default function App () {
    return (
        <div>
            <NavBar/>
            <Messages/>
            <Feed/>
        </div>
    );
}