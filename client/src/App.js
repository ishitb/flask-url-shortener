import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Loader from './components/Loader';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));

if (typeof window !== 'undefined') {
    injectStyle();
}

function App() {
    return (
        <Suspense fallback={<></>}>
            <div className='App background-main'>
                <ToastContainer />
                <Navbar />
                <Home />
            </div>
            <Loader />
        </Suspense>
    );
}

export default App;
