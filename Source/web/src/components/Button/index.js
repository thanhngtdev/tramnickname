import Link from 'next/link';
import React from 'react';

export default (props) => {
    const { href = '', title = '', style = {} } = props;
    // console.log(props, 'sss');

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
