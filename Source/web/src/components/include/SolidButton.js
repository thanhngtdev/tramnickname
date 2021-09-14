import React from 'react';
import PropTypes from 'prop-types';

SolidButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
};

export default function SolidButton(props) {
    return (
        <button
            className={`white-hover ${props?.disabled ? 'btn-disabled' : ''}`}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
            disabled={props?.disabled || false}
            style={{
                ...props.style,
                borderRadius: 6,
                backgroundColor: props?.disabled ? 'white' : '#FF7100',
                textTransform: 'uppercase',
                color: props?.disabled ? '#FF7100' : 'white',
                // border: 'none',
                borderWidth: 1,
                borderColor: props?.disabled ? '#FF7100' : 'white',
                padding: '1.5rem 3rem',
                cursor: 'pointer',
            }}>
            {props.title}
        </button>
    );
}
