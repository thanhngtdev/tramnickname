import parse from 'html-react-parser';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import Utils from 'src/common/Utils';
import ArticleItem from 'src/components/Article/ArticleItem';
import ArticleMenu from 'src/components/Article/ArticleMenu';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';

export default ({ listSite, data }) => {
    //! State
    saveList(listSite);
    //! Render
    return (
        <DefaultLayout>
            <ArticleMenu
                lstCate={data?.lstCate}
                currentCate={data?.article?.atc_cate}
            />
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
                                src={'static-file/images/icon_fb_dark.png'}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={'static-file/images/icon_tw_dark.png'}
                                alt=""
                            />
                        </a>
                        <a href="/#">
                            <img
                                src={'static-file/images/icon_insta_dark.png'}
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
                    <div className="article-list-grid">
                        {data?.related &&
                            data.related.map((item, index) => {
                                return (
                                    //   <div key={index} className="col-4">
                                    <ArticleItem item={item} />
                                    //   </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
