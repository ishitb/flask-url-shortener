import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { toast } from 'react-toastify';

import '../styles/Navbar.css';

const Navbar = ({ setSigningIn }) => {
    const { user_logged_in } = useStoreState(
        (store) => store.accountModel
    );
    const { logout, verifyUser } = useStoreActions(
        (actions) => actions.accountModel
    );

    useEffect(() => {
        verifyUser();

        // eslint-disable-next-line
    }, []);

    return (
        <nav className='glass-effect'>
            <h3 className='brand weird-text foreground-accent'>
                furls
            </h3>
            {user_logged_in ? (
                <button
                    className='submit-border nav-links uppercase-text border-radius-10'
                    onClick={() => {
                        logout();
                        toast.success(
                            'Successfully Logged Out!'
                        );
                    }}
                >
                    LOGOUT
                </button>
            ) : (
                <button
                    className='submit-border border-radius-10 nav-links uppercase-text'
                    onClick={() => {
                        setSigningIn(true);
                    }}
                >
                    Sign In
                </button>
            )}
        </nav>
    );
};

export default Navbar;
