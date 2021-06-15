import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

import '../styles/404.css';

import notFound from '../assets/notFound.json';

const NotFound404 = () => {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: notFound,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='not-found'>
            <Lottie
                options={lottieOptions}
                height={500}
                width={500}
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
