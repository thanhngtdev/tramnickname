import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CommonStyle } from '../../common/Styles';
import SolidButton from '../include/SolidButton';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../../actions/actionTypes';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PathRoute from '../../common/PathRoute';

AboutInfo.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfo(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const defaultAcademy = JSON.parse(localStorage.getItem('defaultAcademy'));

    const [selectedAcademy, setSelectedAcademy] = useState(defaultAcademy);
    const [lstAddress, setLstAddress] = useState(
        defaultAcademy
            ? [
                  {
                      label: defaultAcademy.ms_address,
                      value: defaultAcademy.ms_id,
                  },
              ]
            : [],
    );
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [titleButton, setTitleButton] = useState(
        defaultAcademy && defaultAcademy.ms_trial === 1
            ? 'Book a trial session'
            : 'Book a free session',
    );

    global.bookTraining = defaultAcademy
        ? {
              siteId: defaultAcademy.ms_id,
              siteName: defaultAcademy.ms_name,
              address: '',
          }
        : {};

    useEffect(() => {
        if (defaultAcademy && defaultAcademy.pa_companyId)
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: defaultAcademy.pa_companyId,
                location_id: defaultAcademy.pa_locationId,
                course_type: 'course',
            });
    }, []);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                setLstCourse(siteReducer.data);
            }
        }
    }, [siteReducer]);

    return (
        <div
            style={{
                maxWidth: 600,
                margin: 'auto',
                padding: '0 15px',
                width: '100%',
            }}>
            <div className="wrap-info">
                <div
                    className=""
                    style={{
                        position: 'relative',
                        backgroundColor: 'white',
                        padding: '2rem 1rem',
                    }}>
                    <h4 style={{ textAlign: 'center' }}>
                        Find your nearest training session
                    </h4>
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
                            onChange={(option) => {
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
                            }}
                        />
                    </div>
                    <div className="wSelect2">
                        <label>Address</label>
                        <Select
                            value={lstAddress.length > 0 ? lstAddress[0] : ''}
                            options={lstAddress}
                            isSearchable={false}
                            isMulti={false}
                            onChange={(option) => {
                                console.log(option);
                            }}
                            styles={CommonStyle.select2}
                        />
                    </div>

                    {selectedAcademy && selectedAcademy.ms_trial === 1 && (
                        <div className="wSelect2">
                            <label>Cost</label>
                            <p style={{ color: '#FF7100' }}>
                                £{courseSelected.course_price || 0} per{' '}
                                {courseSelected.course_length || 0} sessions
                            </p>
                        </div>
                    )}

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

                    <div style={{ textAlign: 'center' }}>
                        <SolidButton
                            title={titleButton}
                            onClick={() =>
                                history.push(PathRoute.BookTrialTraining)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
