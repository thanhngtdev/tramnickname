import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PopupButton } from '@typeform/embed-react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
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
import TrainingServiceItem from './TrainingServiceItem';
import useTruspilot from 'src/hooks/useTruspilot';
import useGetWidth from 'src/hooks/useGetWidth';
import Script from 'next/script';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


LDWeeklyTraining.propTypes = {
    site: PropTypes.object,
    config: PropTypes.object,
    options: PropTypes.array,
    isMobile: PropTypes.bool,
};

const PlayButton = () => {
    return (
        <svg
            id="Group_11"
            data-name="Group 11"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100">
            <path
                id="Combined_Shape"
                data-name="Combined Shape"
                d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z"
                fill="#fff"
                opacity="0.7"
            />
            <path
                id="Path"
                d="M27.5,18.336a2,2,0,0,1,0,3.328L3.109,37.927A2,2,0,0,1,0,36.263V3.737A2,2,0,0,1,3.109,2.073Z"
                transform="translate(40 30)"
                fill="#ff7100"
            />
        </svg>
    );
};

function PlayVideo(props) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.6)',
                width: '100%',
                height: '100%',
                padding: '5% 2%',
            }}>
            <div
                style={{
                    background: 'white',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    float: 'right',
                    marginBottom: 10,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if (props.onClose) props.onClose();
                }}>
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: '#EE7925', fontSize: '0.7em' }}
                />
            </div>
            <iframe
                width="100%"
                height="100%"
                src={props.url + '?&autoplay=1'}
                frameBorder="0"
                allowFullScreen
                allow="autoplay"></iframe>
        </div>
    );
}

