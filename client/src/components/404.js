import Lottie from 'react-lottie-player';
import { Link } from 'react-router-dom';

import '../styles/404.css';

import notFound from '../assets/notFound.json';

const NotFound404 = () => {
    return (
        <div className='not-found'>
            <Lottie
                animationData={notFound}
                loop
                play
                rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                }}
                style={{
                    height: 500,
                    width: 500,
                }}
            />
            <h3 className='heading-text foreground-accent center-text'>
                This URL is not stored in our database.
                Please try again.
            </h3>
            <h3 className='heading-text foreground-accent'>
                Go to{' '}
                <Link className='foreground-primary' to='/'>
                    Home
                </Link>
            </h3>
        </div>
    );
};

export default NotFound404;
