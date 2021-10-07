import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const propTypes = {};

const ResultFaqs = (props) => {
    //! State
    const { lstCate } = props;

    //! Function

    //! Render
    return (
        <div className="qna-list">
            <div className="container">
                <h1 className="qna-header">{`Search Result (${lstCate.length}):`}</h1>

                <div className="boxFaq">
                    {lstCate.map((item, idx) => (
                        <Fragment>
                            {item.article.length > 0 && (
                                <div className="qna-cate" key={idx}>
                                    <p className="title">{item.cate_value}</p>
                                    {item.article.length > 0 &&
                                        item.article[0].map((it, index) => {
                                            if (index < 3) {
                                                return (
                                                    <a
                                                        style={{
                                                            marginBottom:
                                                                '1rem',
                                                        }}
                                                        key={index}
                                                        href={`/faqs/${item.cate_alias}`}>
                                                        {it.atc_sapo}
                                                    </a>
                                                );
                                            }
                                        })}
                                    <a href={`/faqs/${item.cate_alias}`}>
                                        View all questions
                                    </a>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

ResultFaqs.propTypes = propTypes;
export default ResultFaqs;
