import React from 'react';

export default function BorderButton(props) {
    return (
        <button
            className = "border-btn"
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
            }}>
            {props.title}
        </button>
    );
}
