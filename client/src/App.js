import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));

if (typeof window !== 'undefined') {
    injectStyle();
}

function App() {
    return (
        <div className='App background-main'>
            <Suspense fallback={<></>}>
                <ToastContainer />
                <Navbar />
                <Home />
            </Suspense>
        </div>
    );
}

export default App;
