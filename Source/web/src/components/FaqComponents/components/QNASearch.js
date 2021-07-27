import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { searchFAQ } from 'src/redux/actions/faqAction';

export default function QNASearch() {
    const dispatch = useDispatch();
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
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (input) {
                                let param = { scope: 'faq', query: input };
                                dispatch(searchFAQ({ param }));
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