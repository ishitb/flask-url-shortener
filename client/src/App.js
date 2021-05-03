import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
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
                <Switch>
                    <Route exact to='/' component={Home} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
