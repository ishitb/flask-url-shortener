import { lazy, useRef } from 'react';
import { useStoreState } from 'easy-peasy';

import '../styles/Home.css';

const AddLink = lazy(() => import('./AddLink'));
const Links = lazy(() => import('./Links'));

const Home = () => {
    const inputRef = useRef();

    const { user_logged_in, user_data } = useStoreState(
        (store) => store.accountModel
    );

    return (
        <div className='home'>
            {user_logged_in && (
                <div className='main-heading-text foreground-light center-text'>
                    <span className='foreground-accent'>
                        Welcome
                    </span>{' '}
                    {user_data.name}
                </div>
            )}
            <AddLink inputRef={inputRef} />
            {user_logged_in && (
                <Links inputRef={inputRef} />
            )}
        </div>
    );
};

export default Home;
