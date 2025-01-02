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
                        className={`form-input w-100 ${errorType === 0 ? 'error' : ''
                            }`}
                        placeholder='Email'
                        required
                    />
                </div>
                <div class="password">
                    <div className='form-field w-100'>
                        <label htmlFor='login-password'>
                            <i className='fas fa-key foreground-accent'></i>
                        </label>
                        <input
                            onChange={() => setErrorType(2)}
                            ref={passwordRef}
                            type='password'
                            name='password'
                            className={`form-input password w-100 ${errorType === 1 ? 'error' : ''
                                }`}
                            placeholder='Password'
                            required
                            minLength={6}
                            maxLength={20}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
                        />
                    </div>
                    <p className='password-requirements detail-label foreground-accent'>
                        (Password must be 6-20 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character 1)
                    </p>
                </div>
                <button
                    className='submit-border border-radius-5 uppercase-text w-100 mt-4'
                    type='submit'
                >
                    <i class="fas fa-viruses"></i>{" "}
                    Sign In
                </button>
            </form>
            <button
                className='submit-button flip-btn border-radius-10 w-85'
                onClick={() => setSignUpForm(true)}
            >
                Sign Up
            </button>
        </div>
    );
};

export default Login;
