import dayjs from 'dayjs';
import { size } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { Router, useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
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
        if (!isEmpty(listHasCamp)) {
            if (!isEmpty(props.site)) {
                handleSelectedSite(props.site, true);
                return;
            }
            handleSelectedSite(listHasCamp[0]);
        }
    }, [listHasCamp]);

    //! function
    const getListHasCamp = async () => {
        await sendGet(`${PARENT_API + APIConfig.GET_LIST_COMPANY_HAS_CAMP}`)
            .then((res) => {
                if (res.status === 200 && !isEmpty(res.data?.data)) {
                    setListHasCamp(res.data?.data || []);
                    const listCourse = [];
                    res.data?.data.map((item) => {
                        item?.locations?.map((el) => listCourse.push(el));
                    });
                    const courses = res.data?.data;

                    if (listCourse && listSite) {
        
                        const filterList = [];

                        listSite.map((item) => {
                            item.ms_addresses.map((it) => {
                                listCourse.map((el) => {
                                    
                                    if (
                                        it.pa_locationId ===
                                        el.location_id + ''
                                    ) {
                                       
                                        filterList.push(item);
                                    }
                                });
                            });
                        });

                        
                        setListCourse(courses);
                        // setListCourse(listCourse);
                        setListHasCamp(filterList);
                    }
                    
                }
            })
            .catch((err) => {
              
                setListHasCamp([]);
            });
    };

    const handleSelectedSite = (site, isSiteDefault = false) => {
        

        // const availableCompany = listCourse.find(
        //     (item) => item.location_id + '' === site.pa_locationId,
        // );
        const availableCompany = listCourse.find((item) => {
            return item.company_id + '' === site.pa_companyId;
        });
        
        let isCheck = true;
        availableCompany?.locations.map((el, index) => {
            let isTest = site.ms_addresses.find(
                (item) => item.pa_locationId === el.location_id + '',
            );
            if (!isTest) {
                isCheck = false;
            }
        });

        if (!isEmpty(availableCompany?.locations)) {
            // setLstCourse(availableCompany.locations);
            // setTitle(availableCompany.location_name);
            let testListCourse = availableCompany.locations.map((courseItem) => {
                let locationName = courseItem.location_name;
              
                let temp = courseItem.holiday_camps.map((item) => {
                    return{
                        ...item,
                        location_name: locationName,
                    }
                })
                
                return {
                    ...courseItem,
                    holidayCamps: [...temp]
                }
            })
            setLstCourse(testListCourse);
            if (!isCheck) {
                setTitle(`Nearby camps to ${site.ms_name}`);
            } else {
                setTitle(`Holiday Camps in ${site.ms_name}`);
            }
        } else {
            setLstCourse([]);
            setTitle(
                `There’s no holiday camp available in ${site.ms_name}, please select another location in the list below`,
            );
        }

        if (isSiteDefault === true) {
            setSelectedAcademy({
                ms_name: 'Select an academy here',
            });
            return;
        }
        
        
        
        setSelectedAcademy(site);
    };
    
    return (
        <div className="about-info">
            <div className="wrap-info">
                <p style={{ textAlign: 'center', fontSize: 24 }}>{title}</p>
               
                <div className="wSelect2">
                    <Select
                        value={selectedAcademy}
                        options={listHasCamp}
                        isSearchable={false}
                        isMulti={false}
                        styles={CommonStyle.select2}
                        getOptionLabel={(option) => {
                            return Utils.renderItem(option);
                        }}
                        getOptionValue={(option) => option.ms_id}
                        placeholder="abc"
                        onChange={handleSelectedSite}
                    />
                </div>
                
                {lstCourse.length > 0 && (
                    <div className="wSelect2">
                        {lstCourse.map((courseItem, index) =>
                            courseItem.holidayCamps.map((item, index) => {
                                
                                return (
                                    <div
                                        key={index}
                                        className="classRow"
                                        onClick={() => {
                                            setCourseSelected(item);
                                        }}
                                        style={{
                                            backgroundColor: `${
                                                index % 2 === 0
                                                    ? '#F7F8F7'
                                                    : 'white'
                                            }`,
                                        }}>
                                        <p>{item.course_title}</p>
                                        <p>
                                            {item.min_age}-{item.max_age} year
                                            olds
                                        </p>
                                        <p
                                            className="btn-book-camp"
                                            onClick={() => {
                                                if (isEmpty(lstCourse)) return;

                                                if (selectedAcademy) {
                                                    // history.push(PathRoute.BookTrialCamp);
                                                    history.push({
                                                        pathname:
                                                            PathRoute.BookTrialCamp,
                                                        query: { location_name: item.location_name,
                                                                course_title:item.course_title},
                                                    });
                                                    dispatch({
                                                        type: siteActionType.SELECT_ACADEMY,
                                                        data: selectedAcademy,
                                                    });
                                                }
                                            }}>
                                            Book
                                        </p>
                                    </div>
                                );
                            }),
                        )}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
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
        </div>
    );
}
