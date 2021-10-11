import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AddToCalendar from 'src/components/AddToCalendar';

const propTypes = {};

export default (props) => {
    //! State
    const dispatch = useDispatch();

    //! Function

    //! Render
    return (
        <>
            <AddToCalendar />
        </>
    );
};
