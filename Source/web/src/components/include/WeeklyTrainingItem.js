import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';
import PathRoute from 'src/common/PathRoute';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

function WeeklTrainingItem(props) {
    const [bookTrial, setBookTrial] = useState(-1);
    const { item, index, site } = props;
    const dispatch = useDispatch();
    const history = useRouter();

    return (
        <div
            className="wrap-course"
            key={index}
            style={{
                borderColor: bookTrial === index ? '#EE7925' : 'white',
                borderWidth: 1,
                borderStyle: 'solid',
            }}
            onClick={() => {
                if (bookTrial === index) {
                    setBookTrial(-1);
                } else {
                    setBookTrial(index);
                }
            }}>
            <div className={`${index % 2 === 0 ? 'course-odd' : 'course'}`}>
                {/* <label className="course-time">
                    {item.date} {item.timeStart}-{item.timeEnd}
                </label> */}
                <label className="course-time">
                    {item.day_of_week} <br />
                    {dayjs('2021-03-03T' + item.course_day_time_start).format(
                        'HH:mma',
                    )}
                    -
                    {dayjs('2021-03-03T' + item.course_day_time_end).format(
                        'HH:mma',
                    )}
                </label>
                {bookTrial === -1 && (
                    <label className="course-age">
                        {item.min_age}-{item.max_age} year olds
                    </label>
                )}
                {bookTrial === index && (
                    <label
                        className="book-trial"
                        onClick={() => {
                            // console.log('book session');
                            global.bookTraining = {
                                siteId: site.ms_id || 0,
                                siteName: site.ms_name || '',
                                address: '',
                                preDefined: { item },
                            };
                            dispatch({
                                type: siteActionType.SELECT_ACADEMY,
                                data: site,
                            });

                            dispatch({ type: headerActionType.CLOSE_LOCATION });

                            history.push(PathRoute.BookTrialTraining);
                        }}>
                        Book a free session
                    </label>
                )}
            </div>
        </div>
    );
}

export default WeeklTrainingItem;
