import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function QNASearch() {
    return (
        <div className="qna-search">
            <div className="container">
                <h2>Hello, How can we help you?</h2>
                <div className="input-search">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faSearch}
                            style={{ fontSize: 22 }}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Type keywords to find answers"
                    />
                    <button type="button">Find</button>
                </div>
                <p>
                    You can also browse the topics below to find what you are
                    looking for
                </p>
            </div>
        </div>
    );
}
