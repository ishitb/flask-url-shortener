import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import NotFound from './404';

const Furls = () => {
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    const params = useParams();

    // 0 --> Loading
    // 1 --> Found
    // 2 --> NotFound
    const [found, setFound] = useState(0);
    const [link, setLink] = useState('');

    const getOriginal = async () => {
        toggleLoader(true);

        const short = params['*'];

        fetch(`/api/get/${short}`)
            .then(async (res) => {
                if (res.status === 404) {
                    throw Error('Not Found');
                }

                const data = await res.json();

                setLink(data.original);
                setFound(1);
            })
            .catch((e) => {
                console.log(e);
                setFound(2);
            })
            .finally(() => {
                toggleLoader(false);
            });
    };

    useEffect(() => {
        getOriginal();

        // eslint-disable-next-line
    }, []);

    return found === 0 ? (
        <div></div>
    ) : found === 1 ? (
        <>{window.location.replace(link)}</>
    ) : (
        <NotFound />
    );
};

export default Furls;
