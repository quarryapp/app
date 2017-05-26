// @flow

import type { FeedFailureAction } from './feed';
import type { IMessage, MessageIcon, MessageType } from '../entities/index';

// state def

export type MessagesState = IMessage[];

const defaultState: MessagesState = [];

export type Action = AddMessageAction | FeedFailureAction;

// actions
type AddMessageAction = {
    type: 'ADD_MESSAGE',
    payload: IMessage
};

// reducer
export default (state: MessagesState = defaultState, action: Action): MessagesState => {
    switch (action.type) {
        // i'm having serious doubts about redux-api-middleware looking at this code... 
        case 'FEED_REQUEST':
            return action.error ? [...state, {
                type: 'error',
                icon: 'cloud_off',
                text: 'Could not connect to Quarry servers'
            }] : [...state];
        case 'FEED_FAILURE':
            return [...state, {
                type: 'error',
                icon: 'warning',
                text: 'A server error occurred, try again later'
            }];
        default:
            return state;
    }
};

// action creators
export const addMessage = (text: string, type: MessageType = 'message', icon: MessageIcon = null): AddMessageAction => ({
    type: 'ADD_MESSAGE',
    payload: { text, type, icon }
});