import { Suspense, lazy, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Loader from './components/Loader';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const SignIn = lazy(() => import('./components/SignIn'));
const Home = lazy(() => import('./components/Home'));
const Furls = lazy(() => import('./components/Furls'));

if (typeof window !== 'undefined') {
    injectStyle();
}

function App() {
    const [signingIn, setSigningIn] = useState(false);

    return (
        <Suspense fallback={<Loader />}>
            <div className='App background-main'>
                <Navbar setSigningIn={setSigningIn} />
                <div className='background'>
                    <ul className='circles'>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <ToastContainer />
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={Home}
                    />
                    <Route path='/*' component={Furls} />
                </Switch>
            </div>

            <SignIn
                signingIn={signingIn}
                setSigningIn={setSigningIn}
            />
            <Loader />
        </Suspense>
    );
}

export default App;
