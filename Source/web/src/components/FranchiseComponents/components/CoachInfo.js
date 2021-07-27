import React from 'react';
import Utils from 'src/common/Utils';
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
                            <p>
                                {(props.coach && props.coach.description) ||
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mi massa. Vestibulum egestas accumsan turpis, vitae luctus justo placerat et. Maecenas tincidunt quis massa eget iaculis. Cras lacus mi, lacinia nec nisl vel, lacinia venenatis mi. Nullam nec tempus lacus. Vestibulum elementum odio odio, ut commodo sem porta porttitor. Vestibulum dapibus est sem, condimentum ultricies enim feugiat quis.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachInfo;
