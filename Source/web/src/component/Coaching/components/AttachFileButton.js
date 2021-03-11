import React, { useRef } from 'react';
import PropTypes from 'prop-types';

AttachFileButton.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    file: PropTypes.string,
    onChange: PropTypes.func,
};

function AttachFileButton({
    label = '',
    className = '',
    onChange = () => {},
    file = '',
}) {
    const refInputFile = useRef(null);

    const onClickBtn = () => {
        if (refInputFile && refInputFile.current) {
            refInputFile.current.click();
        }
    };

    return (
        <div className={className}>
            <label>{label}</label>
            <input ref={refInputFile} type="file" hidden onChange={onChange} />
            <button id="attach" className="attach-file" onClick={onClickBtn}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.853"
                    height="22.611"
                    viewBox="0 0 21.853 22.611">
                    <g id="paperclip" transform="translate(0.998 0.612)">
                        <path
                            id="Path"
                            d="M19.438,9.662l-9.19,9.19a6,6,0,0,1-8.49-8.49l9.19-9.19a4,4,0,0,1,5.66,5.66l-9.2,9.19a2,2,0,0,1-2.83-2.83l8.49-8.48"
                            transform="translate(0.002 0.388)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                    </g>
                </svg>
            </button>
            <h6 style={{ fontWeight: '100', margin: '0' }}>{file}</h6>
        </div>
    );
}

export default AttachFileButton;
