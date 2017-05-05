// @flow

import { CALL_API, ApiError } from 'redux-api-middleware';
import { feedUrl } from '../constants/apiUrls';
import { REHYDRATE } from 'redux-persist/constants';
import { ICard } from '../entities/index';
// state def

export type FeedState = {
    error: ?ApiError,
    isLoading: boolean,
    items: {
        docs: ICard[],
        page: number,
        pages: number,
        total: number,
        limit: number
    }
};

const defaultState: FeedState = {
    error: null,
    isLoading: false,
    items: {
        docs: [],
        page: 0,
        pages: 0,
        total: 0,
        limit: 0
    }
};

// actions
export const FEED_REQUEST = 'FEED_REQUEST';
export const FEED_SUCCESS = 'FEED_SUCCESS';
export const FEED_FAILURE = 'FEED_FAILURE';

// reducer

export const reducer = (state: FeedState = defaultState, action: Object) => {
    switch (action.type) {
        case REHYDRATE: {
            // we only allow rehydration of items key.
            const items = 'feed' in action.payload ? action.payload.feed.items : defaultState.items;
            return {
                ...state,
                items
            };
        }
        case FEED_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FEED_SUCCESS: {
            // backend returns a string for some reason...
            const page = parseInt(action.payload.page);
            return {
                ...state,
                items: {
                    ...action.payload,
                    docs: page === 1 ? action.payload.docs : [...state.items.docs, ...action.payload.docs],
                    page
                },
                isLoading: false
            };
        }
        case FEED_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};

// action creators

export const getFeed = (token: string, page: number = 1) => ({
    [CALL_API]: {
        endpoint: feedUrl(page),
        method: 'GET',
        headers: {
            //todo: kind of annoying to have to add this manually in every dispatch...
            Authorization: `Bearer ${token}`
        },
        types: [FEED_REQUEST, FEED_SUCCESS, FEED_FAILURE]
    }
});
