import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';


document.addEventListener('DOMContentLoaded', () => {

    const root = document.getElementById('root')
    const app = (


            <HashRouter>
                {/* <PersistGate persistor={persistor}> */}
                <App />
                {/* </PersistGate> */}
            </HashRouter>
    )

    ReactDOM.render(app, root);


});
