// @flow

import React from 'react';
import type { IMessage } from '../entities/index';
import type { RootState } from '../createStore';
import Message from './Message';
import { connect } from 'react-redux';
import styled from 'styled-components';

type MessagesProps = {
    messages: IMessage[]
};

const mapStateToProps = ({ messages }: RootState) => ({ messages });

const MessagesContainer = styled.div`
    position: fixed;
    top: 6.4rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
`;

const Messages = (props: MessagesProps) => (
    <MessagesContainer>
        {props.messages.map((message: IMessage, index: number) => (
            <Message key={index} message={message}/>
        ))}
    </MessagesContainer>
);

export default connect(mapStateToProps)(Messages);