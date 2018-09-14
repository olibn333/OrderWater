import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'normalize.css';
import registerServiceWorker from './registerServiceWorker';
import "typeface-roboto";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
