import { useState, useRef } from 'react';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

import '../styles/AddLink.css';

const AddLink = () => {
    const [short, setShort] = useState('');
    const urlRef = useRef();

    const addLink = async (e) => {
        e.preventDefault();

        const token = cookies.load('Token');
        const url = urlRef.current.value;

        if (!url) {
            toast.error('URL not provided');
            return;
        }

        fetch('/api/urls', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token,
            }),
            body: JSON.stringify({
                url: url,
            }),
        }).then(async (res) => {
            const resp = await res.json();

            if (res.status !== 201) {
                console.log(resp);
                toast.error(resp.message);
            } else {
                const responseShort = `${window.location}${resp.short}`;
                setShort(responseShort);
                urlRef.current.value = responseShort;
                toast.dark(
                    'Link shortened! Press COPY to copy it to your clipboard'
                );
            }
        });
        console.log('DONE');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(short);
        toast.dark(
            'Shortened URL copied to your clipboard'
        );
    };

    return (
        <form
            onSubmit={(e) =>
                !short ? addLink(e) : e.preventDefault()
            }
            className='add-link d-flex-column'
        >
            <input
                type='url'
                className='input-box'
                placeholder='Enter full link to shorten'
                onChange={() => setShort('')}
                ref={urlRef}
            />
            {short ? (
                <button
                    onClick={copyToClipboard}
                    className='subheading-text submit-button uppercase-text'
                >
                    COPY
                </button>
            ) : (
                <button
                    type='submit'
                    className='subheading-text submit-button uppercase-text'
                >
                    Shorten
                </button>
            )}
        </form>
    );
};

export default AddLink;
