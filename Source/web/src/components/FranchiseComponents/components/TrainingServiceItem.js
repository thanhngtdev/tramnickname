import React, { useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import { siteActionType } from 'src/redux/actions/actionTypes';
import moment from 'moment';
import useGetWidth from 'src/hooks/useGetWidth';

const TrainingServiceItem = (props) => {
    const { item, index, site, title } = props;
    const isMobile = useGetWidth() <= 768;
    const isWithTable = useGetWidth() <= 402;
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();
    const history = useRouter();
    // console.log('item', item);

    useEffect(() => {
        const dayOfWeek = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        let startOfWeek = moment().startOf('week');
        let endOfWeek = moment().endOf('week');
        let daysOfWeek = [];
        let day = startOfWeek;
        while (day <= endOfWeek) {
            daysOfWeek.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        const arrCourse = item
            .map((el) => {
                let indexDate = dayOfWeek.findIndex(
                    (d) => d === el.day_of_week,
                );
                // console.log('sdkjadha', indexDate);
                let dateConverted = moment(daysOfWeek[indexDate]).add(
                    moment.duration(el.course_day_time_start),
                );
                // console.log(
                //     'dateConverted',
                //     dateConverted.format('DD/MM/YYYY HH:mm'),
                // );
                return {
                    ...el,
                    dateConverted,
                };
            })
            .sort(
                (i1, i2) =>
                    moment(i1.dateConverted).unix() -
                    moment(i2.dateConverted).unix(),
            );

        setCourses(arrCourse);
    }, []);

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
                        fontSize: '18px',
                    }}
                    size={90}>
                    Book Free Session
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
                    history.push(
                        PathRoute.BookTrialTrainingWithAlias(site.ms_alias),
                    );
                }}>
                Book Free Session
            </p>
        );
    };

    return (
        <>
            {(!isMobile || props.isHeader) && (
                <>
                    {/* <h4 style={{
                padding:'2rem 1rem',
                fontWeight:'500',
                backgroundColor:'#ccc',
                margin:0
            }}>{title}</h4> */}
                    {courses ? (
                        <h4
                            style={{
                                padding: '2rem 1rem',
                                fontWeight: '500',
                                backgroundColor: '#ccc',
                                margin: 0,
                            }}>
                            {title}
                        </h4>
                    ) : (
                        ''
                    )}
                    {courses.map((el, idx) => (
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
                                    padding: '10px 1.5rem',
                                }}>
                                <p>
                                    {isWithTable
                                        ? el?.day_of_week.slice(0, 3)
                                        : el?.day_of_week}
                                </p>

                                <p>
                                    {dayjs(
                                        '2021-03-03T' +
                                            el.course_day_time_start,
                                    ).format('h:mma')}
                                    -
                                    {dayjs(
                                        '2021-03-03T' + el.course_day_time_end,
                                    ).format('h:mma')}
                                </p>
                                <p>
                                    {el.min_age}-{el.max_age}{' '}
                                    {isWithTable ? 'y.o.' : 'year olds'}
                                </p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '10px 1.5rem',
                                }}>
                                <p style={{ marginRight: 35 }}>{`£${
                                    el.course_price || 0
                                } per ${el.course_length || 0} sessions`}</p>
                                {renderBookingBtn(idx)}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default TrainingServiceItem;
