import { useState } from 'react';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie-player';
import { useStoreActions, useStoreState } from 'easy-peasy';

import confetti from '../assets/confetti.json';

import '../styles/AddLink.css';

const AddLink = ({ inputRef }) => {
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );
    const { updateLinks } = useStoreActions(
        (actions) => actions.linkModel
    );

    const { user_logged_in } = useStoreState(
        (state) => state.accountModel
    );

    const [short, setShort] = useState('');
    const [confettiAnimStopped, setConfettiAnimStopped] =
        useState(true);
    const [copied, setCopied] = useState(false);

    const addLink = async (e) => {
        e.preventDefault();

        const token = cookies.load('Token');
        const url = inputRef.current.value;

        if (!url) {
            toast.error('URL not provided');
            return;
        }

        toggleLoader(true);

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
        })
            .then(async (res) => {
                const resp = await res.json();

                if (res.status !== 201) {
                    console.log(resp);
                    toast.error(resp.message);
                } else {
                    const responseShort = `${window.location}${resp.short}`;
                    setShort(responseShort);
                    inputRef.current.value = responseShort;
                    toast.success(
                        'Link shortened! Press COPY to copy it to your clipboard'
                    );
                    setConfettiAnimStopped(false);

                    if (user_logged_in) {
                        updateLinks(resp);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(
                    'Internal Server Error! Please try again.'
                );
            })
            .finally(() => toggleLoader(false));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(short);
        toast.success(
            'Shortened URL copied to your clipboard'
        );
        setCopied(true);
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
                onChange={() => {
                    setShort('');
                    setCopied(false);
                }}
                ref={inputRef}
            />
            {short ? (
                <button
                    onClick={copyToClipboard}
                    className={`subheading-text submit-button border-radius-10 uppercase-text copy-button ${
                        copied ? 'copied' : ''
                    }`}
                >
                    <p className='copy-text'>COPY</p>
                </button>
            ) : (
                <button
                    type='submit'
                    className='subheading-text submit-button border-radius-10 uppercase-text copy-button'
                >
                    Shorten
                </button>
            )}
            <div className='lottie confetti'>
                <Lottie
                    animationData={confetti}
                    loop={false}
                    onComplete={() => setConfettiAnimStopped(true)}
                    play={!confettiAnimStopped}
                    rendererSettings={{
                        preserveAspectRatio:
                            'xMidYMid slice',
                    }}
                    style={{
                        height: 400,
                        width: 400,
                    }}
                />
            </div>
        </form>
    );
};

export default AddLink;
