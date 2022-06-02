import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';

function WeeklTrainingItem(props) {
    // const [bookTrial, setBookTrial] = useState(-1);
    const { item, index, site } = props;
    const dispatch = useDispatch();
    const history = useRouter();

    return (
        <div
            className="wrap-course"
            key={index}
            // style={{
            //     borderColor: '#EE7925',
            //     borderWidth: 1,
            //     borderStyle: 'solid',
            // }}
        >
            <div className={`${index % 2 === 0 ? 'course-odd' : 'course'}`}>
                <label className="course-time">
                    {item.day_of_week}&nbsp;
                    {item.min_age}-{item.max_age} year olds <br />
                    {dayjs('2021-03-03T' + item.course_day_time_start).format(
                        'HH:mma',
                    )}
                    -
                    {dayjs('2021-03-03T' + item.course_day_time_end).format(
                        'HH:mma',
                    )}
                </label>
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
            </div>
        </div>
    );
}

export default WeeklTrainingItem;
