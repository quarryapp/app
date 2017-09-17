// @flow

import promisify from 'es6-promisify';
import localForage from 'localforage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import { autoRehydrate, persistStore as persistStoreWithCallback } from 'redux-persist';
import type { SagaMiddleware } from 'redux-saga';
import createSagaMiddleware from 'redux-saga';
import isChromeExtension from './constants/isChromeExtension';
import { default as colors, type ColorsState } from './redux/colors';
import { default as feed, type FeedState } from './redux/feed';
import { default as logos, type LogosState } from './redux/logos';
import { default as messages, type MessagesState } from './redux/messages';
import { default as onboarding, type OnboardingState } from './redux/onboarding';
import { default as token, type TokenState } from './redux/token';
import messagesSaga from './sagas/messages';
import SyncStorage from './services/SyncStorage';

const persistStore = promisify(persistStoreWithCallback);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootState = {
    feed: FeedState,
    token: TokenState,
    colors: ColorsState,
    messages: MessagesState,
    logos: LogosState,
    onboarding: OnboardingState,
};

const reducer = combineReducers({
    feed,
    token,
    colors,
    logos,
    messages,
    onboarding
});
export default async () => {
    const saga: SagaMiddleware = createSagaMiddleware();
    const middlewares = [apiMiddleware, saga];
    if (process.env.NODE_ENV !== 'production' && isChromeExtension) {
        // we only use logger middleware when running from the extension, because we have no other choice.
        // (redux devtools can't access other extensions)
        middlewares.push(logger);
    }

    const store = createStore(reducer, undefined, composeEnhancers(
        applyMiddleware(...middlewares),
        autoRehydrate(),
    ));

    let userStorage = SyncStorage;
    if (!isChromeExtension) {
        // eslint-disable-next-line no-console
        console.warn('createStore: sync storage not available, falling back to localForage');
        userStorage = localForage;
    }

    saga.run(messagesSaga);

    // we persist to 2 separate storages, 1 for mission critical data (user settings etc), and one for caching
    await persistStore(store, { userStorage, whitelist: ['token'], blacklist: ['messages'] });
    await persistStore(store, { localForage, blacklist: ['token', 'messages'] });

    return store;
};
