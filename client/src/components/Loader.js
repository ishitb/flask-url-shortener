import { createPortal } from 'react-dom';
import { useStoreState } from 'easy-peasy';
import Lottie from 'react-lottie';

import loadingAnim from '../assets/loader.json';

import '../styles/Loader.css';

const Loader = () => {
    const loader_shown = useStoreState(
        (store) => store.loaderModel.loader_shown
    );

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnim,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return createPortal(
        <div
            className={`loading ${
                loader_shown ? 'shown' : ''
            }`}
        >
            <div className='lottie confetti'>
                <Lottie
                    options={defaultOptions}
                    height={400}
                    speed={2}
                    width={400}
                    isStopped={!loader_shown}
                />
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export default Loader;
