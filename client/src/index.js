import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
    StoreProvider,
    createStore,
    persist,
} from 'easy-peasy';
import model from './models';

const store = createStore(
    persist(model, { allow: ['accountModel'] })
);

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
