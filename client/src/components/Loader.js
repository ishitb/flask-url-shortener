import { createPortal } from 'react-dom';
import { useStoreState } from 'easy-peasy';

import '../styles/Loader.css';

const Loader = () => {
    const loader_shown = useStoreState(
        (store) => store.loaderModel.loader_shown
    );

    return createPortal(
        <div
            className={`loading ${
                loader_shown ? 'shown' : ''
            }`}
        >
            <div className='loader'>
                <div className='inner'></div>
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export default Loader;
