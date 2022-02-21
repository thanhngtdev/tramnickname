import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';
import type from 'src/redux/actions/actionTypes';
import dynamic from 'next/dynamic';
import httpMethod from 'src/services/httpMethod';
import Button from '../../components/Button';

const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const ArticleItem = dynamic(() => import('src/components/Article/ArticleItem'));
const ArticleMenu = dynamic(() => import('src/components/Article/ArticleMenu'));

export default ({ listSite, data, isCategory = false }) => {
    // console.log(data, 'data');
    const dispatch = useDispatch();
    const [lstNews, setLstNews] = useState({});
    const [page, setPage] = useState(1);
    // const [lastPage, setLastPage] = useState(1);
    const [promoteArticle, setPromoteArticle] = useState({});
    const [cate, setCate] = useState({});
    const [lstArticle, setLstArticle] = useState([]);
    const [nextPage, setNextPage] = useState('');

    saveList(listSite);
    useEffect(() => {
        if (!isEmpty(data)) {
            setPromoteArticle(data.lstPromote[0]);
            // setLstNews(data.lstArticle.data);
            setLstArticle(data.lstArticle.data);
            // setNextPage(data.lstArticle.next_page_url);

            if (data.lstArticle.next_page_url) {
                const nextURL = isCategory
                    ? data.lstArticle.next_page_url + `&cate=${data.categoryId}`
                    : data.lstArticle.next_page_url;

                setNextPage(nextURL);
            } else {
                setNextPage(null);
            }
        }
    }, []);

    const getMoreNews = async (nextLink) => {
        const propsData = { ...data };

        try {
            const res = await httpMethod.get(nextLink);
            // console.log(res, 'res');

            if (res.data.status == 200 && res.data.data) {
                // debugger;
                const { data } = res.data;

                const newsList = [...lstArticle, ...data.lstArticle.data];
                setLstArticle(newsList);

                if (data.lstArticle.next_page_url) {
                    const nextURL = isCategory
                        ? data.lstArticle.next_page_url +
                          `&cate=${propsData.categoryId}`
                        : data.lstArticle.next_page_url;

                    // console.log(nextURL, 'nextURL');
                    setNextPage(nextURL);
                } else {
                    setNextPage(null);
                }
            }
            // if (res.data.status == 200) {
            //     setFooterConfig(res.data.data.cfg_value);
            // }
            // console.log(res.data, "footer");
        } catch (error) {
            console.log(error);
        }
    };

    function getUrlNextPage() {}

    return (
        <DefaultLayout>
            <ArticleMenu
                lstCate={data?.lstCate}
                currentCate={data?.categoryId}
                isFranchise={data?.isFranchise}
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
                    <Link href={`/news/${promoteArticle.atc_alias}`}>
                        <a style={{ color: 'white' }}>
                            {promoteArticle.atc_title}
                        </a>
                    </Link>
                </h2>
            </div>

            <div className="article-list" style={{ padding: '70px 0' }}>
                <div className="container">
                    <div className="article-list-grid">
                        {lstArticle &&
                            lstArticle.map((item, index) => {
                                return <ArticleItem key={index} item={item} />;
                            })}
                    </div>
                    {nextPage && (
                        <div className="article-loadmore">
                            <Button
                                onClick={() => {
                                    getMoreNews(nextPage);
                                }}
                                title="Load more..."
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* 
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
            )} */}
        </DefaultLayout>
    );
};
