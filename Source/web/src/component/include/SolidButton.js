import React from 'react';
import PropTypes from 'prop-types';

SolidButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
};

export default function SolidButton(props) {
    return (
        <button
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
            style={{
                ...props.style,
                borderRadius: 6,
                backgroundColor: '#FF7100',
                textTransform: 'uppercase',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                cursor: 'pointer',
            }}>
            {props.title}
        </button>
    );
}
