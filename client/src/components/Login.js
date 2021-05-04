const Login = ({ setSignUpForm }) => {
    const login = async (e) => {
        e.preventDefault();
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
                        name='email'
                        type='email'
                        className='form-input w-100'
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-field w-100'>
                    <label htmlFor='login-password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        type='password'
                        name='password'
                        className='form-input w-100'
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
