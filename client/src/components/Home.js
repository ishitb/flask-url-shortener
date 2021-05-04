import { lazy } from 'react';
import { useStoreActions } from 'easy-peasy';

import '../styles/Home.css';

const AddLink = lazy(() => import('./AddLink'));

const Home = () => {
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    return (
        <div className='home'>
            <AddLink />
            <button
                onClick={() => {
                    toggleLoader(true);
                }}
            >
                Click me
            </button>
        </div>
    );
};

export default Home;
