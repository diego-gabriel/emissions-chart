import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ChartApp from './components/ChartApp';
import { store } from './store/Store';

window.document.addEventListener('DOMContentLoaded', () => {
    const appRoot = ReactDOM.createRoot(document.getElementById('root'));
    appRoot.render(
        <Provider store={store}>
            <ChartApp />
        </Provider>
    );
});
