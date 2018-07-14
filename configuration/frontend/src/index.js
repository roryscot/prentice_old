import React from 'react';
import ReactDOM from 'react-dom';

import './frontendAssets/bootstrap-4.1.1-dist/css/bootstrap.min.css';
import './frontendAssets/static/css/main.css';
import './frontendAssets/static/css/custom.css';

import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';


const ReactRoot = document.getElementById('reactRoot');

if (ReactRoot) {
    ReactDOM.render(<App />, ReactRoot);
    registerServiceWorker();
}
