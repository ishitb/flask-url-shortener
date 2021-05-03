import { action } from 'easy-peasy';

const loaderModel = {
    // STORE
    loader_shown: false,

    // ACTIONS
    toggleLoader: action((state, toggle) => {
        state.loader_shown = toggle;
    }),
};

export default loaderModel;
