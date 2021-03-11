import React, { Fragment, useState, useEffect } from 'react';
import QNASearch from './article/QNASearch';
import 'css/qna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { articleActionType } from 'redux/actions/actionTypes';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function DetailQNA() {
    let { cateAlias } = useParams();

    const dispatch = useDispatch();
    const [cate, setCate] = useState({});
    const [lstCate, setLstCate] = useState([]);

    useEffect(() => {
        dispatch({
            type: articleActionType.GET_LIST_FAQ,
            cate: cateAlias || '',
        });
    }, [dispatch]);

    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        if (articleReducer.type) {
            if (
                articleReducer.type === articleActionType.GET_LIST_FAQ_SUCCESS
            ) {
                setCate(articleReducer.data.cate);
                setLstCate(articleReducer.data.lstCate);
            }
        }
    }, [articleReducer]);

    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <Fragment>
            <QNASearch />
            <ClearBoth />

            <div className="qa qna-detail">
                {cate && lstCate.length > 0 && (
                    <div className="container">
                        <h2>{cate.cate_value}</h2>
                        {lstCate.map((it, idx) => (
                            <Fragment key={idx}>
                                <h3>{it.cate_value}</h3>
                                <div className="qList">
                                    {it.article.data.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`qItem ${
                                                activeIndex === index
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }>
                                            <label className="qId">
                                                {index < 9 && '0'}
                                                {index + 1}
                                            </label>
                                            <div className="qContent">
                                                <h4 className="question">
                                                    {item.atc_sapo}
                                                </h4>
                                                <p
                                                    className="answer"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            item.atc_content,
                                                    }}></p>
                                            </div>
                                            <div className="qIcon">
                                                <FontAwesomeIcon
                                                    icon={
                                                        activeIndex === index
                                                            ? faMinus
                                                            : faPlus
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default DetailQNA;
