import '../styles/Link.css';

const Link = ({ link }) => {
    let date = new Date(link.created.$date);
    return (
        <div className='link d-flex-column background-dark-translucent border-radius-10'>
            <div className='detail'>
                <h5 className='normal-text foreground-light'>
                    Shortened URL
                </h5>
                <a
                    className='subheading-text foreground-accent'
                    href={
                        window.location.toString() +
                        link.short
                    }
                >
                    /{link.short}
                </a>
            </div>
            {/* <br />
            <br /> */}
            <div className='detail'>
                <h5 className='normal-text foreground-light'>
                    Original URL
                </h5>
                <a
                    className='subheading-text foreground-primary'
                    href={link.original}
                    style={{
                        fontSize: '1.5rem',
                    }}
                >
                    {link.original}
                </a>
            </div>
            <div className='details d-flex'>
                <div className='detail'>
                    <div className='detail-text foreground-primary'>
                        {link.clicks}
                    </div>
                    <div className='detail-label normal-text foreground-light'>
                        Clicks
                    </div>
                </div>
                <div className='detail'>
                    <div className='detail-text foreground-primary'>
                        {date
                            .toGMTString()
                            .substr(
                                5,
                                date.toGMTString().length -
                                    12
                            )}
                    </div>
                    <div className='detail-label normal-text foreground-light'>
                        Created at
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Link;
