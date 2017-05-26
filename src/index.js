import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import createStore from './createStore';

(async() => {
    const store = await createStore();
    const renderApp = (App) => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );
    };

    renderApp(App);
    
    if (module.hot) {
        module.hot.accept('./components/App', () => {
            var NextApp = require('./components/App').default;
            renderApp(NextApp);
        });
    }
})();