import { PopupButton } from '@typeform/embed-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import { siteActionType } from 'src/redux/actions/actionTypes';

const TrainingServiceItem = (props) => {
    const { item, index, site, title } = props;
    const dispatch = useDispatch();
    const history = useRouter();

    const renderBookingBtn = (index) => {
        if (props.site.ms_use_typeform === 1) {
            return (
                <PopupButton
                    id={props.site.ms_typeform_id}
                    style={{
                        border: 0,
                        backgroundColor: `${
                            index % 2 === 0 ? '#F7F8F7' : 'white'
                        }`,
                        padding: 0,
                        color: '#EE7925',
                        cursor: 'pointer',
                    }}
                    size={90}>
                    Book
                </PopupButton>
            );
        }

        return (
            <p
                style={{ color: '#FF7100', cursor: 'pointer' }}
                onClick={() => {
                    global.bookTraining = {
                        siteId: props.site.ms_id || 0,
                        siteName: props.site.ms_name || '',
                        address: '',
                        preDefined: { item },
                    };
                    dispatch({
                        type: siteActionType.SELECT_ACADEMY,
                        data: props.site,
                    });
                    history.push(PathRoute.BookTrialTraining);
                }}>
                Book
            </p>
        );
    };

    return (
        <>
            <h4>{title}</h4>
            {item.map((el, idx) => (
                <div
                    key={idx}
                    style={{
                        backgroundColor: `${
                            idx % 2 === 0 ? '#F7F8F7' : 'white'
                        }`,
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 10,
                        }}>
                        <p>{el?.day_of_week}</p>
                        <p>
                            {dayjs(
                                '2021-03-03T' + el.course_day_time_start,
                            ).format('HH:mma')}
                            -
                            {dayjs(
                                '2021-03-03T' + el.course_day_time_end,
                            ).format('HH:mma')}
                        </p>
                        <p>
                            {el.min_age}-{el.max_age}{' '}
                            {props.isMobile ? 'y.o.' : 'year olds'}
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            padding: 10,
                        }}>
                        <p style={{ marginRight: 35 }}>{`£${
                            el.course_price || 0
                        } per ${el.course_length || 0} sessions`}</p>
                        {renderBookingBtn(idx)}
                    </div>
                </div>
            ))}
        </>
    );
};

export default TrainingServiceItem;
