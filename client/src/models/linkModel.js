import { thunk, action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export default {
    // STORE
    stored_links: [],
    editingLink: {
        open: false,
        id: {},
    },

    // THUNKS
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

    editLink: thunk(
        async (
            actions,
            {
                id,
                updates,
                original,
                toggleLoader,
                setError,
                back,
                shortRef,
                ogRef,
            }
        ) => {
            if (
                updates.short === original.short &&
                updates.original === original.original
            )
                return;
            const token = cookies.load('Token');

            toggleLoader(true);

            fetch(`/api/urls/${id}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: token,
                }),
                body: JSON.stringify(updates),
            })
                .then(async (res) => {
                    const resp = await res.json();

                    if (res.status !== 202) {
                        console.log(resp);
                        toast.error(resp.message);

                        ogRef.current.value =
                            original.original;
                        shortRef.current.value =
                            original.short;

                        if (
                            resp['error-type'] === 'short'
                        ) {
                            setError(true);
                        }
                    } else {
                        toast.success(
                            'Link Updated Successfully!'
                        );
                        actions.updateLink({
                            original,
                            updates,
                        });
                        back();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    console.log(e);
                })
                .finally(() => {
                    toggleLoader(false);
                });
        }
    ),

    deleteLink: thunk(
        async (actions, { id, toggleLoader }) => {
            const token = cookies.load('Token');

            toggleLoader(true);

            fetch(`/api/urls/${id}`, {
                method: 'DELETE',
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
                        toast.success(
                            'Link Deleted Successfully!'
                        );

                        actions.delete(id);
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    console.log(e);
                })
                .finally(() => toggleLoader(false));
        }
    ),

    // ACTIONS
    updateLinks: action((state, link) => {
        console.log('Hey');
        console.log(link);
        state.stored_links = [...state.stored_links, link];
    }),
    setLinks: action((state, links) => {
        state.stored_links = [...links];
    }),
    toggleEditor: action((state, toggle) => {
        state.editingLink = toggle;
    }),
    updateLink: action((state, { original, updates }) => {
        let updatedLink = { ...original };

        console.log({ updatedLink, updates });

        if (updates.short !== undefined) {
            updatedLink.short = updates.short;
        }
        if (updates.original !== undefined) {
            updatedLink.original = updates.original;
        }

        let index = state.stored_links.findIndex(
            (link) => link._id.$oid === original._id.$oid
        );
        console.log(index);

        let curr = state.stored_links;
        curr[index] = updatedLink;
        state.stored_links = curr;
    }),
    delete: action((state, id) => {
        state.stored_links = state.stored_links.filter(
            (link) => {
                return link._id.$oid !== id;
            }
        );
    }),
};
