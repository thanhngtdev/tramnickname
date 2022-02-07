import PropTypes from 'prop-types';
import React from 'react';
import Utils from 'src/common/Utils';
import getFranchiseName from 'src/hooks/useFranchise';

CoachTeam.propTypes = {
    staff: PropTypes.array,
    site: PropTypes.object,
};

function CoachTeam(props) {
    const siteName = getFranchiseName(props.site);
    return (
        <div>
            <div className="coach-head">
                <h2>{siteName} team</h2>
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
                                                loading="lazy"
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
