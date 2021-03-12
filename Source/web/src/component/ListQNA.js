import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'css/qna.css';
import { useDispatch, useSelector } from 'react-redux';
import QNASearch from './article/QNASearch';
import { articleActionType } from 'redux/actions/actionTypes';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function ListQNA() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [lstCate, setLstCate] = useState([]);
    useEffect(() => {
        dispatch({
            type: articleActionType.GET_LIST_FAQ,
            cate: '',
        });
    }, [dispatch]);

    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        if (articleReducer.type) {
            if (
                articleReducer.type === articleActionType.GET_LIST_FAQ_SUCCESS
            ) {
                setLstCate(articleReducer.data.lstCate);
            }
        }
    }, [articleReducer]);
    console.log(lstCate, 'aaa');
    return (
        <Fragment>
            <QNASearch />
            <ClearBoth />
            <div className="qna-list">
                <div className="container">
                    <h2>Frequently Asked Questions</h2>
                    <div className="">
                        <div className="row">
                            {lstCate.map((item, idx) => (
                                <div className="col-4" key={idx}>
                                    <div className="qna-cate">
                                        <h4>{item.cate_value}</h4>
                                        {item.article.data.map((it, index) => (
                                            <Link
                                                style={{
                                                    marginBottom: '1rem',
                                                }}
                                                key={index}
                                                to={`/faqs/${item.cate_alias}`}>
                                                {it.atc_sapo}
                                            </Link>
                                        ))}
                                        <Link to={`/faqs/${item.cate_alias}`}>
                                            View all questions
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div>
                <div
                    className="container"
                    style={{ justifyContent: 'center', display: 'flex' }}>
                    <div className="qna-contact">
                        <h2>Can’t find the answer you are looking for?</h2>
                        <p>
                            Contact us via the button below and one of our
                            experienced team members will get back to you.
                        </p>
                        <button
                            onClick={() => {
                                history.push('contact-us');
                            }}>
                            GET IN TOUCH
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListQNA;
