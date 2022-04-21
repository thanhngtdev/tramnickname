import PropTypes from 'prop-types';
import React from 'react';
import Utils from 'src/common/Utils';
import parse from 'html-react-parser';
import getFranchiseName from 'src/hooks/useFranchise';

CoachInfo.propTypes = {
    coach: PropTypes.object,
};
function CoachInfo(props) {
    const siteName = getFranchiseName(props.site);
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
                            {props?.site?.sub_page.map((item, index) => {
                                if (siteName === item.sub_name) {
                                    return (
                                        <div key={item.id}>
                                            {parse(
                                                item?.sub_page_data?.about_us
                                                    ?.text || '',
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachInfo;
