import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
import SolidButton from 'src/components/include/SolidButton';
import getFranchiseName from 'src/hooks/useFranchise';
import { siteActionType } from 'src/redux/actions/actionTypes';
import parse from 'html-react-parser';

LDWeeklyTraining.propTypes = {
    site: PropTypes.object,
    config: PropTypes.object,
    options: PropTypes.array,
    isMobile: PropTypes.bool,
};

function LDWeeklyTraining(props) {
    const MAX_LENGTH = props.isMobile ? 2 : 10;
    const dispatch = useDispatch();
    const history = useRouter();
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
                // console.log(siteReducer.dataCourse,"data");
                if (siteReducer.courseType === 'course') {
                    // debugger;

                    setLstCourse(siteReducer.dataCourse);
                }
            }
        }
    }, [siteReducer]);

    // console.log(props, 'site props');
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
                            onChange={(option) => {
                                props.onClickLocation(option, true);
                            }}
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
            {parse(props?.config?.content || '')}

            <h4>Football training times:</h4>
            {lstCourse &&
                lstCourse.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: `${
                                index % 2 === 0 ? '#F7F8F7' : 'white'
                            }`,
                        }}>
                        <div
                            className="classRow"
                            onClick={() => {
                                setCourseSelected(item);
                            }}>
                            <p>{item?.day_of_week?.substring(0, MAX_LENGTH)}</p>
                            <p>
                                {dayjs(
                                    '2021-03-03T' + item.course_day_time_start,
                                ).format('HH:mma')}
                                -
                                {dayjs(
                                    '2021-03-03T' + item.course_day_time_end,
                                ).format('HH:mma')}
                            </p>
                            <p>
                                {item.min_age}-{item.max_age}{' '}
                                {props.isMobile ? 'y.o.' : 'year olds'}
                            </p>
                        </div>
                        <div className="classRowSecond">
                            <p style={{ marginRight: 35 }}>{`£${
                                item.course_price || 0
                            } per ${item.course_length || 0} sessions`}</p>
                            <p
                                style={{ color: '#FF7100', cursor: 'pointer' }}
                                onClick={() => {
                                    // setCourseSelected(item);
                                    global.bookTraining = {
                                        siteId: props.site.ms_id || 0,
                                        siteName: props.site.ms_name || '',
                                        address: '',
                                        preDefined: { item },
                                    };
                                    dispatch({
                                        type: siteActionType.SELECT_ACADEMY,
                                        data: props.site,
                                    });

                                    // console.log(global.bookTraining, 'global2');
                                    history.push(PathRoute.BookTrialTraining);
                                }}>
                                Book
                            </p>
                        </div>
                    </div>
                ))}
            <p>
                <Link
                    href={'/' + props.site.ms_alias + PathRoute.WeeklyTraining}
                    passHref>
                    <a
                        style={{
                            color: '#EE7925',
                            textDecoration: 'underline',
                        }}>
                        Find out more
                    </a>
                </Link>
            </p>
        </div>
    );
}

LDHolidayCamp.propTypes = {
    site: PropTypes.object,
    isMobile: PropTypes.bool,
    config: PropTypes.object,
};
function LDHolidayCamp(props) {
    // console.log(props, ' props holiday');
    const dispatch = useDispatch();
    const history = useRouter();

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
                if (siteReducer.courseType === 'event')
                    setLstCourse(siteReducer.dataEvent);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        console.log(lstCourse, 'lstCourse');
    }, [lstCourse]);

    return (
        <>
            <h4>{props.config ? props.config.des : ''}</h4>

            {parse(props?.config?.content || '')}

            <h5>
                Upcoming camps by {props.site ? props.site.ms_name + ':' : ''}
            </h5>
            {lstCourse?.length ? (
                <>
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
                                    {item.date} | {item.time} |{' '}
                                    {item.course_title}
                                </p>
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
                                        href={
                                            '/' +
                                            props.site.ms_alias +
                                            PathRoute.HolidayCamp
                                        }>
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
                                        £{courseSelected.half_day_price} per
                                        half day
                                    </div>
                                    <div
                                        style={{
                                            borderBottom: '1px solid #F2F2F2',
                                            marginBottom: 16,
                                        }}>
                                        £{courseSelected.single_day_price} per
                                        full day
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
                                                siteName:
                                                    props.site.ms_name || '',
                                            };
                                            history.push(
                                                PathRoute.BookTrialCamp,
                                            );
                                        }}
                                    />
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </>
            ) : (
                <p style={{ color: 'red' }}>
                    {`There are currently no holiday camps available at ${props.site.location_name.text}`}
                </p>
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
            {/* <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p> */}
            {parse(props?.config?.content || '')}
            <Link
                href={'/' + props.site.ms_alias + PathRoute.OneTraining}
                passHref>
                <a style={{ color: '#EE7925', textDecoration: 'underline' }}>
                    Find out more
                </a>
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
            {/* <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p> */}
            {parse(props?.config?.content || '')}
            <Link
                href={'/' + props.site.ms_alias + PathRoute.BirthdayParty}
                passHref>
                <a style={{ color: '#EE7925', textDecoration: 'underline' }}>
                    Find out more
                </a>
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
            {/* <p
                dangerouslySetInnerHTML={{
                    __html: props.config ? props.config.content : '',
                }}></p> */}
            {parse(props?.config?.content || '')}
            <Link href={PathRoute.SchoolTraining} passHref>
                <a style={{ color: '#EE7925', textDecoration: 'underline' }}>
                    Find out more
                </a>
            </Link>
        </>
    );
}

