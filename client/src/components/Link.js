import { useState, lazy } from 'react';
import { useStoreActions } from 'easy-peasy';

import '../styles/Link.css';

const EditLink = lazy(() => import('./EditLink'));

const Link = ({ link }) => {
    let date = new Date(link.created.$date);

    const { deleteLink } = useStoreActions(
        (actions) => actions.linkModel
    );
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    const [toEdit, setToEdit] = useState({});
    const [show, setShow] = useState(false);

    return (
        <>
            <EditLink
                toEdit={toEdit}
                show={show}
                setToEdit={setToEdit}
                setShow={setShow}
            />
            <div className='link d-flex-column background-main-translucent border-radius-10'>
                <div className='buttons'>
                    <div
                        className='edit-btn link-btn'
                        onClick={() => {
                            setToEdit(link);
                            setShow(true);
                        }}
                    >
                        <i className='far foreground-primary fa-edit'></i>
                    </div>
                    <div
                        className='delete-btn link-btn'
                        onClick={() =>
                            deleteLink({
                                id: link._id.$oid,
                                toggleLoader,
                            })
                        }
                    >
                        <i className='far foreground-error fa-trash-alt'></i>
                    </div>
                </div>
                <div className='detail'>
                    <h5 className='normal-text foreground-light'>
                        Shortened URL
                    </h5>
                    <a
                        className='subheading-text foreground-accent'
                        href={
                            window.location.toString() +
                            link.short
                        }
                    >
                        /{link.short}
                    </a>
                </div>
                <div className='detail'>
                    <h5 className='normal-text foreground-light'>
                        Original URL
                    </h5>
                    <a
                        className='subheading-text foreground-primary'
                        href={link.original}
                        style={{
                            fontSize: '1.5rem',
                        }}
                    >
                        {`${link.original.substr(0, 25)}${
                            link.original.length > 25
                                ? '...'
                                : ''
                        }`}
                    </a>
                </div>
                <div className='details d-flex'>
                    <div className='detail'>
                        <div className='detail-label normal-text foreground-light'>
                            Clicks
                        </div>
                        <div className='detail-text foreground-accent'>
                            {link.clicks}
                        </div>
                    </div>
                    <div className='detail'>
                        <div className='detail-label normal-text foreground-light'>
                            Created at
                        </div>
                        <div className='detail-text foreground-primary'>
                            {date
                                .toString()
                                .substr(4, 17)
                                .trim()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Link;
