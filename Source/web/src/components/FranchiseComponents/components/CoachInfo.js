import PropTypes from 'prop-types';
import React from 'react';
import Utils from 'src/common/Utils';
import parse from 'html-react-parser';

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
                        paddingTop: '3rem',
                    }}>
                    <div className="row">
                        <div className="col-4">
                            <img
                                loading="lazy"
                                src={
                                    props.coach &&
                                    props.coach.avatar &&
                                    props.coach.avatar !== ''
                                        ? Utils.getThumb(props.coach.avatar)
                                        : 'static-file/images/coach.png'
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
                                    {props.coach.detail ||
                                        'Owner & head coach since YYYY'}
                                </p>
                                <p
                                    style={{
                                        color: '#1A1919',
                                        fontSize: '1.5rem',
                                        fontStyle: '500',
                                        margin: 0,
                                    }}>
                                    {(props.coach && props.coach.name) ||
                                        'Coach Name'}
                                </p>
                            </div>
                        </div>
                        <div className="col-8">
                            {parse(props?.site?.aboutUs?.text || '')}
                            {/* <p>{}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachInfo;
