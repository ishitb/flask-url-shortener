import { useRef, useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const Login = ({ setSignUpForm, setSigningIn }) => {
    const loginAction = useStoreActions(
        (actions) => actions.accountModel.login
    );
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errorType, setErrorType] = useState(2);

    const login = async (e) => {
        e.preventDefault();

        loginAction({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            setError: setErrorType,
            toggleLoader,
            goBack: () => setSigningIn(false),
        });
    };

    return (
        <div className='front'>
            <form
                onSubmit={login}
                className='form signIn d-flex-column'
            >
                <div className='form-field w-100'>
                    <label htmlFor='login-email'>
                        <i className='far fa-envelope foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => setErrorType(2)}
                        ref={emailRef}
                        name='email'
                        type='email'
                        className={`form-input w-100 ${
                            errorType === 0 ? 'error' : ''
                        }`}
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-field w-100'>
                    <label htmlFor='login-password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => setErrorType(2)}
                        ref={passwordRef}
                        type='password'
                        name='password'
                        className={`form-input w-100 ${
                            errorType === 1 ? 'error' : ''
                        }`}
                        placeholder='Password'
                        required
                    />
                </div>
                <button
                    className='submit-button background-accent uppercase-text border-radius-5 w-100'
                    type='submit'
                >
                    Sign In
                </button>
            </form>
            <button
                className='submit-border border-radius-10 w-75 flip-btn'
                onClick={() => setSignUpForm(true)}
            >
                SIGN UP
            </button>
        </div>
    );
};

export default Login;
