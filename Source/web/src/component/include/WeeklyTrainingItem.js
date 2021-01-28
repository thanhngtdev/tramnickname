import React, { useState } from 'react';

function WeeklTrainingItem(props) {
    const [bookTrial, setBookTrial] = useState(false);
    let item = props.data;
    let index = props.index;
    return (
        <div
            className="wrap-course"
            key={index}
            style={{
                borderColor: bookTrial ? '#EE7925' : 'white',
                borderWidth: 1,
                borderStyle: 'solid',
            }}
            onClick={() => setBookTrial(!bookTrial)}>
            <div className={`${index % 2 === 0 ? 'course-odd' : 'course'}`}>
                <label className="course-time">
                    {item.date} {item.timeStart}-{item.timeEnd}
                </label>
                {!bookTrial && (
                    <label className="course-age">
                        {item.ageStart}-{item.ageEnd} year olds
                    </label>
                )}
                {bookTrial && (
                    <label
                        className="book-trial"
                        onClick={() => {
                            console.log('book session');
                        }}>
                        Book a free session
                    </label>
                )}
            </div>
        </div>
    );
}

export default WeeklTrainingItem;
