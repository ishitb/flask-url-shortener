import { thunk, action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export default {
    // STORE
    user_logged_in: false,
    token: null,
    user_data: {},

    // THUNKS
    login: thunk(
        async (
            actions,
            { email, password, toggleLoader }
        ) => {
            fetch(`/auth/login/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(async (resp) => {
                    const res = await resp.json();

                    if (resp.status === 202) {
                        console.log(res);
                        actions.setToken(res.token);
                        actions.setUserData(res.user);
                        toast.dark(
                            'Logged in Successfully!'
                        );
                    } else {
                        toast.error(res.message);
                        console.log(res);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    // console.log(e);
                    actions.logout();
                })
                .finally(() => {
                    toggleLoader(false);
                });
        }
    ),

    register: thunk(
        async (
            actions,
            { email, password, name, toggleLoader }
        ) => {
            fetch(`/auth/register/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                }),
            })
                .then(async (resp) => {
                    const res = await resp.json();

                    if (resp.status === 201) {
                        // console.log(res);
                        actions.setToken(res.token);
                        actions.setUserData(res.user);
                        toast.dark(
                            'Registered in successfully'
                        );
                    } else {
                        toast.error(res.message);
                        // console.log(res);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    // console.log(e);
                    actions.logout();
                    toggleLoader(false);
                })
                .finally(() => toggleLoader(false));
        }
    ),

    verifyUser: thunk(async (actions) => {
        let savedToken = cookies.load('Token');
        console.log('Hello');

        if (savedToken === undefined) {
            actions.logout();
        } else
            fetch(`/auth/verify`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: savedToken,
                }),
            })
                .then(
                    async (res) => {
                        let resp = await res.json();
                        console.log(resp);

                        if (res.status === 202)
                            actions.setUserData(resp);
                        else {
                            actions.logout();
                        }
                    },
                    (err) => {
                        // console.log(err);
                        actions.logout();
                    }
                )
                .catch((e) => {
                    // console.log(e);
                    actions.logout();
                });
    }),

    // ACTIONS
    setToken: action(async (state, token) => {
        cookies.save('Token', `Token ${token}`, {
            expires: new Date('05-03-2022'),
        });
        state.token = token;
    }),
    setUserData: action(async (state, data) => {
        const token = cookies.load('Token');
        state.token = token;
        state.user_logged_in = true;
        state.user_data = data;
    }),
    logout: action((state) => {
        // console.log('Logging out');
        cookies.remove('Token');
        state.user_logged_in = false;
        state.token = null;
        state.user_data = {};
    }),
};
