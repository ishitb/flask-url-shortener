import { Suspense, lazy, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Loader from './components/Loader';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const SignIn = lazy(() => import('./components/SignIn'));
const Home = lazy(() => import('./components/Home'));

if (typeof window !== 'undefined') {
    injectStyle();
}

function App() {
    const [signingIn, setSigningIn] = useState(false);

    return (
        <Suspense fallback={<Loader />}>
            <div className='App background-main'>
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
                <Navbar setSigningIn={setSigningIn} />
                <Home />
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
