import moment from 'moment';
import React from 'react';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

const propTypes = {};

// export const event = {
//     title: 'Super Fun Event',
//     description: 'Example Event description.',
//     location: 'Georgia - Sakartvelo',
//     duration,
//     endDatetime: moment(endDatetime).format('YYYYMMDDTHHmmssZ'),
//     startDatetime: moment(startDatetime).format('YYYYMMDDTHHmmssZ'),
// };

export default (props) => {
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
        // const startDatetime = new Date('2021-03-03T09:00');
        // const endDatetime = new Date('2021-03-03T11:00');

        const startDate = new Date(
            `${props?.event?.startDate}T${props?.event?.statTime}`,
        );
        const endDate = new Date(
            `${props?.event?.startDate}T${props?.event?.endTime}`,
        );
        const duration = startDate.getHours() - endDate.getHours();

        return {
            title: props?.event?.title || '',
            description: 'We make football event',
            location: props?.event?.location || '',
            duration,
            endDatetime: moment(endDate).format('YYYYMMDDTHHmmssZ'),
            startDatetime: moment(startDate).format('YYYYMMDDTHHmmssZ'),
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
