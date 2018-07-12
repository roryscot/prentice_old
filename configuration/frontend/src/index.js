import React from 'react';
import ReactDOM from 'react-dom';

import './assets/bootstrap-4.1.1-dist/css/bootstrap.min.css';
import './assets/static/css/main.css';
import './assets/static/css/custom.css';

import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';


const ReactRoot = document.getElementById('reactRoot');

if (ReactRoot) {
    ReactDOM.render(<App />, ReactRoot);
    registerServiceWorker();
}
