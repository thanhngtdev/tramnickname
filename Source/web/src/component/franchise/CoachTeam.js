import React from 'react';
import PropTypes from 'prop-types';
import Utils from 'common/Utils';

CoachTeam.propTypes = {
    staff: PropTypes.array,
    site: PropTypes.object,
};

function CoachTeam(props) {
    // console.log(props.staff);
    return (
        <div>
            <div className="coach-head">
                <h2>{props.site ? props.site.ms_name : ''} academy team</h2>
            </div>
            {props.staff && (
                <div className="coach-list">
                    <div className="sub-list">
                        <div className="rsub-list">
                            <div className="fix-width">
                                {props.staff.map((item, index) => (
                                    <div key={index} className="coach-item">
                                        <div className="coach-image">
                                            <img
                                                src={Utils.getThumb(
                                                    item.image,
                                                    'c2',
                                                )}
                                                alt=""
                                            />
                                        </div>
                                        <div className="coach-info">
                                            <p className="position">
                                                {item.name}
                                            </p>
                                            <p className="name">
                                                {item.position}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoachTeam;
