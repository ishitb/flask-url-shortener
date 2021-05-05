import { thunk, action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export default {
    // STORE
    user_logged_in: false,
    token: null,
    user_data: {},
    stored_links: [],

    // THUNKS
    login: thunk(
        async (
            actions,
            {
                email,
                password,
                toggleLoader,
                goBack,
                setError,
            }
        ) => {
            toggleLoader(true);

            fetch(`/auth/login`, {
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
                        actions.setToken(res.token);
                        actions.setUserData(res.user);
                        toast.success(
                            'Logged in Successfully!'
                        );
                        goBack();
                    } else {
                        toast.error(res.message);
                        if (res['error-type'] !== 'server')
                            setError(res['error-type']);
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
            {
                email,
                password,
                password2,
                name,
                toggleLoader,
                setError,
                goBack,
            }
        ) => {
            toggleLoader(true);

            // ! ERROR TYPES :
            // ! 0 ==> Email Error
            // ! 1 ==> Password Error
            // ! 2 ==> Name Error

            setError(3);

            if (password !== password2) {
                setError(1);
                toast.error("Passwords don't match!");
                return;
            }

            fetch(`/auth/register`, {
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
                        actions.setToken(res.token);
                        actions.setUserData(res.user);
                        toast.success(
                            'Registered in successfully'
                        );
                        goBack();
                    } else {
                        toast.error(res.message);

                        if (res['error-type'] !== 'server')
                            setError(res['error-type']);

                        console.log(res);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    console.log(e);
                    actions.logout();
                    toggleLoader(false);
                })
                .finally(() => toggleLoader(false));
        }
    ),

    verifyUser: thunk(async (actions) => {
        let savedToken = cookies.load('Token');

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

    retrieveLinks: thunk(async (actions, toggleLoader) => {
        const token = cookies.load('Token');

        toggleLoader(true);

        fetch(`/api/urls`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        })
            .then(async (res) => {
                const resp = await res.json();

                if (res.status !== 200) {
                    console.log(resp);
                    toast.error(resp.message);
                } else {
                    actions.setLinks(resp);
                }
            })
            .catch((e) => {
                toast.error('Internal Server Error');
                console.log(e);
            })
            .finally(() => toggleLoader(false));
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
    updateLinks: action((state, link) => {
        state.stored_links = [...state.stored_links, link];
    }),
    setLinks: action((state, links) => {
        state.stored_links = [...links];
    }),
};
