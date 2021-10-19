import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import Radiobox from 'src/components/include/Radiobox/Radiobox';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { courseStartDate } from 'src/redux/actions/siteAction';

export default (props) => {
    // console.log(props, 'near');
    //! State
    const siteReducer = useSelector((state) => state.siteReducer);
    const dispatch = useDispatch();
    const [listCourse, setListCourse] = useState([]);
    const [selectedItem, setSelectedItem] = useState(props.listNearby[0]);
    const [courseSelected, setCourseSelected] = useState({});
    const [lstStartDate, setLstStartDate] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [defaultTrial, setDefaultTrial] = useState(0);

    const [siteError, setSiteError] = useState('');
    const [trialDateError, setTrialDateError] = useState('');
    //! UseEffect

    useEffect(() => {
        if (isEmpty(selectedItem)) return;

        dispatch({
            type: siteActionType.GET_LIST_COURSE,
            company_id: selectedItem.pa_companyId,
            location_id: selectedItem.pa_locationId,
            course_type: 'course',
        });
    }, [selectedItem]);

    useEffect(() => {
        if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
            setListCourse(siteReducer.data);
            // console.log(siteReducer.data, 'site');
            if (siteReducer.data) {
                // console.log(props.data.date_of_birth, 'birth');
                const ageStudent = Utils.getAge(
                    new Date(props.data.date_of_birth),
                );
                // console.log(ageStudent, 'student');
                const newLstCourse = [...siteReducer.data].filter(
                    (course) =>
                        course.min_age <= ageStudent &&
                        ageStudent <= course.max_age,
                );

                setListCourse(newLstCourse);
            } else {
                setListCourse([]);
            }
        }
        if (siteReducer.type === siteActionType.COURSE_START_DATE_SUCCESS) {
            setLstStartDate(siteReducer.data);
        }
    }, [siteReducer]);

    //! Function

    function validateData() {
        let _validate = true;
        if (isEmpty(selectedItem)) {
            _validate = false;
            setSiteError('Please select a academy');
        } else setSiteError('');
        if (startDate === '') {
            _validate = false;
            setTrialDateError('Please choose trial date');
        } else setTrialDateError('');
        return _validate;
    }

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
                        value={selectedItem}
                        options={props?.listNearby}
                        isSearchable={false}
                        isMulti={false}
                        styles={CommonStyle.select2}
                        getOptionLabel={(option) =>
                            option.ms_name +
                            ` - ${parseInt(option.distance, 10)}km`
                        }
                        getOptionValue={(option) => option.ms_id}
                        onChange={(option) => {
                            setSelectedItem(option);
                            // console.log(option, 'option');
                        }}
                    />
                    <label className="input-error">{siteError}</label>
                </div>

                {!isEmpty(selectedItem) && (
                    <div className="wSelect2">
                        <b>
                            Choose your class time{' '}
                            <span style={{ color: '#FF7100' }}>
                                @{selectedItem.ms_name}
                            </span>{' '}
                            Academy
                        </b>
                    </div>
                )}

                {listCourse.length > 0 && (
                    <div className="wSelect2">
                        {listCourse.map((item, index) => (
                            <div
                                key={index}
                                className="classRow"
                                style={{
                                    backgroundColor: `${
                                        index % 2 === 0 ? '#F7F8F7' : 'white'
                                    }`,
                                }}>
                                <Radiobox
                                    onChange={() => {
                                        if (
                                            item.course_id ===
                                            courseSelected.course_id
                                        ) {
                                            return;
                                        }

                                        // console.log(item.course_id, 'item');
                                        // return;
                                        dispatch(
                                            courseStartDate(item.course_id),
                                        );

                                        setCourseSelected(item);
                                    }}
                                    checked={
                                        item.course_id ===
                                        courseSelected.course_id
                                    }>
                                    {item.day_of_week}
                                </Radiobox>
                                <label>
                                    {dayjs(
                                        '2021-03-03T' +
                                            item.course_day_time_start,
                                    ).format('hh:mma')}
                                    -
                                    {dayjs(
                                        '2021-03-03T' +
                                            item.course_day_time_end,
                                    ).format('hh:mma')}
                                </label>
                                <span>
                                    {item.min_age}-{item.max_age} year olds
                                </span>
                            </div>
                        ))}
                        {selectedItem.ms_trial === 1 && (
                            <>
                                <hr />
                                <p
                                    style={{
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        marginRight: '1rem',
                                    }}>
                                    Total: &nbsp; £
                                    {courseSelected.course_price || 0}
                                </p>
                            </>
                        )}
                    </div>
                )}

                <div className="wSelect2">
                    <label>Trial Date</label>
                    <Select
                        value={defaultTrial}
                        // defaultValue={0}
                        options={lstStartDate}
                        isSearchable={false}
                        isMulti={false}
                        getOptionLabel={
                            (option) =>
                                option?.date_show +
                                ' ' +
                                dayjs(option?.date).format('YYYY')
                            // new Date().getFullYear()
                        }
                        getOptionValue={(option) => option.date}
                        styles={CommonStyle.select2}
                        onChange={(option) => {
                            setStartDate(option.date);
                            setDefaultTrial(option);
                        }}
                    />
                    <label className="input-error">{trialDateError}</label>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Button
                        title={`Book a ${
                            selectedItem.ms_trial === 1 ? 'trial' : 'free'
                        } session`}
                        onClick={() => {
                            if (validateData()) {
                                props.bookingNearby(
                                    courseSelected.course_id,
                                    startDate,
                                );
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
