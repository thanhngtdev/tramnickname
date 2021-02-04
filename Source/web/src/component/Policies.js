import React, { Fragment } from 'react';
import '../css/policies.css';
import icon from '../images/icon-bell.png';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function Policies() {
    const numbers = [1, 2, 3, 4];

    return (
        <Fragment>
            <div className="about-us">
                <div className="row">
                    <div className="col-6">
                        <p></p>
                    </div>
                    <div className="col-6" style={{ paddingLeft: 0 }}>
                        <img
                            alt=""
                            src={require('../images/image_about.png')}
                        />
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: 50,
                        width: '100%',
                    }}>
                    <div className="container">
                        <h1 className="contact-header">
                            We Make Footballers Policies
                        </h1>
                    </div>
                    <div className="container">
                        <div className="get-in-touch">
                            <div className="list-form about">
                                <p className="pro-text">
                                    The UK’s most trusted junior football
                                    coaching
                                </p>
                                <p className="pro-sub-text">
                                    We believe that England needs a stronger
                                    grassroots program if the next generation
                                    are to love the sport, and bring England our
                                    second world cup. While grassroots is the
                                    heartbeat of kids loving football, parents
                                    are rarely trained or equiped to introduce
                                    the sport in those crucial early stages,
                                    especially with such large groups and little
                                    support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div className="policies-content">
                <div className="container">
                    <h2 className="heading-w">Our Policies</h2>
                    <p className="text-1">
                        Select a card to view our company policies
                    </p>
                </div>

                <div className="policy">
                    <div className="container">
                        <div className="list-item-card-2">
                            <div className="row">
                                {numbers.map((value, index) => (
                                    <div
                                        key={index}
                                        className="col-6"
                                        style={{ marginBottom: '60px' }}>
                                        <div className="item">
                                            <img
                                                alt=""
                                                src={icon}
                                                className="img"
                                            />
                                            <h3 className="title">title</h3>
                                            <p className="description">
                                                A fresh class every week. Our
                                                39-week school term schedule
                                                focuses on a new football
                                                fundamental each week along with
                                                1-on-1 practice. Just find a day
                                                and time that suits you.
                                            </p>
                                            <a href="#" className="more">
                                                MORE INFORMATION
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Policies;
