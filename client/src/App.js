import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    useEffect(() => {
        fetch('/auth/verify', {
            headers: {
                Authorization:
                    'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NTAzMjQyZmQzOTQ0ZTllYjNhYWRkZTJkNmJlMjk5MyIsImVtYWlsIjoiaXNoYmVzd2FsQGdtYWlsLmNvbSIsIm5hbWUiOiJJc2hpdCBCZXN3YWwifQ.FFF0VU3a87ezZfpbsy2rVnwfzERpaGp8dgehHvtEg7Q',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
        // eslint-disable-next-line
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <img
                    src={logo}
                    className='App-logo'
                    alt='logo'
                />
                <p>
                    Edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
