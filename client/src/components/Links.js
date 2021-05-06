import { useEffect, lazy } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import '../styles/Links.css';

const Link = lazy(() => import('./Link'));

const Links = () => {
    const { stored_links } = useStoreState(
        (state) => state.linkModel
    );

    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );
    const { retrieveLinks } = useStoreActions(
        (actions) => actions.linkModel
    );

    useEffect(() => {
        retrieveLinks(toggleLoader);

        // eslint-disable-next-line
    }, []);

    return (
        <div className='links d-flex-column'>
            <div className='heading-text foreground-primary'>
                Stored Links
            </div>
            <div className='links-list'>
                {stored_links.length <= 0 ? (
                    <h3 className='subheading-text foreground-error'>
                        You have no stored links right.
                        Shorten a url right now!
                    </h3>
                ) : (
                    stored_links.map((link) => (
                        <Link
                            link={link}
                            key={link.short}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Links;
