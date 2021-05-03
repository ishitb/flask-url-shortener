import { useEffect, useState, lazy } from 'react';

import '../styles/Home.css';

const AddLink = lazy(() => import('./AddLink'));

const Home = () => {
    return (
        <div className='home'>
            <AddLink />
        </div>
    );
};

export default Home;
