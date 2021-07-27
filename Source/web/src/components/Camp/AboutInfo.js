import { CommonStyle } from 'src/common/Styles';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import SolidButton from 'src/components/include/SolidButton';
import { siteActionType } from 'src/redux/actions/actionTypes';

AboutInfo.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfo(props) {
    //! State
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useRouter();
    const dispatch = useDispatch();
    const [selectedAcademy, setSelectedAcademy] = useState(props.site || {});
    const [lstAddress, setLstAddress] = useState(
        props.site
            ? [
                  {
                      label: props.site.ms_address,
                      value: props.site.ms_id,
                  },
              ]
            : [],
    );
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [titleButton, setTitleButton] = useState(
        props.site && props.site.ms_trial === 1
            ? 'Book a trial session'
            : 'Book a free session',
    );

    // global.bookTraining = defaultAcademy
    //   ? {
    //       siteId: defaultAcademy.ms_id,
    //       siteName: defaultAcademy.ms_name,
    //       address: "",
    //     }
    //   : {};

    //! UseEffect
    useEffect(() => {
        if (!isEmpty(selectedAcademy?.pa_companyId))
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: selectedAcademy.pa_companyId,
                location_id: selectedAcademy.pa_locationId,
                course_type: 'course',
            });
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                setLstCourse(siteReducer.data);
                setCourseSelected(siteReducer.data[0]);
            }
        }
    }, [siteReducer]);

    //! Functions
    const handleOnChange = (option) => {
        global.bookTraining = {
            siteId: option.ms_id,
            siteName: option.ms_name,
            address: '',
        };

        setSelectedAcademy(option);
        setCourseSelected({});
        setTitleButton(
            option.ms_trial === 1
                ? 'Book a trial session'
                : 'Book a free session',
        );
        setLstAddress([
            {
                label: option.ms_address,
                value: option.ms_id,
            },
        ]);

        dispatch({
            type: siteActionType.GET_LIST_COURSE,
            company_id: option.pa_companyId,
            location_id: option.pa_locationId,
            course_type: 'course',
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
                        getOptionLabel={(option) => option.ms_name}
                        getOptionValue={(option) => option.ms_id}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="wSelect2">
                    <label>Address</label>
                    <textarea
                        disabled={true}
                        value={
                            lstAddress.length > 0 && lstAddress[0].label
                                ? lstAddress[0].label
                                : ''
                        }
                        type="text"
                        className="outputText"
                    />
                </div>

                {selectedAcademy && selectedAcademy.ms_trial === 1 && (
                    <div className="wSelect2">
                        <label>Cost</label>
                        <p style={{ color: '#FF7100' }}>
                            £{courseSelected?.course_price || 0} per{' '}
                            {courseSelected?.course_length || 0} sessions
                        </p>
                    </div>
                )}

                {lstCourse.length > 0 && (
                    <div className="wSelect2">
                        {lstCourse.map((item, index) => (
                            <div
                                key={index}
                                className="classRow"
                                onClick={() => setCourseSelected(item)}
                                style={{
                                    backgroundColor: `${
                                        index % 2 === 0 ? '#F7F8F7' : 'white'
                                    }`,
                                }}>
                                <p>{item.day_of_week}</p>
                                <p>
                                    {moment(
                                        item.course_day_time_start,
                                        'hh:mm:ss',
                                    ).format('hh:mma')}
                                    -
                                    {moment(
                                        item.course_day_time_end,
                                        'hh:mm:ss',
                                    ).format('hh:mma')}
                                </p>
                                <p>
                                    {item.min_age}-{item.max_age} year olds
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
                    <SolidButton
                        title={titleButton}
                        onClick={() => {
                            dispatch({
                                type: siteActionType.SELECT_ACADEMY,
                                data: selectedAcademy,
                            });
                            history.push(PathRoute.BookTrialTraining);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
