import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import './App.css';

const Home = lazy(() => import('./components/Home'));

if (typeof window !== 'undefined') {
    injectStyle();
}

function App() {
    return (
        <Suspense fallback={<></>}>
            <ToastContainer />
            <Switch>
                <Route exact to='/' component={Home} />
                <Route
                    to='/:short'
                    component={() => <></>}
                />
            </Switch>
        </Suspense>
    );
}

export default App;
