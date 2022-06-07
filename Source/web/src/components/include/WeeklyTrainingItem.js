import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';
import { PopupButton } from '@typeform/embed-react';

function WeeklTrainingItem(props) {
    const { item, index, site } = props;
    const dispatch = useDispatch();
    const history = useRouter();

    const renderButton = () => {
        if (site.ms_use_typeform === 1) {
            return (
                <PopupButton
                    id={site.ms_typeform_id}
                    className="book-trial"
                    style={{
                        border: 0,
                    }}
                    size={90}>
                    Book a free session
                </PopupButton>
            );
        }

        return (
            <label
                className="book-trial"
                onClick={() => {
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
        );
    };

    return (
        <div className="wrap-course" key={index}>
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
                {renderButton()}
            </div>
        </div>
    );
}

export default WeeklTrainingItem;
