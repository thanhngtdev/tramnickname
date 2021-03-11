import React from 'react';
import Utils from 'common/Utils';
import PropTypes from 'prop-types';

CoachInfo.propTypes = {
    coach: PropTypes.object,
};
function CoachInfo(props) {
    // console.log(props.coach);
    return (
        <div className="coach">
            <div className="container">
                <div
                    className="box-list-item-card"
                    style={{
                        top: 0,
                        padding: '8rem 0 12rem',
                        pointerEvents: 'none',
                    }}>
                    <div className="row">
                        <div className="col-4">
                            <img
                                src={
                                    props.coach &&
                                    props.coach.avatar &&
                                    props.coach.avatar !== ''
                                        ? Utils.getThumb(props.coach.avatar)
                                        : require('images/coach.png')
                                }
                                alt=""
                            />
                            <div style={{ paddingLeft: '2rem', width: '100%' }}>
                                <p
                                    style={{
                                        color: '#1A1919',
                                        fontSize: '1rem',
                                        marginBottom: 0,
                                    }}>
                                    {props.coach.detail}
                                </p>
                                <p
                                    style={{
                                        color: '#1A1919',
                                        fontSize: '1.5rem',
                                        fontStyle: '500',
                                        margin: 0,
                                    }}>
                                    {props.coach && props.coach.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-8">
                            <p>{props.coach && props.coach.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachInfo;
