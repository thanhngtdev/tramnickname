import Link from 'next/link';
import React from 'react';
import { PopupButton } from '@typeform/embed-react';

export default (props) => {
    const { idTypeForm, href = '', title = '', style = {} } = props;

    //button for typeform
    if (idTypeForm) {
        return (
            <PopupButton
                id={idTypeForm}
                className="btn-book-free-session white-hover"
                style={style}
                size={90}>
                {title}
            </PopupButton>
        );
    }

    if (props.onClick) {
        return (
            <button
                style={style}
                className="btn-book-free-session white-hover"
                onClick={() => props.onClick()}>
                {title}
            </button>
        );
    }

    return (
        <Link href={href || '#'} passHref>
            <a style={style} className="btn-book-free-session white-hover">
                {title}
            </a>
        </Link>
    );
};
