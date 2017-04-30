// @flow

// state def

const defaultState = '';

// actions
const SET_TOKEN = 'SET_TOKEN';

// reducer
export const reducer = (state: string = defaultState, action: Object) => {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

// action creators
export const setToken = (token: string) => ({
    type: SET_TOKEN,
    payload: token
});