TrainingService.propTypes = {
    site: PropTypes.object,
    service: PropTypes.object,
};

// const imageService = require('images/service.png');
// const imageServiceActive = require('images/service-active.png');

function TrainingService(props) {
    // console.log(props, 'props training');
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(0);
    const [innerWidth, setInnerWith] = useState(2000);
    const list = props?.service?.cfg_value || [];
    const siteName = getFranchiseName(props.site);

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

    // console.log(props.site);
    if (isMobile) {
        return (
            !isEmpty(list) && (
                <div className="service-mobile">
                    <h2>{siteName} junior football training services:</h2>
                    <div>
                        <div className="service-group">
                            <img
                                loading="lazy"
                                alt=""
                                src={Utils.getThumb(list[0].icon)}
                                style={{ width: '37px' }}
                            />
                            <span>{list[0].title}</span>
                            <div style={{ height: '2rem' }} />
                            <LDWeeklyTraining
                                site={props.site}
                                options={options}
                                isMobile={true}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[0]
                                        : {}
                                }
                                onClickLocation={props.onClickLocation}
                            />
                        </div>
                        <div className="service-group">
                            <img
                                loading="lazy"
                                alt=""
                                src={Utils.getThumb(list[1].icon)}
                                style={{ width: '37px' }}
                            />
                            <span>{list[1].title}</span>
                            <div style={{ height: '2rem' }} />
                            <LDHolidayCamp
                                site={props.site}
                                isMobile={true}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[1]
                                        : {}
                                }
                            />
                        </div>
                        <div className="service-group">
                            <img
                                loading="lazy"
                                alt=""
                                src={Utils.getThumb(list[2].icon)}
                                style={{ width: '37px' }}
                            />
                            <span>{list[2].title}</span>
                            <div style={{ height: '2rem' }} />
                            <LDOneTraining
                                site={props.site}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[2]
                                        : {}
                                }
                            />
                        </div>
                        <div className="service-group">
                            <img
                                loading="lazy"
                                alt=""
                                src={Utils.getThumb(list[3].icon)}
                                style={{ width: '37px' }}
                            />
                            <span>{list[3].title}</span>
                            <div style={{ height: '2rem' }} />
                            <LDBirthdayParty
                                site={props.site}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[3]
                                        : {}
                                }
                            />
                        </div>
                        <div className="service-group">
                            <img
                                loading="lazy"
                                alt=""
                                src={Utils.getThumb(list[4].icon)}
                                style={{ width: '37px' }}
                            />
                            <span>{list[4].title}</span>
                            <div style={{ height: '2rem' }} />
                            <LDSchoolTraining
                                site={props.site}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[4]
                                        : {}
                                }
                            />
                        </div>
                    </div>
                </div>
            )
        );
    }

    return (
        <div className="box-reasons training-service">
            <div className="container">
                <h2 className="heading">
                    {siteName} junior football training services:
                </h2>
                <div className="content-small">
                    <ul className="nav-tabs">
                        {!isEmpty(list) &&
                            list.map((item, index) => (
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
                                    onMouseLeave={() => setHoverIndex(-1)}
                                    onClick={() => setActiveIndex(index)}>
                                    <a data-toggle="tab">
                                        <img
                                            loading="lazy"
                                            alt=""
                                            src={Utils.getThumb(item.icon)}
                                            style={{ width: '37px' }}
                                        />
                                        {item.title}
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
                                onClickLocation={props.onClickLocation}
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
                                site={props.site}
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
                                site={props.site}
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
                                site={props.site}
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
export default TrainingService;
