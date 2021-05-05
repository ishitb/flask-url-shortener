import { lazy } from 'react';
import { useStoreState } from 'easy-peasy';

import '../styles/Home.css';

const AddLink = lazy(() => import('./AddLink'));
const Links = lazy(() => import('./Links'));

const Home = () => {
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
            <AddLink />
            {user_logged_in && <Links />}
        </div>
    );
};

export default Home;
