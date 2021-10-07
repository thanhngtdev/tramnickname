import React from 'react';
import { useDispatch } from 'react-redux';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import moment from 'moment';
import Button from 'src/components/Button';
import Select from 'react-select';
import { CommonStyle } from 'src/common/Styles';
import NearbyList from 'src/components/book-trial-trainingComponents/components/NearbyList';

const propTypes = {};
export default (props) => {
    //! State
    const startDatetime = new Date('2021-03-03T09:00');
    const endDatetime = new Date('2021-03-03T11:00');
    const duration = startDatetime.getHours() - endDatetime.getHours();

    const event = {
        title: 'We make Event',
        description: 'Example Event description.',
        location: 'Georgia - Sakartvelo',
        duration,
        endDatetime: moment(endDatetime).format('YYYYMMDDTHHmmssZ'),
        startDatetime: moment(startDatetime).format('YYYYMMDDTHHmmssZ'),
    };

    //! Function
    // const ATCDropdown = (args) => (
    //     <ul className="atc-dropdown">
    //         {args.children.map((link, i) => {
    //             return <li key={i}>{link}</li>;
    //         })}
    //     </ul>
    // );

    // const ATCWrapper = (args) => (
    //     <div
    //         style={{ cursor: 'pointer' }}
    //         onClick={args.onClick}
    //         className="atc-item">
    //         {args.children}
    //     </div>
    // );

    // const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);
    const lstCourse = [
        {
            course_title: 'GIRLS Twickenham Wednesdays 7-13 year olds',
            course_id: 471,
            min_age: 6,
            max_age: 13,
            course_price: 48,
            course_length: 8,
            trial: 'Yes',
            loc_name: 'Twickenham Academy',
            day_of_week: 'Wednesday',
            course_day_time_start: '18:00:00',
            course_day_time_end: '19:00:00',
        },
        {
            course_title: 'Twickenham Academy 4-7 year olds (10.30am-11.30am)',
            course_id: 698,
            min_age: 4,
            max_age: 8,
            course_price: 75,
            course_length: 9,
            trial: 'Yes',
            loc_name: 'Twickenham Academy',
            day_of_week: 'Saturday',
            course_day_time_start: '10:30:00',
            course_day_time_end: '11:30:00',
        },
    ];
    //! Render
    return <NearbyList />;
};
