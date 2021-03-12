import React, { Fragment, useEffect, useState } from 'react';
import ArticleMenu from 'component/article/ArticleMenu';
import ArticleItem from 'component/article/ArticleItem';
import 'css/article.css';
import type from 'redux/actions/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Utils from 'common/Utils';
import { useHistory } from 'react-router-dom';
import PathRoute from 'common/PathRoute';
import { getDetailNews } from 'redux/actions/articleAction';

function DetailNews() {
    let { id } = useParams();
    const articleReducer = useSelector((state) => state.articleReducer);
    const { data } = articleReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailNews({ id }));
    }, [id]);

    return (
        <Fragment>
            <ArticleMenu />
            <div
                className="article-feature"
                style={{
                    backgroundImage:
                        'url(' +
                        Utils.getThumb(
                            data?.article?.atc_featureImg || '',
                            'c2',
                        ) +
                        ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <h2>{data?.article?.atc_title || ''}</h2>
                <h4>
                    {data?.article?.author
                        ? data.article.author?.user_showName
                        : ''}{' '}
                    <br />
                    {moment(data?.article?.created_at || ' ').format(
                        'Do MMMM YYYY',
                    )}
                </h4>
            </div>

            <div className="article-detail">
                <div className="container" style={{ position: 'relative' }}>
                    <div className="article-sharing">
                        <a href="/#">
                            <img
                                src={require('images/icon_fb_dark.png')}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={require('images/icon_tw_dark.png')}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={require('images/icon_insta_dark.png')}
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="article-content">
                        {parse(data?.article?.atc_content || '', {
                            replace: function (node) {},
                        })}
                    </div>
                    <hr />
                </div>
            </div>
            <div className="related-article article-list">
                <div className="container">
                    <h2>Related Articles</h2>
                    <div className="row">
                        {data?.related
                            ? data.related.map((item, index) => {
                                  return (
                                      <div key={index} className="col-4">
                                          <ArticleItem item={item} />
                                      </div>
                                  );
                              })
                            : []}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default DetailNews;
