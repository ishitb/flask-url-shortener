import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    StoreProvider,
    createStore,
    persist,
} from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';

import model from './models';

const store = createStore(
    persist(model, { allow: ['accountModel'] })
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);
