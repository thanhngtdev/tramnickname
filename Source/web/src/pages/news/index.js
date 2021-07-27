import React, { Fragment, useEffect, useState } from 'react';
import ArticleMenu from 'src/components/Article/ArticleMenu';
import ArticleItem from 'src/components/Article/ArticleItem';
// import "css/article.css";
import type from 'src/redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Utils from 'src/common/Utils';
import { getListNews } from 'src/redux/actions/articleAction';
import Link from 'next/link';
import DefaultLayout from 'src/layout/DefaultLayout';

function News() {
    const articleReducer = useSelector((state) => state.articleReducer);
    const dispatch = useDispatch();
    const [lstNews, setLstNews] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [promoteArticle, setPromoteArticle] = useState({});
    const [cate, setCate] = useState({});

    useEffect(() => {
        dispatch(getListNews({ page }));
    }, []);

    useEffect(() => {
        if (articleReducer.type) {
            if (articleReducer.type === type.GET_LIST_NEWS_SUCCESS) {
                // articleReducer.data.lstCate.map((_cateItem) => {
                //   if (_cateItem.cate_alias === cateAlias) {
                //     setCate(_cateItem);
                //   }
                // });
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
        <DefaultLayout>
            <ArticleMenu
                currentCate={cate}
                setCate={(_cate) => {
                    dispatch({
                        type: type.GET_LIST_NEWS,
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
                    backgroundPosition: 'fixed',
                }}>
                <h4>Featured Article</h4>
                <h2>
                    <Link
                        href={`/news/${promoteArticle.atc_alias}-${promoteArticle.atc_id}`}>
                        <a style={{ color: 'white' }}>
                            {promoteArticle.atc_title}
                        </a>
                    </Link>
                </h2>
            </div>
            <div className="article-list" style={{ padding: '70px 0' }}>
                <div className="container">
                    <div className="article-list-grid">
                        {lstNews.map((item, index) => {
                            return <ArticleItem key={index} item={item} />;
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
                                    type: type.GET_LIST_NEWS,
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
        </DefaultLayout>
    );
}
export default News;