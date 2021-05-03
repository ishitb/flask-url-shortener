import { useEffect, useState, lazy } from 'react';

import '../styles/Home.css';

const AddLink = lazy(() => import('./AddLink'));

const Home = () => {
    const [url, setUrl] = useState('');
    const short = window.location.pathname.substr(1);

    useEffect(() => {
        if (short)
            fetch(`/api/urls/get/${short}`)
                .then(async (res) => {
                    const resp = await res.json();

                    if (res.status !== 200) {
                        console.log(resp);
                        setUrl('404');
                    } else {
                        console.log(resp);
                        window.location = resp.original;
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setUrl('404');
                });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (url && url !== '404')
            window.open('https://github.com');
    }, [url]);

    return !short ? (
        <div className='home'>
            <AddLink />
        </div>
    ) : url === '404' ? (
        <div className='home'>
            <h3 className='subheading-text foreground-accent'>
                This URL was not found in our database.
                Please try again.
            </h3>
        </div>
    ) : (
        <div className='home'>{window.open(url)}</div>
    );
};

export default Home;
