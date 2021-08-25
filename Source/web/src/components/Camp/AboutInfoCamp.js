import _, { isEmpty } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import SolidButton from 'src/components/include/SolidButton';
import { siteActionType } from 'src/redux/actions/actionTypes';
import Button from '../Button';

AboutInfoCamp.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfoCamp(props) {
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useRouter();
    const dispatch = useDispatch();
    // const defaultAcademy = useGetLocalStorage();
    const [selectedAcademy, setSelectedAcademy] = useState(
        props.site || listSite?.[0] || {},
    );
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [lstCamp, setLstCamp] = useState(siteReducer.lstSiteCamp);
    const [txtAddress, setTxtAddress] = useState('');

    //! useEffect
    useEffect(() => {
        if (!isEmpty(props?.site)) {
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: props.site.pa_companyId,
                course_type: 'event',
            });
        }
        if (_.isEmpty(siteReducer.lstSiteCamp)) {
            dispatch({ type: siteActionType.GET_SITE_HAS_CAMP });
        }
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                setLstCourse(siteReducer.data);
            }

            if (siteReducer.type === siteActionType.GET_LIST_COURSE_FAILED) {
                setLstCourse([]);
            }

            if (siteReducer.type === siteActionType.GET_SITE_HAS_CAMP_SUCCESS) {
                setLstCamp(siteReducer.lstSiteCamp);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (!_.isEmpty(siteReducer?.lstSiteCamp)) {
            setTxtAddress(convertListToText(lstCamp));
        }
    }, [lstCamp]);

    //! function

    function convertListToText(lstCamp) {
        let temp = '';
        lstCamp.map((item, index) => {
            if (index === 0) temp = item.ms_name;
            else if (index === lstCamp.length - 1)
                temp = temp + ' and ' + item.ms_name;
            else temp = temp + ', ' + item.ms_name;
        });

        return temp;
    }

    return (
        <div className="about-info">
            <div className="wrap-info">
                <p style={{ textAlign: 'center' }}>
                    {moment().year()} Holiday Camp Calendar
                </p>
                <div className="wSelect2">
                    <Select
                        value={selectedAcademy}
                        options={listSite}
                        isSearchable={false}
                        isMulti={false}
                        styles={CommonStyle.select2}
                        getOptionLabel={(option) => option.ms_name}
                        getOptionValue={(option) => option.ms_id}
                        onChange={(option) => {
                            // console.log(option, 'aaa');
                            // global.bookCamp = {
                            //   siteId: option.ms_id,
                            //   siteName: option.ms_name,
                            // };
                            setCourseSelected({});
                            setSelectedAcademy(option);
                            dispatch({
                                type: siteActionType.GET_LIST_COURSE,
                                company_id: option.pa_companyId,
                                course_type: 'event',
                            });
                        }}
                    />
                </div>
                {lstCourse.length > 0 && (
                    <div className="wSelect2">
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
                                <p>{item.course_title}</p>
                                <p>
                                    {item.min_age}-{item.max_age} year olds
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
                    {/* <SolidButton
                        title="Book now"
                        onClick={() => {
                            if (selectedAcademy) {
                                history.push(PathRoute.BookTrialCamp);
                                dispatch({
                                    type: siteActionType.SELECT_ACADEMY,
                                    data: selectedAcademy,
                                });
                            }
                        }}
                    /> */}

                    <Button
                        title="Book now"
                        onClick={() => {
                            if (selectedAcademy) {
                                history.push(PathRoute.BookTrialCamp);
                                dispatch({
                                    type: siteActionType.SELECT_ACADEMY,
                                    data: selectedAcademy,
                                });
                            }
                        }}
                    />
                </div>
            </div>
            {txtAddress && (
                <p style={{ fontSize: 14, textAlign: 'center' }}>
                    Holiday camps are available in {txtAddress}.
                </p>
            )}
        </div>
    );
}
