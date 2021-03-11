import React from 'react';
import { Fragment } from 'react';

export default function JoinUsBanner(props) {
    return (
        <div className="about-us">
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <img alt="" src={require('images/joinUs.png')} />
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 50,
                    width: '100%',
                }}>
                <div className="container">
                    <h1
                        className="contact-header"
                        style={{ paddingRight: '100px' }}>
                        {/* {data.about?.cfg_title ||
                            } */}
                        Career opportunities with We Make Footballers
                    </h1>
                </div>
                <div className="container">
                    <div className="get-in-touch">
                        <div className="list-form about">
                            <p className="pro-text" style={{ margin: '0' }}>
                                {/* {data.about?.cfg_des ||
                                    } */}
                                We are looking for talented, enthusiastic people
                                who want to progress their careers
                            </p>

                            <div className="box-button">
                                <a
                                    className="btn-book-free-session white-hover"
                                    // href={PathRoute.BookTrialTraining}
                                    style={{
                                        background: '#FF7531',
                                        borderRadius: '6px',
                                        width: '250px',
                                        display: 'inline-block',
                                        height: '70px',
                                        border: '0',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                        color: 'white',
                                        textTransform: 'uppercase',
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
