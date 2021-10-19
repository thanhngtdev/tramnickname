import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';

export default function QNASearch({ setSearch }) {
    const [input, setInput] = useState('');

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
                        value={input}
                        type="text"
                        placeholder="Type keywords to find answers"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.charCode === 13) {
                                if (!isEmpty(input)) {
                                    setSearch(input);
                                }
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (!isEmpty(input)) {
                                // let param = { scope: 'faq', query: input };
                                // dispatch(searchFAQ({ param }));
                                setSearch(input);
                            }
                        }}>
                        Find
                    </button>
                </div>
                <p>
                    You can also browse the topics below to find what you are
                    looking for
                </p>
            </div>
        </div>
    );
}
