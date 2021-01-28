import React from 'react';
import IconCheck from './IconCheck';
import IconUnchecked from './IconUnchecked';
import { useState } from 'react';

export default function Checkbox(props) {
    const [disabled] = useState(props.disabled);

    function icon() {
        return props.checked ? <IconCheck /> : <IconUnchecked />;
    }

    function toggle(event) {
        event.preventDefault();
        if (props.onChange) props.onChange();
    }

    return (
        <button style={Styles.button} onClick={toggle} disabled={disabled}>
            <div style={Styles.check}>{icon()}</div>

            <div style={Styles.content}>{props.children}</div>
        </button>
    );
}

const Styles = {
    button: {
        background: 'transparent',
        border: '0',
        marginBottom: 0,
        fontSize: '1rem',
        display: 'flex',
        outline: '0',
        color: '#9B9B9B',
        marginRight: 0,
        cursor: 'pointer',
        textAlign: 'left',
    },

    check: {
        marginRight: '1rem',
    },

    content: {
        paddingTop: 0,
        fontSize: '1rem',
        fontWeight: '100',
        lineHeight: '1.25rem',
        color: 'black',
    },
};
