import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { CommonStyle } from 'common/Styles';
import moment from 'moment';
import SolidButton from 'component/include/SolidButton';
import { Link, useHistory } from 'react-router-dom';
import PathRoute from 'common/PathRoute';
import Utils from 'common/Utils';

LDWeeklyTraining.propTypes = {
    site: PropTypes.object,
    config: PropTypes.object,
    options: PropTypes.array,
    isMobile: PropTypes.bool,
};

function LDWeeklyTraining(props) {
    const MAX_LENGTH = props.isMobile ? 2 : 10;
    const dispatch = useDispatch();
    const history = useHistory();

    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});

    useEffect(() => {
        props.site &&
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: props.site.pa_companyId,
                location_id: props.site.pa_locationId,
                course_type: 'course',
            });
    }, [props.site]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                if (siteReducer.courseType === 'course')
                    setLstCourse(siteReducer.data);
            }
        }
    }, [siteReducer]);

    // console.log(props.site, 'site');
    return (
        <div>
            <div className="group-info" style={{ boxShadow: 'none' }}>
                <label className="group-name">Address</label>
                {props.options.length > 1 ? (
                    <div>
                        <Select
                            defaultValue={props.options[0]}
                            options={props.options}
                            isSearchable={false}
                            isMulti={false}
                            styles={CommonStyle.select2}
                            onChange={() => {}}
                        />
                        <p className="appendix">
                            *{props.site && props.site.ms_name} has{' '}
                            {props.options.length} different locations. Choose
                            your preference here
                        </p>
                    </div>
                ) : (
                    <p style={{ margin: '8px 16px' }}>
                        {props.options[0].label}
                    </p>
                )}
            </div>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p>
            <h4>How much do sessions cost?</h4>

            <p
                style={{
                    color: '#FF7100',
                    backgroundColor: '#F7F8F7',
                    padding: '2rem',
                }}>
                £{courseSelected.course_price || 0} per{' '}
                {courseSelected.course_length || 0} sessions
            </p>

            <h5>Football training times:</h5>
            {lstCourse.map((item, index) => (
                <div
                    key={index}
                    className="classRow"
                    onClick={() => {
                        setCourseSelected(item);
                    }}
                    style={{
                        backgroundColor: `${
                            index % 2 === 0 ? '#F7F8F7' : 'white'
                        }`,
                    }}>
                    <p>{item.day_of_week.substring(0, MAX_LENGTH)}</p>
                    <p>
                        {moment(item.course_day_time_start, 'hh:mm:ss').format(
                            'hh:mma',
                        )}
                        -
                        {moment(item.course_day_time_end, 'hh:mm:ss').format(
                            'hh:mma',
                        )}
                    </p>
                    <p>
                        {item.min_age}-{item.max_age}{' '}
                        {props.isMobile ? 'y.o.' : 'year olds'}
                    </p>
                    {!props.isMobile && (
                        <p
                            style={{ color: '#FF7100' }}
                            onClick={() => {
                                // setCourseSelected(item);
                                global.bookTraining = {
                                    siteId: props.site.ms_id || 0,
                                    siteName: props.site.ms_name || '',
                                    address: '',
                                    preDefined: { item },
                                };

                                // console.log(global.bookTraining, 'global2');
                                history.push(PathRoute.BookTrialTraining);
                            }}>
                            Book
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

LDHolidayCamp.propTypes = {
    site: PropTypes.object,
    isMobile: PropTypes.bool,
    config: PropTypes.object,
};
function LDHolidayCamp(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});

    useEffect(() => {
        props.site &&
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: props.site.pa_companyId,
                course_type: 'event',
            });
    }, [props.site]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                if (siteReducer.courseType === 'event')
                    setLstCourse(siteReducer.data);
            }
        }
    }, [siteReducer]);

    return (
        <>
            <h4>{props.config ? props.config.des : ''}</h4>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p>
            <h5>
                Upcoming camps by {props.site ? props.site.ms_name : ''}{' '}
                Academy:
            </h5>
            {lstCourse.map((item, index) => (
                <Fragment key={index}>
                    <div
                        onClick={() => setCourseSelected(item)}
                        style={{
                            borderBottom: '1px solid #F2F2F2',
                            fontWeight: 'normal',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <p>
                            {item.date} | {item.time}
                        </p>
                        <p style={{ float: 'right' }}>{item.course_title}</p>
                    </div>
                    <div style={{ clear: 'both', marginBottom: 16 }} />
                </Fragment>
            ))}
            {!props.isMobile && (
                <Fragment>
                    <h5>How much do camps cost?</h5>
                    {Utils.isEmpty(courseSelected) ? (
                        <div>
                            See more at{' '}
                            <a
                                style={{ color: '#ef9042' }}
                                href={PathRoute.HolidayCamp}>
                                Holiday Camps
                            </a>
                        </div>
                    ) : (
                        <Fragment>
                            <div
                                style={{
                                    borderBottom: '1px solid #F2F2F2',
                                    marginBottom: 16,
                                }}>
                                £{courseSelected.half_day_price} per half day
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #F2F2F2',
                                    marginBottom: 16,
                                }}>
                                £{courseSelected.single_day_price} per full day
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #F2F2F2',
                                    marginBottom: 16,
                                }}>
                                £{courseSelected.course_price} full week
                            </div>
                            <SolidButton
                                title="Book Now"
                                onClick={() => {
                                    global.bookCamp = {
                                        siteId: props.site.ms_id || 0,
                                        siteName: props.site.ms_name || '',
                                    };
                                    history.push(PathRoute.BookTrialCamp);
                                }}
                            />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </>
    );
}

LDOneTraining.propTypes = {
    config: PropTypes.object,
};

function LDOneTraining(props) {
    return (
        <>
            <h4>{props.config ? props.config.des : ''}</h4>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p>
            <Link
                to={PathRoute.OneTraining}
                style={{ color: '#EE7925', textDecoration: 'underline' }}>
                Find out more
            </Link>
        </>
    );
}

LDBirthdayParty.propTypes = {
    config: PropTypes.object,
};

function LDBirthdayParty(props) {
    return (
        <>
            <h4>{props.config ? props.config.des : ''}</h4>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p>
            <Link
                to={PathRoute.BirthdayParty}
                style={{ color: '#EE7925', textDecoration: 'underline' }}>
                Find out more
            </Link>
        </>
    );
}

LDSchoolTraining.propTypes = {
    config: PropTypes.object,
};

function LDSchoolTraining(props) {
    return (
        <>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p>
            <Link
                to="#"
                style={{ color: '#EE7925', textDecoration: 'underline' }}>
                Find out more
            </Link>
        </>
    );
}

TrainingService.propTypes = {
    site: PropTypes.object,
    service: PropTypes.object,
};

const imageService = require('images/service.png');
const imageServiceActive = require('images/service-active.png');
const listMenu = [
    'Weekly Training',
    '1-Week Holiday camps',
    '1-on-1 Training',
    'Birthday Parties',
    'School Training',
];

function TrainingService(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(0);
    const [innerWidth, setInnerWith] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);
    function handleWindowSizeChange() {
        setInnerWith(window.innerWidth);
    }

    let options = [];
    if (props.site) {
        options.push({
            label: props.site.ms_address,
            alias: props.site.ms_alias,
            value: props.site.ms_id,
        });
        props.site.associalted &&
            props.site.associalted.map((item) =>
                options.push({
                    label: item.ms_address,
                    alias: item.ms_alias,
                    value: item.ms_id,
                }),
            );
    }

    const isMobile = innerWidth <= 1000;
    if (isMobile) {
        return (
            <div className="service-mobile">
                <h2>
                    {props.site ? props.site.ms_name : ''} junior football
                    training services:
                </h2>
                <div>
                    <div className="service-group">
                        <img alt="" src={imageService} />
                        <span>{listMenu[0]}</span>
                        <div style={{ height: '2rem' }} />
                        <LDWeeklyTraining
                            site={props.site}
                            options={options}
                            isMobile={true}
                        />
                    </div>
                    <div className="service-group">
                        <img alt="" src={imageService} />
                        <span>{listMenu[1]}</span>
                        <div style={{ height: '2rem' }} />
                        <LDHolidayCamp site={props.site} isMobile={true} />
                    </div>
                    <div className="service-group">
                        <img alt="" src={imageService} />
                        <span>{listMenu[2]}</span>
                        <div style={{ height: '2rem' }} />
                        <LDOneTraining />
                    </div>
                    <div className="service-group">
                        <img alt="" src={imageService} />
                        <span>{listMenu[3]}</span>
                        <div style={{ height: '2rem' }} />
                        <LDBirthdayParty />
                    </div>
                    <div className="service-group">
                        <img alt="" src={imageService} />
                        <span>{listMenu[4]}</span>
                        <div style={{ height: '2rem' }} />
                        <LDSchoolTraining />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="box-reasons training-service">
                <div className="container">
                    <h2 className="heading">
                        {props.site ? props.site.ms_name : ''} junior football
                        training services:
                    </h2>
                    <div className="content-small">
                        <ul className="nav-tabs">
                            {listMenu.map((item, index) => (
                                <li
                                    key={index}
                                    className={
                                        activeIndex === index ||
                                        hoverIndex === index
                                            ? 'active'
                                            : ''
                                    }
                                    style={{
                                        borderBottomColor:
                                            activeIndex - 1 === index ||
                                            hoverIndex - 1 === index
                                                ? '#ef9042'
                                                : '',
                                    }}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onClick={() => setActiveIndex(index)}>
                                    <a data-toggle="tab">
                                        <img
                                            alt=""
                                            src={
                                                activeIndex === index
                                                    ? imageServiceActive
                                                    : imageService
                                            }
                                        />
                                        {item}
                                    </a>
                                    {activeIndex === index && (
                                        <div className="right-arrow">
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                style={{
                                                    color: '#EE7925',
                                                    fontSize: '0.5rem',
                                                }}
                                            />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div
                            className="tab-content"
                            style={{
                                borderTop: '1px solid #FF7100',
                                paddingTop: '2rem',
                            }}>
                            <div
                                className={`tab-pane ${
                                    activeIndex === 0 ? 'active' : ''
                                }`}
                                id={1}>
                                <LDWeeklyTraining
                                    site={props.site}
                                    options={options}
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[0]
                                            : {}
                                    }
                                />
                            </div>
                            <div
                                className={`tab-pane ${
                                    activeIndex === 1 ? 'active' : ''
                                }`}
                                id={2}>
                                <LDHolidayCamp
                                    site={props.site}
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[1]
                                            : {}
                                    }
                                />
                            </div>
                            <div
                                className={`tab-pane ${
                                    activeIndex === 2 ? 'active' : ''
                                }`}
                                id={3}>
                                <LDOneTraining
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[2]
                                            : {}
                                    }
                                />
                            </div>
                            <div
                                className={`tab-pane ${
                                    activeIndex === 3 ? 'active' : ''
                                }`}
                                id={4}>
                                <LDBirthdayParty
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[3]
                                            : {}
                                    }
                                />
                            </div>
                            <div
                                className={`tab-pane ${
                                    activeIndex === 4 ? 'active' : ''
                                }`}
                                id={5}>
                                <LDSchoolTraining
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[4]
                                            : {}
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TrainingService;