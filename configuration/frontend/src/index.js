import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

import registerServiceWorker from './registerServiceWorker';


const ReactRoot = document.getElementById('reactRoot');

if (ReactRoot) {
    ReactDOM.render(<App />, ReactRoot);
    registerServiceWorker();
}
