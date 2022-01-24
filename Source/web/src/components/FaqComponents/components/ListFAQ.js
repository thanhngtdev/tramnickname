import React, { Fragment } from 'react';
import Link from 'next/link';
const propTypes = {};

const ListFAQ = (props) => {
    //! State
    const { lstCate } = props;

    // console.log(lstCate, 'lstCate');

    //! Function

    //! Render
    return (
        <Fragment>
            {lstCate && (
                <div className="qna-list">
                    <div className="container">
                        <h1 className="qna-header">
                            Frequently Asked Questions
                        </h1>
                        <div className="boxFaq">
                            {lstCate.map((item, idx) => (
                                // <div className="col-4">
                                <Fragment>
                                    {item.article.data.length > 0 && (
                                        <div
                                            className="qna-cate"
                                            key={item.cate_id}>
                                            <p className="title">
                                                {item.cate_value}
                                            </p>
                                            {item.article.data.map(
                                                (it, index) => {
                                                    if (index < 3) {
                                                        return (
                                                            <Link
                                                                href={`/faqs/${item.cate_alias}#${it.atc_id}`}
                                                                passHref
                                                                scroll>
                                                                <a
                                                                    style={{
                                                                        marginBottom:
                                                                            '1rem',
                                                                    }}
                                                                    key={index}>
                                                                    {
                                                                        it.atc_sapo
                                                                    }
                                                                </a>
                                                            </Link>
                                                        );
                                                    }
                                                },
                                            )}
                                            <Link
                                                href={`/faqs/${item.cate_alias}`}
                                                passHref
                                                scroll>
                                                <a>View all questions</a>
                                            </Link>
                                        </div>
                                    )}
                                </Fragment>
                                // </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

ListFAQ.propTypes = propTypes;
export default ListFAQ;
