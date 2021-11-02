import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { APIConfig, PARENT_API } from 'src/requests/ApiConfig';
import { sendGet } from 'src/services/httpMethodPA';
import Button from '../Button';

AboutInfoCamp.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfoCamp(props) {
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const history = useRouter();
    const dispatch = useDispatch();
    const [selectedAcademy, setSelectedAcademy] = useState({});
    const [lstCourse, setLstCourse] = useState([]);
    const [listHasCamp, setListHasCamp] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [title, setTitle] = useState(
        `${dayjs().year()} Holiday Camp Calendar`,
    );

    const [listCourse, setListCourse] = useState([]);

    //! useEffect
    useEffect(() => {
        // dispatch({ type: siteActionType.GET_SITE_HAS_CAMP });
        if (!isEmpty(listSite) && isEmpty(listHasCamp)) {
            getListHasCamp();
        }
    }, [listSite]);

    useEffect(() => {
        console.log(listCourse, 'listCourse');
    }, [listCourse]);

    //! function
    const getListHasCamp = async () => {
        await sendGet(`${PARENT_API + APIConfig.GET_LIST_COMPANY_HAS_CAMP}`)
            .then((res) => {
                if (res.status === 200 && !isEmpty(res.data?.data)) {
                    // setListHasCamp(res.data?.data || []);
                    const listCourse = [];
                    res.data?.data.map((item) => {
                        item?.locations?.map((el) => listCourse.push(el));
                    });
                    // console.log(listCourse, 'listCourse');

                    // console.log(listSite, 'listSite');
                    if (listCourse && listSite) {
                        // console.log(listCourse, listSite, 'pre-filter');
                        const filterList = [];

                        listSite.map((item) => {
                            listCourse.map((el) => {
                                if (
                                    item.pa_locationId ===
                                    el.location_id + ''
                                ) {
                                    // console.log(el, item, 'ee');
                                    filterList.push(item);
                                }
                            });
                        });

                        // console.log(listCourse, 'filter');
                        setListCourse(listCourse);
                        setListHasCamp(filterList);
                    }

                    // console.log(listCourse, 'list');
                }
            })
            .catch((err) => {
                // console.log(err);
                setListHasCamp([]);
            });
    };

    const handleSelectedSite = (site) => {
        // console.log(site, 'site');

        const availableCompany = listCourse.find(
            (item) => item.location_id + '' === site.pa_locationId,
        );

        if (!isEmpty(availableCompany?.holiday_camps)) {
            setLstCourse(availableCompany.holiday_camps);
            setTitle(availableCompany.location_name);
        } else {
            setLstCourse([]);
            setTitle(
                `There’s no holiday camp available in ${site.ms_name}, please select another location in the list below`,
            );
        }

        setSelectedAcademy(site);
    };

    return (
        <div className="about-info">
            <div className="wrap-info">
                <p style={{ textAlign: 'center' }}>{title}</p>
                <div className="wSelect2">
                    <Select
                        value={selectedAcademy}
                        options={listHasCamp}
                        isSearchable={false}
                        isMulti={false}
                        styles={CommonStyle.select2}
                        getOptionLabel={(option) => option.ms_name}
                        getOptionValue={(option) => option.ms_id}
                        onChange={
                            handleSelectedSite
                            //     (option) => {
                            //     setCourseSelected({});
                            //     setLstCourse([]);
                            //     setSelectedAcademy(option);
                            // }
                        }
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
                            if (isEmpty(lstCourse)) return;

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
            {/* {txtAddress && (
                <p style={{ fontSize: 14, textAlign: 'center' }}>
                    Holiday camps are available in {txtAddress}.
                </p>
            )} */}
        </div>
    );
}
