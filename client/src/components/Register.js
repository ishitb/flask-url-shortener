const Register = ({ setSignUpForm }) => {
    const signUp = async (e) => {
        e.preventDefault();
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
                        name='name'
                        type='text'
                        className='form-input w-100'
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
                        name='email'
                        type='text'
                        className='form-input w-100'
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        type='password'
                        name='password'
                        className='form-input w-100'
                        placeholder='Password'
                        required
                        minLength='5'
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor='confirm password'>
                        <i className='fas fa-key foreground-accent'></i>
                    </label>
                    <input
                        type='password'
                        name='confirmpassword'
                        className='form-input w-100'
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
