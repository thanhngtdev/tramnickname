import React, { Fragment, useEffect, useState } from 'react';
import ArticleMenu from './article/ArticleMenu';
import ArticleItem from './article/ArticleItem';
import '../css/article.css';
import { articleActionType } from '../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../common/Utils';
import { Link, useParams } from 'react-router-dom';

function ListNews() {
    let { cateAlias, alias } = useParams();

    const dispatch = useDispatch();
    const [lstNews, setLstNews] = useState([]);
    const [page, setPage] = useState(1);
    const [promoteArticle, setPromoteArticle] = useState({});
    const [cate, setCate] = useState({});
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        dispatch({
            type: articleActionType.GET_LIST_NEWS,
            cate: cateAlias || '',
            alias: alias || '',
            page,
        });
    }, [dispatch]);

    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        if (articleReducer.type) {
            if (
                articleReducer.type === articleActionType.GET_LIST_NEWS_SUCCESS
            ) {
                console.log(articleReducer.data.lstArticle);
                articleReducer.data.lstCate.map((_cateItem) => {
                    if (_cateItem.cate_alias === cateAlias) {
                        setCate(_cateItem);
                    }
                });
                if (articleReducer.data.lstPromote.length > 0)
                    setPromoteArticle(articleReducer.data.lstPromote[0]);
                setLastPage(articleReducer.data.lstArticle.last_page);
                if (page === 1) setLstNews(articleReducer.data.lstArticle.data);
                else
                    setLstNews(
                        lstNews.concat(articleReducer.data.lstArticle.data),
                    );
            }
        }
    }, [articleReducer]);

    return (
        <Fragment>
            <ArticleMenu
                currentCate={cate}
                setCate={(_cate) => {
                    dispatch({
                        type: articleActionType.GET_LIST_NEWS,
                        cate: _cate.cate_alias || '',
                        alias: _cate.alias || '',
                        page: 1,
                    });
                    setPage(1);
                    setCate(_cate);
                }}
            />
            <div
                className="article-feature"
                style={{
                    backgroundImage: `url(${Utils.getThumb(
                        promoteArticle.atc_featureImg,
                        'c1',
                    )})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <h4>Feature Article</h4>
                <h2>
                    <Link
                        style={{ color: 'white' }}
                        to={`/news/${promoteArticle.atc_alias}-${promoteArticle.atc_id}`}>
                        {promoteArticle.atc_title}
                    </Link>
                </h2>
            </div>
            <div className="article-list" style={{ padding: '70px 0' }}>
                <div className="container">
                    <div className="row">
                        {lstNews.map((item, index) => {
                            return (
                                <div key={index} className="col-4">
                                    <ArticleItem item={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div style={{ clear: 'both' }} />
            {page < lastPage && (
                <div className="view-all">
                    <div className="container">
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                dispatch({
                                    type: articleActionType.GET_LIST_NEWS,
                                    cate: cate.cate_alias || '',
                                    page: page + 1,
                                });
                                setPage(page + 1);
                            }}>
                            View More Articles
                        </span>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
export default ListNews;
