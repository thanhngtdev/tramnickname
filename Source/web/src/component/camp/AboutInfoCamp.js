import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CommonStyle } from 'common/Styles';
import SolidButton from 'component/include/SolidButton';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PathRoute from 'common/PathRoute';

AboutInfoCamp.propTypes = {
    lstAcademy: PropTypes.array,
};

export default function AboutInfoCamp(props) {
    // console.log(props.lstAcademy);
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultAcademy = JSON.parse(localStorage.getItem('defaultAcademy'));

    const [selectedAcademy, setSelectedAcademy] = useState(defaultAcademy);

    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});

    let txtAddress = '';
    if (
        selectedAcademy &&
        selectedAcademy.sub_page &&
        selectedAcademy.sub_page.length > 0
    ) {
        selectedAcademy.sub_page.map((item, index) => {
            if (index === 0) txtAddress = item.sub_name;
            else if (index === selectedAcademy.sub_page.length - 1)
                txtAddress = txtAddress + ' and ' + item.sub_name;
            else txtAddress = txtAddress + ', ' + item.sub_name;
        });
    }
    global.bookCamp = defaultAcademy
        ? {
              siteId: defaultAcademy.ms_id,
              siteName: defaultAcademy.ms_name,
          }
        : {};

    useEffect(() => {
        if (defaultAcademy && defaultAcademy.pa_companyId)
            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: defaultAcademy.pa_companyId,
                course_type: 'event',
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
                        minHeight: 460,
                    }}>
                    <h4 style={{ textAlign: 'center' }}>
                        {moment().year()} Holiday Camp Calendar
                    </h4>
                    <div className="wSelect2">
                        <Select
                            value={selectedAcademy}
                            options={props.lstAcademy}
                            isSearchable={false}
                            isMulti={false}
                            styles={CommonStyle.select2}
                            getOptionLabel={(option) => option.ms_name}
                            getOptionValue={(option) => option.ms_id}
                            onChange={(option) => {
                                global.bookCamp = {
                                    siteId: option.ms_id,
                                    siteName: option.ms_name,
                                };
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
                                <p>{item.course_title}</p>
                                <p>
                                    {item.min_age}-{item.max_age} year olds
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <SolidButton
                            title="Book now"
                            onClick={() => {
                                history.push(PathRoute.BookTrialCamp);
                                dispatch({
                                    type: siteActionType.SELECT_ACADEMY,
                                    data: selectedAcademy,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            {selectedAcademy &&
                selectedAcademy.sub_page &&
                selectedAcademy.sub_page.length > 0 && (
                    <p style={{ fontSize: 14, textAlign: 'center' }}>
                        Holiday camps are available in {txtAddress}.
                    </p>
                )}
        </div>
    );
}
