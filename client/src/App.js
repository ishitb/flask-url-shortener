import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loader from './components/Loader';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const SignIn = lazy(() => import('./components/SignIn'));
const Home = lazy(() => import('./components/Home'));
const Furls = lazy(() => import('./components/Furls'));

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
                <Routes>
                    <Route
                        exact
                        path='/'
                        component={Home}
                    />
                    <Route path='/*' component={Furls} />
                </Routes>
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
