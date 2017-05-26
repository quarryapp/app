import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { FeedState, reducer as feed } from './redux/feed';
import { reducer as token, TokenState } from './redux/token';
import { apiMiddleware } from 'redux-api-middleware';
import { autoRehydrate, persistStore as persistStoreWithCallback } from 'redux-persist';
import SyncStorage from './services/SyncStorage';
import localForage from 'localforage';
import isChromeExtension from './constants/isChromeExtension';
import logger from 'redux-logger';
import colors, { ColorsState } from './redux/colors';
import promisify from 'es6-promisify';
import logos from './redux/logos';
import thunk from 'redux-thunk';
import messages, { MessagesState } from './redux/messages';

const persistStore = promisify(persistStoreWithCallback);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootState = {
    feed: FeedState,
    token: TokenState,
    colors: ColorsState,
    messages: MessagesState
};

const reducer = combineReducers({
    feed,
    token,
    colors,
    logos,
    messages
});
export default async () => {
    let middlewares = [apiMiddleware, thunk];
    if(process.env.NODE_ENV !== 'production' && isChromeExtension) {
        // we only use logger middleware when running from the extension, because we have no other choice.
        // (redux devtools can't access other extensions)
        middlewares.push(logger);
    }
    
    const store = createStore(reducer, undefined, composeEnhancers(
        applyMiddleware(...middlewares),
        autoRehydrate()
    ));
    
    let userStorage = SyncStorage;
    if(!isChromeExtension) {
        // eslint-disable-next-line no-console
        console.warn('createStore: sync storage not available, falling back to localForage');
        userStorage = localForage;
    }
    
    // we persist to 2 separate storages, 1 for mission critical data (user settings etc), and one for caching
    await persistStore(store, { userStorage, whitelist: ['token'], blacklist: ['messages'] });
    await persistStore(store, { localForage, blacklist: ['token', 'messages'] });
    
    return store;
};