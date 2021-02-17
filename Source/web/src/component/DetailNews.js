import React, { Fragment, useEffect, useState } from 'react';
import ArticleMenu from './article/ArticleMenu';
import ArticleItem from './article/ArticleItem';
import '../css/article.css';
import { articleActionType } from '../actions/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Utils from '../common/Utils';
import { useHistory } from 'react-router-dom';
import PathRoute from '../common/PathRoute';

function DetailNews() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [article, setArticle] = useState({});
    const [related, setRelated] = useState([]);
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: articleActionType.DETAIL_ARTICLE, atcId: id });
    }, [dispatch]);

    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        if (articleReducer.type) {
            console.log(articleReducer.type, 'Detail Article');

            if (
                articleReducer.type === articleActionType.DETAIL_ARTICLE_SUCCESS
            ) {
                // console.log(articleReducer.data);
                setArticle(articleReducer.data.article);
                setRelated(articleReducer.data.related);
            } else if (articleReducer.failed) {
                // console.log(articleReducer.failed, 'Fail');
                history.replace(PathRoute.Error);
            }
        }
    }, [articleReducer]);

    return (
        <Fragment>
            <ArticleMenu />
            <div
                className="article-feature"
                style={{
                    backgroundImage:
                        'url(' +
                        Utils.getThumb(article.atc_featureImg, 'c2') +
                        ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <h2>{article.atc_title}</h2>
                <h4>
                    {article.author ? article.author.user_showName : ''} <br />
                    {moment(article.created_at).format('Do MMMM YYYY')}
                </h4>
            </div>

            <div className="article-detail">
                <div className="container" style={{ position: 'relative' }}>
                    <div className="article-sharing">
                        <a href="/#">
                            <img
                                src={require('../images/icon_fb_dark.png')}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={require('../images/icon_tw_dark.png')}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={require('../images/icon_insta_dark.png')}
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="article-content">
                        {parse(article.atc_content || '', {
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
                        {related.map((item, index) => {
                            return (
                                <div key={index} className="col-4">
                                    <ArticleItem item={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default DetailNews;
