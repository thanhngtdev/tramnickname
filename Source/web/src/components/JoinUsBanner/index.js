import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function JoinUsBanner(props) {
    return (
        <div className="about-us">
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <LazyLoadImage
                        alt=""
                        src={'/static-file/images/joinUs.png'}
                    />
                </div>
            </div>
            <div className="about-us-content">
                <div className="container">
                    <h1
                        className="contact-header"
                        // style={{ paddingRight: '100px' }}
                    >
                        {props.data?.cfg_title || ''}
                    </h1>
                </div>
                <div className="container">
                    <div className="get-in-touch">
                        <div className="list-form">
                            <p className="pro-text" style={{ marginTop: '0' }}>
                                {props.data?.cfg_des || ''}
                            </p>

                            <div
                                style={{ marginTop: 50 }}
                                className="box-button">
                                <a
                                    onClick={() => {
                                        props.click();
                                    }}
                                    className="btn-book-free-session white-hover"
                                    // href={PathRoute.Coaching}
                                    style={{
                                        background: '#FF7531',
                                        borderRadius: '6px',
                                        width: '250px',
                                        display: 'inline-block',
                                        border: '0',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        padding: '20px 10px 30px',
                                    }}>
                                    Join Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
