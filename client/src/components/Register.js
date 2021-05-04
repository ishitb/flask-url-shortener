import { useState, useRef } from 'react';
import { useStoreActions } from 'easy-peasy';

const Register = ({ setSignUpForm, setSigningIn }) => {
    const { register } = useStoreActions(
        (actions) => actions.accountModel
    );
    const { toggleLoader } = useStoreActions(
        (actions) => actions.loaderModel
    );

    const emailRef = useRef();
    const passwordRef = useRef();
    const password1Ref = useRef();
    const nameRef = useRef();

    const [errorType, setErrorType] = useState(3);

    const signUp = async (e) => {
        e.preventDefault();

        const emailVal = emailRef.current.value;
        const nameVal = nameRef.current.value;
        const passwordVal = passwordRef.current.value;
        const password1Val = password1Ref.current.value;

        register({
            email: emailVal,
            password: passwordVal,
            password2: password1Val,
            name: nameVal,
            toggleLoader: toggleLoader,
            goBack: () => setSigningIn(false),
            setError: setErrorType,
        });
    };

    return (
        <div className='back'>
            <form
                onSubmit={signUp}
                className='form signUp w-75'
            >
                <div className='form-field'>
                    <label htmlFor='name'>
                        <i className='far fa-user foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => {
                            setErrorType(3);
                        }}
                        ref={nameRef}
                        name='name'
                        type='text'
                        className={`form-input w-100 ${
                            errorType === 2 ? 'error' : ''
                        }`}
                        placeholder='Name'
                        required
                        maxLength='32'
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor='login-email'>
                        <i className='far fa-envelope foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => {
                            setErrorType(3);
                        }}
                        ref={emailRef}
                        name='email'
                        type='text'
                        className={`form-input w-100 ${
                            errorType === 0 ? 'error' : ''
                        }`}
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => {
                            setErrorType(3);
                        }}
                        ref={passwordRef}
                        type='password'
                        name='password'
                        className={`form-input w-100 ${
                            errorType === 1 ? 'error' : ''
                        }`}
                        placeholder='Password'
                        required
                        minLength='6'
                        maxLength='20'
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor='confirm password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        onChange={() => {
                            setErrorType(3);
                        }}
                        ref={password1Ref}
                        type='password'
                        name='confirmpassword'
                        className={`form-input w-100 ${
                            errorType === 1 ? 'error' : ''
                        }`}
                        placeholder='Confirm Password'
                        required
                    />
                </div>
                <button
                    className='submit-button border-radius-10 uppercase-text background-accent w-100'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
            <button
                className='submit-border border-radius-10 flip-btn w-75'
                onClick={() => setSignUpForm(false)}
            >
                SIGN IN
            </button>
        </div>
    );
};

export default Register;
