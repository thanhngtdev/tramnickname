import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import router, { Router, useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import { siteActionType } from 'src/redux/actions/actionTypes';
import Button from '../Button';
import Utils from 'src/common/Utils';
import { PopupButton } from '@typeform/embed-react';
import AboutInfoItem from './AboutInfoItem';

AboutInfo.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfo(props) {
    const { item } = props;
    // console.log('propsAbout',props);
    //! State
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useRouter();
    const dispatch = useDispatch();
    const textareaRef = useRef(null);
    const [selectedAcademy, setSelectedAcademy] = useState(
        props.site || props.lstAcademy?.[0] || {},
    );
    // const [lstAddress, setLstAddress] = useState(
    //     props.site
    //         ? [
    //               {
    //                   label: props.site.ms_addresses,
    //                   value: props.site.ms_id,
    //               },
    //           ]
    //         : [
    //               {
    //                   label: props.lstAcademy?.[0]?.ms_address || '',
    //                   value: props.lstAcademy?.[0]?.ms_id || '',
    //               },
    //           ],
    // );
    // console.log('lstAddress',lstAddress);
    // console.log('selectDefault',selectedAcademy);

    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [titleButton, setTitleButton] = useState(
        props.site && props.site.ms_trial === 1
            ? 'Book a trial session'
            : 'Book a free session',
    );

    //! UseEffect
    useEffect(() => {
        // const address = document.getElementById('address');
        // address.autoResize = true;
        // console.log('select',selectedAcademy);
        if (!isEmpty(selectedAcademy?.pa_companyId)) {
            const listId = selectedAcademy.ms_addresses
                .map((item) => item.pa_locationId)
                .join(',');
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: selectedAcademy.pa_companyId,
                location_id: listId,
                course_type: 'course',
            });
        }
    }, [selectedAcademy]);

    useEffect(() => {
        // console.log('address_id',props);

        if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
            // console.log(siteReducer.data);
            // console.log('updateData',siteReducer);

            setLstCourse(
                Utils.convertLocation(
                    selectedAcademy.ms_addresses,
                    siteReducer.dataCourse,
                ),
            );
            // setLstCourse(siteReducer.data);
            setCourseSelected(siteReducer.data[0]);
        }
    }, [props.site, siteReducer]);

    // useEffect(() => {
    //     // console.log(selectedAcademy, 'selectedAcademy');

    //     // textareaRef.current.style.height = '0px';
    //     const scrollHeight = textareaRef.current.scrollHeight;
    //     textareaRef.current.style.height = scrollHeight + 'px';
    // }, [selectedAcademy]);

    //! Functions
    const handleOnChange = (option) => {
        global.bookTraining = {
            siteId: option.ms_id,
            siteName: option.ms_name,
            address: '',
        };

        // console.log('option',option);

        setSelectedAcademy(option);
        setCourseSelected({});
        setTitleButton(
            option.ms_trial === 1
                ? 'Book a trial session'
                : 'Book a free session',
        );
        setLstAddress([
            {
                label: option.ms_addresses,
                value: option.ms_id,
            },
        ]);
        const listId = option.ms_addresses
            .map((item) => item.pa_locationId)
            .join(',');
        dispatch({
            type: siteActionType.GET_LIST_COURSE,
            company_id: option.pa_companyId,
            location_id: listId,
            course_type: 'course',
        });
        history.push({
            pathname: PathRoute.WeeklyTrainingWithAlias(option.ms_alias),
        });
        // getListCourse();
    };

    //! Render
    return (
        <div className="about-info">
            <div className="wrap-info">
                <p className="about-info-title">
                    Find your nearest training session
                </p>
                <div className="wSelect2">
                    <label>Select academy</label>
                    <Select
                        value={selectedAcademy}
                        options={props.lstAcademy}
                        isSearchable={false}
                        isMulti={false}
                        styles={CommonStyle.select2}
                        getOptionLabel={(option) => {
                            return Utils.renderItem(option);
                        }}
                        getOptionValue={(option) => option.ms_id}
                        onChange={handleOnChange}
                    />
                </div>
                {/* <div className="wSelect2">
                    <textarea
                            id="address"
                            // disabled={true}
                            value={
                                lstAddress.length > 0 && lstAddress[0].label
                                    ? lstAddress[0].label
                                    : ''
                            }
                            type="text"
                            className="outputText"
                            ref={textareaRef}
                        />
                    
                </div> */}
                {selectedAcademy && selectedAcademy.ms_trial === 1 && (
                    <div className="wSelect2">
                        <label>Cost</label>
                        <p
                            style={{
                                color: '#FF7100',
                                marginBottom: 0,
                                textAlign: 'left',
                            }}>
                            £{courseSelected?.course_price || 0} per{' '}
                            {courseSelected?.course_length || 0} sessions
                        </p>
                    </div>
                )}
                {lstCourse &&
                    Object.entries(lstCourse).map((item, index) => (
                        <AboutInfoItem
                            title={item[0]}
                            item={item[1]}
                            key={index}
                            index={index}
                            site={props.site}
                        />
                    ))}

                {/* {lstCourse.length > 0 && (
                    <div className="wSelect2">
                        {lstCourse.map((item, index) => (
                            <div
                                key={index}
                                className="classRow"
                                onClick={() => {
                                    // console.log(item, 'item');
                                    setCourseSelected(item);
                                }}
                                style={{
                                    backgroundColor: `${
                                        index % 2 === 0 ? '#F7F8F7' : 'white'
                                    }`,
                                }}>
                                <p>{item.day_of_week}</p>
                                <p>
                                    {dayjs(
                                        '2021-03-03T' +
                                            item.course_day_time_start,
                                    ).format('HH:mma')}
                                    -
                                    {dayjs(
                                        '2021-03-03T' +
                                            item.course_day_time_end,
                                    ).format('HH:mma')}
                                    {item.gender === 0 && (
                                        <>
                                            <br />
                                            <span style={{ color: '#ee7925' }}>
                                                Girl only class
                                            </span>
                                        </>
                                    )}
                                </p>
                                <p>
                                    {item.min_age}-{item.max_age} year olds
                                </p>
                            </div>
                        ))}
                    </div>
                )} */}

                <div style={{ textAlign: 'center' }}>
                    <Button
                        idTypeForm={
                            selectedAcademy?.ms_use_typeform === 1
                                ? selectedAcademy?.ms_typeform_id
                                : null
                        }
                        title={titleButton}
                        type
                        onClick={() => {
                            dispatch({
                                type: siteActionType.SELECT_ACADEMY,
                                data: selectedAcademy,
                            });
                            if (selectedAcademy.ms_alias === undefined) {
                                history.push(PathRoute.BookTrialTraining);
                            }
                            history.push(
                                PathRoute.BookTrialTrainingWithAlias(
                                    selectedAcademy.ms_alias,
                                ),
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
