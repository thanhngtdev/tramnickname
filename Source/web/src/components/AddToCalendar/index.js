import dayjs from 'dayjs';
import React from 'react';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

export default (props) => {
    // console.log(props, 'calendar');

    const ATCDropdown = (args) => (
        <ul className="atc-dropdown">
            {args.children.map((link, i) => (
                <li key={i}>{link}</li>
            ))}
        </ul>
    );

    const ATCWrapper = (args) => (
        <div
            onClick={args.onClick}
            className="atc-item"
            style={{ cursor: 'pointer', color: '#FF7100' }}>
            {args.children}
        </div>
    );

    const event = () => {
        const startDate = new Date(
            `${props?.event?.startDate}T${props?.event?.startTime}`,
        );
        const endDate = new Date(
            `${props?.event?.startDate}T${props?.event?.endTime}`,
        );
        const duration = startDate.getHours() - endDate.getHours();

        return {
            title: props?.event?.title || '',
            description: props?.event?.detail || '',
            location: props?.event?.location || '',
            duration,
            endDatetime: dayjs(endDate).format('YYYYMMDDTHHmmssZ'),
            startDatetime: dayjs(startDate).format('YYYYMMDDTHHmmssZ'),
        };
    };

    const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);
    //! Render
    return (
        <>
            <AddToCalendarDropdown
                linkProps={{
                    className: 'atc-dropdown-title',
                }}
                event={event()}
            />
        </>
    );
};
