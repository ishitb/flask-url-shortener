import { createPortal } from 'react-dom';
import { useStoreState } from 'easy-peasy';
import Lottie from 'react-lottie-player';

import loadingAnim from '../assets/loader.json';

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
            <div className='lottie confetti'>
                <Lottie
                    animationData={loadingAnim}
                    loop
                    play={loader_shown}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice',
                    }}
                    speed={2}
                    style={{
                        height: 400,
                        width: 400,
                    }}
                />
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export default Loader;
