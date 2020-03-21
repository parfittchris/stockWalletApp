import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    window.getState = store.getState;    

    const root = document.getElementById('root')
    const app = (

        // React persist allows state to save during page refreshes

        <Provider store={store}>
            <HashRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </HashRouter>
        </Provider>
    )

    ReactDOM.render(app, root);
    

});