function LDWeeklyTraining(props) {
    const isMobile = useGetWidth() <= 768;
    const MAX_LENGTH = props.isMobile ? 2 : 10;
    const dispatch = useDispatch();
    const history = useRouter();
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    // const [listCourse,setListCourse] = useState([]);

    useEffect(() => {
        if (!isEmpty(props.site)) {
            const listId = props.site.ms_addresses
                .map((item) => item.pa_locationId)
                .join(',');

            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: props.site.pa_companyId,
                location_id: listId,
                course_type: 'course',
            });
        }
    }, [props.site]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        let isCheck = true;
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.dataCourse,"data");
                if (siteReducer.courseType === 'course') {
                    // debugger;

                    setLstCourse(
                        Utils.convertLocation(
                            props.site.ms_addresses,
                            siteReducer.dataCourse,
                        ),
                    );
                }
            }
        }
        // console.log('listCourse: ',listCourse);
    }, [siteReducer]);

    const newAddressLenght = props.site.ms_addresses.length;
    const newAddress = props.site.ms_addresses;

    return (
        <>
            {/* <div className="group-info" style={{ boxShadow: 'none' }}>
                <label className="group-name">Address</label>
                {newAddressLenght && newAddressLenght > 1 ? (
                    newAddress.map((address) => {
                        return <h4>{address.ms_address}</h4>;
                    })
                ) : (
                    <h4>{newAddress[0].ms_address}</h4>
                )}
            </div> */}
            {!props.isHeader ? parse(props?.config?.content || '') : ''}
            {!isMobile && <h4>Football training times:</h4>}

            {lstCourse &&
                Object.entries(lstCourse).map((item, index) => (
                    <TrainingServiceItem
                        title={item[0]}
                        item={item[1]}
                        key={index}
                        index={index}
                        site={props.site}
                        isHeader={props.isHeader}
                    />
                ))}
            {(!isMobile || !props.isHeader) && (
                <p>
                    <Link
                        href={
                            '/' + props.site.ms_alias + PathRoute.WeeklyTraining
                        }
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
            )}
        </>
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
                location_id: props.site.pa_locationId,
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
        // console.log(lstCourse, 'lstCourse');
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
    const [showVideo, setShowVIdeo] = useState(false);
    const [isOpenText, setIsOpenText] = useState({
        isWeeklyTraining: false,
        isHolydayCamps: false,
        isOneTraining: false,
        isBirthDayParty: false,
        isSchoolTraining: false,
    });
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

    const isMobile = useGetWidth() <= 768;

    // console.log(props.site);
    if (isMobile) {
        return (
            !isEmpty(list) && (
                <div className="service-mobile">
                    {!props.isHeader && (
                        <h2>{siteName} junior football training services:</h2>
                    )}
                    <div>
                        {/* <div className="service-group"> */}
                        <div
                            className={`${
                                !props.isHeader
                                    ? 'service-group borderLine'
                                    : 'service-group padding-0'
                            }`}>
                            <div
                                className={`${
                                    props.isHeader
                                        ? 'textAlign'
                                        : 'service-group-title'
                                }`}>
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={Utils.getThumb(list[0].icon)}
                                    style={{ width: '37px' }}
                                />
                                {props.isHeader ? 
                                <span >{list[0].title}</span> :
                                <div className='service-group-title-text'>
                                    <span style={{fontWeight:'500',
                                                color:'#EE7925'}}>{list[0].title}</span>
                                    <div style={{display:'flex',
                                                fontSize:'18px',
                                                fontWeight:'300',
                                                marginTop:'.5rem',
                                                cursor:'pointer'}}
                                                onClick={() => setIsOpenText((prev) => {
                                                    return{
                                                        ...prev,
                                                        isWeeklyTraining: !isOpenText.isWeeklyTraining
                                                    }  
                                                })}>
                                        Learn more
                                        <div style={{marginLeft:'1rem'}} 
                                            className='right-arrow'
                                            >
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                    style={{
                                                        color: '#EE7925',
                                                        fontSize: '1rem',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {props.isHeader && <>
                                {showVideo &&
                                    props.dataBannerTop.about.cfg_content &&
                                    props.dataBannerTop.about.cfg_content.includes(
                                        'youtube.com',
                                    ) && (
                                        <PlayVideo
                                            url={Utils.getLinkYoutube(
                                                props?.dataBannerTop.about?.cfg_content || '',
                                            )}
                                            onClose={() => {
                                                setShowVIdeo(false);
                                            }}
                                        />
                                    )}
                                    
                                    
                                            <div className="col-6 paddingNoneImg">
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: '250px',
                                                        objectFit: 'cover',
                                                    }}
                                                    loading="lazy"
                                                    alt=""
                                                    src={Utils.getThumb(
                                                        // props.data?.cfg_image,
                                                        !isMobile
                                                            ? props.dataBannerTop.about?.cfg_image
                                                            : props.dataBannerTop.about?.cfg_image,
                                                    )}
                                                    // height="1000px"
                                                />
                                                {props.dataBannerTop.about.cfg_content &&
                                                    props.dataBannerTop.about.cfg_content.includes(
                                                        'youtube.com',
                                                    ) && (<>
                                                            <div className='title-img'>Experience our training</div>
                                                            <div
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    backgroundColor: '#ffffff',
                                                                    borderRadius: '50%',
                                                                    width: '5rem',
                                                                    height: '5rem',
                                                                    alignItems: 'center',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    zIndex: 1,
                                                                }}
                                                                onClick={() => setShowVIdeo(true)}>
                                                                <PlayButton />
                                                            </div>
                                                        </>
                                                    )}
                                            </div>
                                        
                                    
                                
                            </>}
                            {isOpenText.isWeeklyTraining && (
                                <>
                                    <div style={{ height: '2rem' }} />
                                    <LDWeeklyTraining
                                        site={props.site}
                                        options={options}
                                        isHeader={props.isHeader}
                                        config={
                                            props.service &&
                                            props.service.cfg_value
                                                ? props.service.cfg_value[0]
                                                : {}
                                        }
                                        onClickLocation={props.onClickLocation}
                                    />
                                </>
                            )}
                            {props.isHeader && (
                                <>
                                    {!props.isHeader&&<div style={{ height: '2rem' }} />}
                                    <LDWeeklyTraining
                                        site={props.site}
                                        options={options}
                                        isHeader={props.isHeader}
                                        config={
                                            props.service &&
                                            props.service.cfg_value
                                                ? props.service.cfg_value[0]
                                                : {}
                                        }
                                        onClickLocation={props.onClickLocation}
                                    />
                                </>
                            )}
                        </div>
                            
                            
                        {!props.isHeader &&
                        <div className={`${!props.isHeader ? "service-group borderLine":"service-group"}`}>
                            <div className='service-group-title'>
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={Utils.getThumb(list[1].icon)}
                                    style={{ width: '37px' }}
                                />
                                {props.isHeader ? 
                                <span >{list[1].title}</span> :
                                <div className='service-group-title-text'>
                                    <span style={{fontWeight:'500',
                                                color:'#EE7925'}}>{list[1].title}</span>
                                    <div style={{display:'flex',
                                                fontSize:'18px',
                                                fontWeight:'300',
                                                marginTop:'.5rem',
                                                cursor:'pointer'}}
                                                onClick={() => setIsOpenText((prev) => {
                                                    return{
                                                        ...prev,
                                                        isHolydayCamps:!isOpenText.isHolydayCamps
                                                    }
                                                })}>
                                        Learn more
                                        <div style={{marginLeft:'1rem'}}
                                            className='right-arrow'
                                            >
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                        style={{
                                                            color: '#EE7925',
                                                            fontSize: '1rem',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {isOpenText.isHolydayCamps && (
                                    <>
                                        <div style={{ height: '2rem' }} />
                                        <LDHolidayCamp
                                            site={props.site}
                                            isMobile={true}
                                            config={
                                                props.service &&
                                                props.service.cfg_value
                                                    ? props.service.cfg_value[1]
                                                    : {}
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        }
                        {!props.isHeader &&
                            <div
                                className={`${
                                    !props.isHeader
                                        ? 'service-group borderLine'
                                        : 'service-group'
                                }`}>
                                <div className="service-group-title">
                                    <img
                                        loading="lazy"
                                        alt=""
                                        src={Utils.getThumb(list[2].icon)}
                                        style={{ width: '37px' }}
                                    />
                                {props.isHeader ? 
                                    <span >{list[2].title}</span> :
                                    <div className='service-group-title-text'>
                                        <span style={{fontWeight:'500',
                                                    color:'#EE7925'}}>{list[2].title}</span>
                                        <div style={{display:'flex',
                                                    fontSize:'18px',
                                                    fontWeight:'300',
                                                    marginTop:'.5rem',
                                                    cursor:'pointer'}}
                                                    onClick={() => setIsOpenText((prev) => {
                                                        return{
                                                            ...prev,
                                                            isOneTraining:!isOpenText.isOneTraining
                                                        }
                                                    })}>
                                            Learn more
                                            <div style={{marginLeft:'1rem'}} 
                                                className='right-arrow'
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                        style={{
                                                            color: '#EE7925',
                                                            fontSize: '1rem',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>}
                            </div> 
                            {isOpenText.isOneTraining && <>
                                <div style={{ height: '2rem' }} />
                                <LDOneTraining
                                    site={props.site}
                                    config={
                                        props.service && props.service.cfg_value
                                            ? props.service.cfg_value[2]
                                            : {}
                                    }
                                />
                            </>}
                        </div>}
                        {!props.isHeader &&
                        <div className={`${!props.isHeader ? "service-group borderLine":"service-group"}`}>
                            <div className='service-group-title'>
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={Utils.getThumb(list[3].icon)}
                                    style={{ width: '37px' }}
                                />
                                {props.isHeader ? 
                                <span >{list[3].title}</span> :
                                <div className='service-group-title-text'>
                                    <span style={{fontWeight:'500',
                                                color:'#EE7925'}}>{list[3].title}</span>
                                    <div style={{display:'flex',
                                                fontSize:'18px',
                                                fontWeight:'300',
                                                marginTop:'.5rem',
                                                cursor:'pointer'}}
                                                onClick={() => setIsOpenText((prev) => {
                                                    return{
                                                        ...prev,
                                                        isBirthDayParty:!isOpenText.isBirthDayParty
                                                    }
                                                })}>
                                        Learn more
                                        <div style={{marginLeft:'1rem'}}
                                             className='right-arrow'
                                             >
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                style={{
                                                    fontWeight: '500',
                                                    color: '#EE7925',
                                                    fontSize: '1rem',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div> }
                    </div>
                        {isOpenText.isBirthDayParty && <>
                            <div style={{ height: '2rem' }} />
                            <LDBirthdayParty
                                site={props.site}
                                config={
                                    props.service && props.service.cfg_value
                                        ? props.service.cfg_value[3]
                                        : {}
                                }
                            />
                        </>}
                        </div>}
                        {!props.isHeader &&
                        <div className={`${!props.isHeader ? "service-group borderLine":"service-group"}`}>
                            <div className='service-group-title'>
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={Utils.getThumb(list[4].icon)}
                                    style={{ width: '37px' }}
                                />
                                {props.isHeader ? 
                                <span >{list[4].title}</span> :
                                <div className='service-group-title-text'>
                                    <span style={{fontWeight:'500',
                                                color:'#EE7925'}}>{list[4].title}</span>
                                    <div style={{display:'flex',
                                                fontSize:'18px',
                                                fontWeight:'300',
                                                marginTop:'.5rem',
                                                cursor:'pointer'}}
                                                onClick={() => setIsOpenText((prev) => {
                                                    return{
                                                        ...prev,
                                                        isSchoolTraining:!isOpenText.isSchoolTraining
                                                    }
                                                })}>
                                        Learn more
                                        <div style={{marginLeft:'1rem'}} 
                                             className='right-arrow'
                                            >
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                        style={{
                                                            color: '#EE7925',
                                                            fontSize: '1rem',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {isOpenText.isSchoolTraining && (
                                    <>
                                        <div style={{ height: '2rem' }} />
                                        <LDSchoolTraining
                                            site={props.site}
                                            config={
                                                props.service &&
                                                props.service.cfg_value
                                                    ? props.service.cfg_value[4]
                                                    : {}
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        }
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
