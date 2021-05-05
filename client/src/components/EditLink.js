import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import { useStoreActions } from 'easy-peasy';

import GoBack from './GoBack';

import '../styles/EditLink.css';

const EditLink = ({ toEdit, show, setShow, setToEdit }) => {
    const editAction = useStoreActions(
        (actions) => actions.linkModel.editLink
    );
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    const pageRef = useRef();
    const shortRef = useRef();
    const ogRef = useRef();

    const [error, setError] = useState(false);

    const editLink = async (e) => {
        e.preventDefault();

        editAction({
            id: toEdit._id.$oid,
            updates: {
                short: shortRef.current.value,
                original: ogRef.current.value,
            },
            original: toEdit,
            toggleLoader,
            setError,
            back: () => {
                setToEdit({});
                setShow(false);
            },
        });
    };

    return createPortal(
        <div
            ref={pageRef}
            className={`edit-link ${show ? 'shown' : ''}`}
        >
            <GoBack
                goBack={() => {
                    setToEdit({});
                    setShow(false);
                }}
            />
            <form
                onSubmit={editLink}
                className='glass-effect edit-form background-main-translucent border-radius-10'
            >
                <div className='edit-group w-75'>
                    <label
                        htmlFor='edit-short'
                        className='edit-label normal-text foreground-accent w-100'
                    >
                        Shortened URL
                    </label>
                    <input
                        ref={shortRef}
                        id='edit-short'
                        type='text'
                        className={`edit-input w-100 input-box background-dark-translucent foreground-light ${
                            error ? 'error' : ''
                        }`}
                        placeholder='Enter Shortened URL'
                        minLength='4'
                        maxLength='12'
                        defaultValue={toEdit.short}
                        required
                    />
                </div>
                <div className='edit-group w-75'>
                    <label
                        htmlFor='edit-original'
                        className='edit-label normal-text foreground-accent w-100'
                    >
                        Original URL
                    </label>
                    <input
                        ref={ogRef}
                        id='edit-original'
                        type='text'
                        className='edit-input w-100 input-box background-dark-translucent foreground-light'
                        placeholder='Enter Original URL'
                        minLength='4'
                        defaultValue={toEdit.original}
                        required
                    />
                </div>
                <button className='submit-border w-75 border-radius-10'>
                    Update
                </button>
            </form>
        </div>,
        document.getElementById('edit-link')
    );
};

export default EditLink;
