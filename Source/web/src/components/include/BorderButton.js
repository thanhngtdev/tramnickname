import React, { useEffect } from 'react';

export default function BorderButton(props) {
    // useEffect(() => {
    //     console.log(props.disabled, 'aa');
    // }, [props.disabled]);

    return (
        <button
            id={props.id}
            disabled={props.disabled}
            className={`border-btn ${props.disabled ? 'btn-disabled' : ''}`}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
            style={{
                ...props.style,
                borderRadius: 6,
                border: '1px solid #FF7100',
                color: '#FF7100',
                textTransform: 'uppercase',
                padding: '1.5rem 3rem',
                backgroundColor: 'white',
                cursor: 'pointer',
            }}
            // disabled
        >
            {props.title}
        </button>
    );
}
