import { createPortal } from 'react-dom';
import { useState, lazy } from 'react';

import '../styles/SignIn.css';

const GoBack = lazy(() => import('./GoBack'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const SignIn = ({ signingIn, setSigningIn }) => {
    const [signUpForm, setSignUpForm] = useState(false);

    return createPortal(
        <div
            className={`sign-in ${
                signingIn ? 'shown' : ''
            }`}
        >
            <GoBack goBack={() => setSigningIn(false)} />
            <div className='container-100'>
                <div className='card-container border-radius-10'>
                    <div
                        className={`card border-radius-10 ${
                            signUpForm ? 'flipped' : ''
                        }`}
                    >
                        <Login
                            setSignUpForm={setSignUpForm}
                        />
                        <Register
                            setSignUpForm={setSignUpForm}
                        />
                    </div>
                </div>
            </div>

            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icons'
            >
                <symbol id='icon-error' viewBox='0 0 24 24'>
                    <g fill='none' fillRule='evenodd'>
                        <circle
                            fill='#FF7979'
                            cx='12'
                            cy='12'
                            r='12'
                        />
                        <rect
                            fill='#FFF'
                            x='11'
                            y='6'
                            width='2'
                            height='9'
                            rx='1'
                        />
                        <rect
                            fill='#FFF'
                            x='11'
                            y='17'
                            width='2'
                            height='2'
                            rx='1'
                        />
                    </g>
                </symbol>
                <symbol
                    id='icon-mail'
                    viewBox='0 0 230.17 230.17'
                >
                    <g>
                        <path d='M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z' />
                        <path
                            d='M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
						L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z'
                        />
                        <path
                            d='M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
						L115.251,138.757z'
                        />
                        <path d='M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z' />
                    </g>
                </symbol>
                <symbol
                    id='icon-lock'
                    viewBox='0 0 1792 1792'
                >
                    <path d='M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z' />
                </symbol>
                <symbol
                    id='icon-user'
                    viewBox='0 0 1792 1792'
                >
                    <path d='M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z' />
                </symbol>
            </svg>
        </div>,
        document.getElementById('sign-in')
    );
};

export default SignIn;
